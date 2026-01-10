/**
 * Pending Inject API ルート
 *
 * コンテキスト注入の残り部分を一時保存するAPI。
 * セッション開始時に全コンテキストを注入できない場合、
 * 残り部分を保存しておき、後で取得・削除できる。
 *
 * エンドポイント:
 * - POST   /api/inject/pending              - 残り部分を一時保存
 * - GET    /api/inject/pending/:sessionId   - pending があるか確認
 * - DELETE /api/inject/pending/:sessionId   - 注入完了後に削除
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createMiddleware } from "hono/factory";
import { findSourceSessionIdsByTarget } from "../repositories/edge";
import { getSummariesBySessionIds } from "../repositories/summary";
import { getSessionById } from "../repositories/session";

const injectRouter = new Hono();

// ==================== インメモリストレージ ====================

/**
 * PendingInject エントリ
 */
interface PendingInject {
  sessionId: string;
  context: string;
  createdAt: Date;
  expiresAt: Date;
}

/**
 * インメモリストレージ
 * キー: sessionId
 * 値: PendingInject
 */
const pendingInjectStore = new Map<string, PendingInject>();

/**
 * デフォルトの有効期限（1時間）
 */
const DEFAULT_TTL_MS = 60 * 60 * 1000;

/**
 * 期限切れエントリを削除する（lazy deletion の補助）
 */
function cleanupExpiredEntries(): void {
  const now = new Date();
  for (const [sessionId, entry] of pendingInjectStore.entries()) {
    if (entry.expiresAt <= now) {
      pendingInjectStore.delete(sessionId);
    }
  }
}

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
    return c.json({ error: "Forbidden" }, 403);
  }

  // Host ヘッダーでローカルホストを確認
  const host = c.req.header("host") || "";
  const isLocalHost =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]");

  if (!isLocalHost) {
    return c.json({ error: "Forbidden" }, 403);
  }

  await next();
});

// 全エンドポイントにローカルホスト制限を適用
injectRouter.use("/*", localhostOnly);

// ==================== バリデーションヘルパー ====================

/**
 * Zod バリデーションエラーハンドラ（共通）
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

const CreatePendingInjectSchema = z.object({
  sessionId: sessionIdSchema,
  context: z.string().min(1).max(100000), // 最大100KB
});

// ==================== エンドポイント ====================

/**
 * POST /pending - 残り部分を一時保存
 *
 * 同じ sessionId で再度呼ばれた場合は上書きする。
 */
injectRouter.post(
  "/pending",
  zValidator("json", CreatePendingInjectSchema, handleValidationError),
  async (c) => {
    const data = c.req.valid("json");

    const now = new Date();
    const expiresAt = new Date(now.getTime() + DEFAULT_TTL_MS);

    const entry: PendingInject = {
      sessionId: data.sessionId,
      context: data.context,
      createdAt: now,
      expiresAt,
    };

    // 同じ sessionId があれば上書き
    pendingInjectStore.set(data.sessionId, entry);

    return c.json(
      {
        sessionId: entry.sessionId,
        createdAt: entry.createdAt.toISOString(),
        expiresAt: entry.expiresAt.toISOString(),
      },
      201
    );
  }
);

/**
 * GET /pending/:sessionId - pending があるか確認
 *
 * 期限切れの場合は 404 を返す（lazy deletion）。
 */
injectRouter.get("/pending/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const entry = pendingInjectStore.get(sessionId);

  // 存在しない場合
  if (!entry) {
    return c.json({ error: "Pending inject not found" }, 404);
  }

  // 期限切れの場合は削除して 404
  const now = new Date();
  if (entry.expiresAt <= now) {
    pendingInjectStore.delete(sessionId);
    return c.json({ error: "Pending inject not found" }, 404);
  }

  return c.json({
    sessionId: entry.sessionId,
    context: entry.context,
    createdAt: entry.createdAt.toISOString(),
    expiresAt: entry.expiresAt.toISOString(),
  });
});

/**
 * DELETE /pending/:sessionId - 注入完了後に削除
 */
injectRouter.delete("/pending/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const entry = pendingInjectStore.get(sessionId);

  // 存在しない場合（期限切れも含む）
  if (!entry) {
    return c.json({ error: "Pending inject not found" }, 404);
  }

  // 期限切れの場合も削除して 404
  const now = new Date();
  if (entry.expiresAt <= now) {
    pendingInjectStore.delete(sessionId);
    return c.json({ error: "Pending inject not found" }, 404);
  }

  // 削除
  pendingInjectStore.delete(sessionId);

  // 204 No Content
  return c.body(null, 204);
});

// ==================== 接続セッションコンテキスト ====================

/**
 * GET /connected/:claudeSessionId - UIで接続されたセッションのコンテキストを取得
 *
 * NodeEditorでセッションノードを接続した場合、
 * そのセッションのコンテキストをまとめて返す。
 */
injectRouter.get("/connected/:claudeSessionId", async (c) => {
  const claudeSessionId = c.req.param("claudeSessionId");

  // 接続されたソースセッションIDを取得
  const sourceSessionIds = findSourceSessionIdsByTarget(claudeSessionId);

  if (sourceSessionIds.length === 0) {
    return c.json({
      claudeSessionId,
      connected: false,
      sourceSessionIds: [],
      context: null,
    });
  }

  // セッション情報と要約を取得
  const summaries = getSummariesBySessionIds(sourceSessionIds);

  // コンテキストをフォーマット
  const contextParts: string[] = [];

  for (const sessionId of sourceSessionIds) {
    const session = getSessionById(sessionId);
    const summary = summaries.get(sessionId);

    if (session) {
      const sessionName = session.name || sessionId;
      const summaryText =
        summary?.shortSummary || summary?.detailedSummary || "(要約なし)";
      const decisions = summary?.keyDecisions || [];
      const files = summary?.filesModified || [];

      let part = `## ${sessionName} (${sessionId})\n`;
      part += `\n${summaryText}\n`;

      if (decisions.length > 0) {
        part += `\n**決定事項:**\n`;
        for (const decision of decisions) {
          part += `- ${decision}\n`;
        }
      }

      if (files.length > 0) {
        part += `\n**変更ファイル:**\n`;
        for (const file of files) {
          part += `- \`${file}\`\n`;
        }
      }

      contextParts.push(part);
    }
  }

  const context =
    contextParts.length > 0
      ? `# UIで接続されたセッションのコンテキスト\n\n${contextParts.join("\n---\n\n")}`
      : null;

  return c.json({
    claudeSessionId,
    connected: true,
    sourceSessionIds,
    sessionCount: sourceSessionIds.length,
    context,
  });
});

// ==================== 定期クリーンアップ（オプション） ====================

/**
 * 5分ごとに期限切れエントリをクリーンアップ
 * テスト時は無効化可能
 */
if (process.env.NODE_ENV !== "test") {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

// ==================== 内部API ====================

/**
 * pending_injectにコンテキストを追加（内部API）
 *
 * Edge作成時に呼び出される
 *
 * @param sessionId - ターゲットのClaude Session ID
 * @param context - 注入するコンテキスト文字列
 * @param append - 既存のコンテキストに追記するか（デフォルト: true）
 */
export function addPendingInject(
  sessionId: string,
  context: string,
  append: boolean = true
): void {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + DEFAULT_TTL_MS);

  const existing = pendingInjectStore.get(sessionId);

  // 期限切れの場合は削除
  if (existing && existing.expiresAt <= now) {
    pendingInjectStore.delete(sessionId);
  }

  const currentContext =
    existing && existing.expiresAt > now ? existing.context : "";

  const newContext =
    append && currentContext
      ? `${currentContext}\n\n---\n\n${context}`
      : context;

  const entry: PendingInject = {
    sessionId,
    context: newContext,
    createdAt: existing?.createdAt || now,
    expiresAt,
  };

  pendingInjectStore.set(sessionId, entry);
}

/**
 * pending_injectのコンテキストを取得して削除（内部API）
 *
 * @param sessionId - ターゲットのClaude Session ID
 * @returns コンテキスト文字列、存在しない場合はnull
 */
export function consumePendingInject(sessionId: string): string | null {
  const entry = pendingInjectStore.get(sessionId);

  if (!entry) {
    return null;
  }

  // 期限切れの場合は削除してnull
  const now = new Date();
  if (entry.expiresAt <= now) {
    pendingInjectStore.delete(sessionId);
    return null;
  }

  // 取得後に削除
  pendingInjectStore.delete(sessionId);
  return entry.context;
}

/**
 * pending_injectが存在するか確認（内部API）
 *
 * @param sessionId - ターゲットのClaude Session ID
 * @returns 存在する場合true
 */
export function hasPendingInject(sessionId: string): boolean {
  const entry = pendingInjectStore.get(sessionId);
  if (!entry) return false;

  const now = new Date();
  if (entry.expiresAt <= now) {
    pendingInjectStore.delete(sessionId);
    return false;
  }

  return true;
}

// ==================== テスト用エクスポート ====================

export { injectRouter, pendingInjectStore, cleanupExpiredEntries };
