/**
 * Hook API ルート
 *
 * Claude Code プラグインからの Hook イベントを受信。
 *
 * エンドポイント:
 * - POST /hook/session-start - セッション開始
 * - POST /hook/session-stop  - セッション停止（要約生成トリガー）
 * - POST /hook/session-end   - セッション終了
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createMiddleware } from "hono/factory";
import {
  createSession,
  getSessionById,
  updateSession,
} from "../repositories/session";
import { generateSummary } from "../services/summarizer";
import { hookLogger as log } from "../utils/logger";
import type { Message } from "@claude-cnthub/shared";

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

// トランスクリプトメッセージの型定義
const TranscriptMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(100000), // 最大100KB per message
});

const SessionStartSchema = z.object({
  sessionId: sessionIdSchema,
  workingDirectory: z.string().max(1024).optional(),
  startedAt: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

const SessionStopSchema = z.object({
  sessionId: sessionIdSchema,
  stoppedAt: z.string().optional(),
  transcript: z.array(TranscriptMessageSchema).max(1000).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

const SessionEndSchema = z.object({
  sessionId: sessionIdSchema,
  endedAt: z.string().optional(),
  status: z.enum(["completed", "error", "cancelled"]).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

// ==================== エンドポイント ====================

/**
 * POST /hook/session-start - セッション開始
 *
 * 新しいセッションを登録する。
 */
hooksRouter.post(
  "/session-start",
  zValidator("json", SessionStartSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // 既存セッションチェック
    const existing = getSessionById(data.sessionId);
    if (existing) {
      // 既存セッションがあれば更新（processing = アクティブ状態）
      const updated = updateSession(data.sessionId, {
        status: "processing",
      });
      return c.json({ id: updated?.sessionId, action: "resumed" });
    }

    // 新規セッション作成
    const session = createSession({
      name: `Session ${data.sessionId}`,
      workingDir: data.workingDirectory || process.cwd(),
    });

    log.info("Session started", { sessionId: session.sessionId });

    return c.json({ id: session.sessionId, action: "created" }, 201);
  }
);

/**
 * POST /hook/session-stop - セッション停止
 *
 * セッションの要約を生成する。
 */
hooksRouter.post(
  "/session-stop",
  zValidator("json", SessionStopSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // セッション取得
    const session = getSessionById(data.sessionId);
    if (!session) {
      // セキュリティ: エラーレスポンスにsessionIdを含めない
      log.warn("Session not found", { sessionId: data.sessionId });
      return c.json({ error: "Session not found" }, 404);
    }

    // トランスクリプトから要約生成
    let summary = null;
    let summaryError: string | null = null;

    if (data.transcript && data.transcript.length > 0) {
      try {
        // 型安全なメッセージ変換（スキーマで検証済み）
        const now = new Date(); // パフォーマンス: 1回だけ生成
        const messages: Message[] = data.transcript.map((msg, index) => ({
          messageId: `msg-${data.sessionId}-${index}`,
          sessionId: data.sessionId,
          type: msg.role,
          content: msg.content,
          compressed: false,
          timestamp: now,
        }));

        summary = await generateSummary(data.sessionId, messages);
        log.info("Summary generated", { sessionId: data.sessionId });
      } catch (error) {
        log.error("Summary generation failed", error, {
          sessionId: data.sessionId,
        });
        summaryError = "Summary generation failed";
        // グレースフルデグラデーション: 要約生成失敗でもセッションは継続
      }
    }

    return c.json({
      sessionId: data.sessionId,
      summary: summary?.shortSummary || null,
      detailedSummary: summary?.detailedSummary || null,
      ...(summaryError && { warning: summaryError }),
    });
  }
);

/**
 * POST /hook/session-end - セッション終了
 *
 * セッションを終了状態にする。
 */
hooksRouter.post(
  "/session-end",
  zValidator("json", SessionEndSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    // セッション取得
    const session = getSessionById(data.sessionId);
    if (!session) {
      // セキュリティ: エラーレスポンスにsessionIdを含めない
      log.warn("Session not found", { sessionId: data.sessionId });
      return c.json({ error: "Session not found" }, 404);
    }

    // ステータス更新
    const status = data.status === "error" ? "error" : "completed";
    const updated = updateSession(data.sessionId, { status });

    if (!updated) {
      log.error("Failed to update session", undefined, {
        sessionId: data.sessionId,
      });
      return c.json({ error: "Failed to update session" }, 500);
    }

    log.info("Session ended", { sessionId: data.sessionId, status });

    return c.json({
      sessionId: data.sessionId,
      status,
    });
  }
);

export { hooksRouter };
