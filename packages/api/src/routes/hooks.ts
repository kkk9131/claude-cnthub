/**
 * Hook API ルート
 *
 * Claude Code プラグインからの Hook イベントを受信。
 *
 * エンドポイント:
 * - POST /hook/session-start - セッション開始
 * - POST /hook/session-end   - セッション終了（要約生成トリガー）
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createMiddleware } from "hono/factory";
import {
  createSession,
  getSessionById,
  getSessionByClaudeId,
  updateSession,
  cleanupStaleProcessingSessions,
  touchSession,
  updateSessionTokens,
  setSessionTokens,
} from "../repositories/session";
import { createObservation } from "../repositories/observation";
import { processSessionEnd } from "../services/session-end-orchestrator";
import {
  buildRelatedContext,
  isContextInjectionAvailable,
} from "../services/context";
import { findOrCreateProjectByWorkingDir } from "../services/project-linking";
import { hookLogger as log } from "../utils/logger";
import { emitTokensUpdated } from "../websocket";

const hooksRouter = new Hono();

// ==================== セキュリティミドルウェア ====================

/**
 * localhost のみアクセス許可するミドルウェア
 * ローカル専用アプリケーションのため、外部からのアクセスを拒否
 */
const localhostOnly = createMiddleware(async (c, next) => {
  const forwardedFor = c.req.header("x-forwarded-for");
  const realIp = c.req.header("x-real-ip");

  // プロキシ経由の場合は拒否（ローカル専用のため）
  if (forwardedFor || realIp) {
    log.warn("Rejected: Request through proxy");
    return c.json({ error: "Forbidden" }, 403);
  }

  // Host ヘッダーでローカルホストを確認
  const host = c.req.header("host") || "";
  const isLocalHost =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]");

  if (!isLocalHost) {
    log.warn("Rejected: Non-localhost host", { host });
    return c.json({ error: "Forbidden" }, 403);
  }

  await next();
});

// 全エンドポイントにローカルホスト制限を適用
hooksRouter.use("/*", localhostOnly);

// ==================== バリデーションヘルパー ====================

/**
 * Zod バリデーションエラーハンドラ（共通）
 * DRY原則: 全エンドポイントで同じエラーレスポンス形式を使用
 */
function handleValidationError(
  result: {
    success: boolean;
    error?: {
      flatten: () => { fieldErrors: Record<string, string[] | undefined> };
    };
  },
  c: { json: (data: unknown, status: number) => Response }
): Response | undefined {
  if (!result.success && result.error) {
    return c.json(
      {
        error: "Validation Error",
        details: result.error.flatten().fieldErrors,
      },
      400
    );
  }
  return undefined;
}

// ==================== スキーマ定義 ====================

// セッションIDの形式: 英数字とハイフン、アンダースコアのみ（最大256文字）
const sessionIdSchema = z
  .string()
  .min(1)
  .max(256)
  .regex(/^[a-zA-Z0-9_-]+$/, "Invalid session ID format");

const SessionStartSchema = z.object({
  sessionId: sessionIdSchema,
  workingDirectory: z.string().max(1024).optional(),
  startedAt: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  /** コンテキスト注入を要求する場合 true */
  requestContext: z.boolean().optional().default(false),
  /** コンテキスト検索クエリ（workingDirectory から自動生成も可能） */
  contextQuery: z.string().max(2000).optional(),
});

/** トークン使用量スキーマ */
const UsageSchema = z.object({
  inputTokens: z.number().int().min(0),
  outputTokens: z.number().int().min(0),
});

const SessionEndSchema = z.object({
  sessionId: sessionIdSchema,
  transcriptPath: z.string().max(2048).optional(),
  endedAt: z.string().optional(),
  status: z.enum(["completed", "error", "cancelled"]).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  /** トークン使用量（セッション終了時の合計） */
  usage: UsageSchema.optional(),
});

const PostToolUseSchema = z.object({
  sessionId: sessionIdSchema,
  toolName: z.string().min(1).max(100),
  title: z.string().min(1).max(500),
  content: z.string().max(10000).optional().default(""),
  metadata: z.record(z.string(), z.unknown()).optional(),
  /** トークン使用量（累積更新される） */
  usage: UsageSchema.optional(),
});

// ==================== エンドポイント ====================

/**
 * POST /hook/session-start - セッション開始
 *
 * 新しいセッションを登録する。
 * requestContext=true の場合、関連セッションを検索してコンテキストを返す。
 */
hooksRouter.post(
  "/session-start",
  zValidator("json", SessionStartSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // Claude Code セッション ID で既存セッションチェック
    const existing = getSessionByClaudeId(data.sessionId);
    if (existing) {
      // 既存セッションがあれば更新（processing = アクティブ状態）
      const updated = updateSession(existing.sessionId, {
        status: "processing",
      });

      // 既存セッションでもコンテキスト注入を要求可能
      let contextText: string | null = null;
      if (data.requestContext) {
        contextText = await getContextForSession(
          data.contextQuery,
          data.workingDirectory
        );
      }

      return c.json({
        id: updated?.sessionId,
        action: "resumed",
        contextText,
      });
    }

    // workingDirectory からプロジェクトを検索または作成
    const workingDir = data.workingDirectory || process.cwd();
    const project = findOrCreateProjectByWorkingDir(workingDir);

    // 新規セッション作成
    const session = createSession({
      name: `Session ${data.sessionId}`,
      workingDir,
      projectId: project?.projectId,
    });

    // Claude Code セッション ID を紐付け + processing 状態に更新
    updateSession(session.sessionId, {
      claudeSessionId: data.sessionId,
      status: "processing",
    });

    // 同じプロジェクトの古いprocessingセッションをcompletedに更新（起動時クリーンアップ）
    const cleanedUp = cleanupStaleProcessingSessions(
      project?.projectId,
      session.sessionId
    );
    if (cleanedUp > 0) {
      log.info("Cleaned up stale processing sessions", {
        count: cleanedUp,
        projectId: project?.projectId,
      });
    }

    if (project) {
      log.info("Session linked to project", {
        sessionId: session.sessionId,
        projectId: project.projectId,
        projectName: project.name,
      });
    }

    log.info("Session started", {
      sessionId: session.sessionId,
      claudeSessionId: data.sessionId,
    });

    // コンテキスト注入を要求された場合、関連セッションを検索
    let contextText: string | null = null;
    if (data.requestContext) {
      contextText = await getContextForSession(
        data.contextQuery,
        data.workingDirectory
      );
    }

    return c.json(
      { id: session.sessionId, action: "created", contextText },
      201
    );
  }
);

/**
 * 関連セッションのコンテキストを取得
 *
 * @param contextQuery - 明示的な検索クエリ
 * @param workingDirectory - 作業ディレクトリ（クエリ生成に使用）
 * @returns コンテキスト文字列（取得できない場合は null）
 */
async function getContextForSession(
  contextQuery?: string,
  workingDirectory?: string
): Promise<string | null> {
  // コンテキスト注入が利用不可の場合
  if (!isContextInjectionAvailable()) {
    log.debug("Context injection not available");
    return null;
  }

  // クエリを決定（明示的なクエリ > ディレクトリ名 > null）
  let query = contextQuery;
  if (!query && workingDirectory) {
    // ディレクトリパスからプロジェクト名を抽出してクエリにする
    const parts = workingDirectory.split(/[/\\]/);
    const projectName = parts[parts.length - 1];
    if (projectName) {
      query = `Project: ${projectName}`;
    }
  }

  if (!query) {
    log.debug("No context query available");
    return null;
  }

  try {
    const context = await buildRelatedContext(query, {
      maxSessions: 3,
      maxTokens: 2000,
      minRelevanceScore: 0.3,
    });

    if (context.sessions.length === 0) {
      log.debug("No related sessions found", { query });
      return null;
    }

    log.info("Context injection prepared", {
      query,
      sessionsCount: context.sessions.length,
      estimatedTokens: context.estimatedTokens,
    });

    return context.contextText;
  } catch (error) {
    log.error("Failed to build context", error as Error, { query });
    return null;
  }
}

/**
 * POST /hook/session-end - セッション終了
 *
 * セッションを終了状態にし、要約・タイトル・Embedding を生成する。
 * 連鎖処理は非同期で実行され、失敗してもセッション終了は成功する。
 */
hooksRouter.post(
  "/session-end",
  zValidator("json", SessionEndSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // Claude Code セッション ID でセッション取得
    const session = getSessionByClaudeId(data.sessionId);
    if (!session) {
      // セキュリティ: エラーレスポンスにsessionIdを含めない
      log.warn("Session not found", { claudeSessionId: data.sessionId });
      return c.json({ error: "Session not found" }, 404);
    }

    // ステータス更新（内部 sessionId を使用）
    const status = data.status === "error" ? "error" : "completed";
    const updated = updateSession(session.sessionId, { status });

    if (!updated) {
      log.error("Failed to update session", undefined, {
        sessionId: session.sessionId,
      });
      return c.json({ error: "Failed to update session" }, 500);
    }

    log.info("Session ended", { sessionId: session.sessionId, status });

    // トークン使用量が指定されていればセッションに設定
    let tokensUpdated: boolean | undefined;
    if (data.usage) {
      setSessionTokens(session.sessionId, {
        inputTokens: data.usage.inputTokens,
        outputTokens: data.usage.outputTokens,
      });
      tokensUpdated = true;

      // WebSocketでリアルタイム通知
      emitTokensUpdated(
        session.sessionId,
        data.usage.inputTokens,
        data.usage.outputTokens
      );

      log.info("Session tokens set", {
        sessionId: session.sessionId,
        inputTokens: data.usage.inputTokens,
        outputTokens: data.usage.outputTokens,
      });
    }

    // トランスクリプトがある場合は連鎖処理を実行
    // metadata.transcriptPath または直接 transcriptPath から取得
    const transcriptPath = data.transcriptPath || data.metadata?.transcriptPath;

    if (transcriptPath) {
      // 非同期で要約・タイトル・Embedding を生成
      // エラーが発生しても API レスポンスには影響しない
      processSessionEnd({
        sessionId: session.sessionId,
        transcriptPath,
        cwd: data.metadata?.cwd,
      }).catch((error) => {
        log.error("Session end processing failed", error as Error, {
          sessionId: session.sessionId,
        });
      });
    }

    return c.json({
      sessionId: session.sessionId,
      status,
      processingStarted: !!transcriptPath,
      ...(tokensUpdated && { tokensUpdated }),
    });
  }
);

/**
 * POST /hook/post-tooluse - ツール使用記録
 *
 * ツール使用を観測記録として保存する。
 */
hooksRouter.post(
  "/post-tooluse",
  zValidator("json", PostToolUseSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // Claude Code セッション ID でセッション存在チェック（存在しない場合はスキップ）
    const session = getSessionByClaudeId(data.sessionId);
    if (!session) {
      // セッションが存在しない場合は静かにスキップ
      // （セッション開始前にツールが使用される可能性があるため）
      log.debug("Session not found, skipping observation", {
        claudeSessionId: data.sessionId,
      });
      return c.json({ status: "skipped", reason: "session_not_found" });
    }

    // 観測記録を作成（内部 sessionId を使用）
    const observation = createObservation({
      sessionId: session.sessionId,
      type: "tool_use",
      title: data.title,
      content: data.content || "",
      metadata: {
        toolName: data.toolName,
        ...data.metadata,
      },
    });

    // セッションのupdated_atを更新（タイムアウトクリーンアップ対象から除外するため）
    touchSession(session.sessionId);

    // トークン使用量が指定されていればセッションに設定（全体の合計値）
    let tokensUpdated: boolean | undefined;
    if (data.usage) {
      setSessionTokens(session.sessionId, {
        inputTokens: data.usage.inputTokens,
        outputTokens: data.usage.outputTokens,
      });
      tokensUpdated = true;

      // WebSocketでリアルタイム通知
      emitTokensUpdated(
        session.sessionId,
        data.usage.inputTokens,
        data.usage.outputTokens
      );

      log.debug("Session tokens set", {
        sessionId: session.sessionId,
        inputTokens: data.usage.inputTokens,
        outputTokens: data.usage.outputTokens,
      });
    }

    log.debug("Tool use recorded", {
      observationId: observation.observationId,
      toolName: data.toolName,
    });

    return c.json({
      observationId: observation.observationId,
      status: "recorded",
      ...(tokensUpdated && { tokensUpdated }),
    });
  }
);

export { hooksRouter };
