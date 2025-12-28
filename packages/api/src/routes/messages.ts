/**
 * メッセージ API ルート
 *
 * セッションに紐づくメッセージのCRUD操作を提供。
 * ネストされたリソース構造: /sessions/:sessionId/messages
 *
 * エンドポイント:
 * - POST   /sessions/:sessionId/messages     - メッセージ送信
 * - GET    /sessions/:sessionId/messages     - メッセージ一覧
 * - DELETE /sessions/:sessionId/messages/:id - メッセージ削除
 */

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Session } from "@claude-cnthub/shared";
import {
  createMessage,
  listMessages,
  deleteMessage,
} from "../repositories/message";
import { getSession } from "../repositories/session";

/**
 * ミドルウェアで設定するコンテキスト変数の型定義
 */
type Variables = {
  session: Session;
  sessionId: string;
};

/**
 * バリデーションスキーマ: メッセージ送信
 *
 * 必須: content
 * typeはデフォルトで "user"（ユーザーからの入力として扱う）
 */
const sendMessageSchema = z.object({
  content: z.string().min(1, "メッセージ内容は必須です"),
  type: z
    .enum([
      "user",
      "assistant",
      "system",
      "tool_use",
      "tool_result",
      "thinking",
      "error",
    ] as const)
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * バリデーションスキーマ: クエリパラメータ
 *
 * メッセージ一覧取得時のフィルタとページネーション
 */
const listQuerySchema = z.object({
  type: z
    .enum([
      "user",
      "assistant",
      "system",
      "tool_use",
      "tool_result",
      "thinking",
      "error",
    ] as const)
    .optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

// ルーター作成（:sessionIdパラメータを受け取る）
// Variables型を指定してコンテキスト変数の型安全性を確保
const messagesRouter = new Hono<{ Variables: Variables }>();

/**
 * セッション存在確認ミドルウェア
 *
 * セッションが存在しない場合は404を返して処理を中断。
 * 存在する場合はコンテキストにセッション情報を追加。
 */
messagesRouter.use("/*", async (c, next) => {
  const sessionId = c.req.param("sessionId");
  if (!sessionId) {
    return c.json({ error: "Session ID is required" }, 400);
  }

  const session = getSession(sessionId);
  if (!session) {
    return c.json({ error: "Session not found", sessionId }, 404);
  }

  // コンテキストにセッション情報を保存
  c.set("session", session);
  c.set("sessionId", sessionId);

  await next();
});

/**
 * POST /sessions/:sessionId/messages - メッセージ送信
 *
 * ユーザーからのメッセージを保存。
 * 将来的にはここでAI応答のトリガーも行う。
 */
messagesRouter.post(
  "/",
  zValidator("json", sendMessageSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  (c) => {
    const sessionId = c.get("sessionId");
    const data = c.req.valid("json");

    const message = createMessage({
      sessionId,
      type: data.type ?? "user",
      content: data.content,
      metadata: data.metadata,
    });

    // 201 Created で新規メッセージを返す
    return c.json(message, 201);
  }
);

/**
 * GET /sessions/:sessionId/messages - メッセージ一覧取得
 *
 * セッション内のメッセージをタイムスタンプ昇順で取得。
 * フィルタとページネーションに対応。
 */
messagesRouter.get(
  "/",
  zValidator("query", listQuerySchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  (c) => {
    const sessionId = c.get("sessionId");
    const { type, page, limit } = c.req.valid("query");

    const result = listMessages(sessionId, {
      type,
      page: page ?? 1,
      limit: limit ?? 50,
    });

    return c.json(result);
  }
);

/**
 * DELETE /sessions/:sessionId/messages/:messageId - メッセージ削除
 *
 * 指定されたメッセージを削除。
 * 存在しない場合は404を返す。
 */
messagesRouter.delete("/:messageId", (c) => {
  const messageId = c.req.param("messageId");
  const deleted = deleteMessage(messageId);

  if (!deleted) {
    return c.json({ error: "Message not found", messageId }, 404);
  }

  // 204 No Content
  return c.body(null, 204);
});

export { messagesRouter };
