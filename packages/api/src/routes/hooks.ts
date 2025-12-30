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
import {
  createSession,
  getSessionById,
  updateSession,
} from "../repositories/session";
import { generateSummary } from "../services/summarizer";
import type { Message } from "@claude-cnthub/shared";

const hooksRouter = new Hono();

// ==================== スキーマ定義 ====================

const SessionStartSchema = z.object({
  sessionId: z.string().min(1),
  workingDirectory: z.string().optional(),
  startedAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const SessionStopSchema = z.object({
  sessionId: z.string().min(1),
  stoppedAt: z.string().optional(),
  transcript: z.array(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

const SessionEndSchema = z.object({
  sessionId: z.string().min(1),
  endedAt: z.string().optional(),
  status: z.enum(["completed", "error", "cancelled"]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// ==================== エンドポイント ====================

/**
 * POST /hook/session-start - セッション開始
 *
 * 新しいセッションを登録する。
 */
hooksRouter.post(
  "/session-start",
  zValidator("json", SessionStartSchema, (result, c) => {
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
  async (c) => {
    const data = c.req.valid("json");

    // 既存セッションチェック
    const existing = getSessionById(data.sessionId);
    if (existing) {
      // 既存セッションがあれば更新
      const updated = updateSession(data.sessionId, {
        status: "active",
      });
      return c.json({ id: updated?.id, action: "resumed" });
    }

    // 新規セッション作成
    const session = createSession({
      name: `Session ${data.sessionId}`,
      workingDir: data.workingDirectory,
    });

    console.error(`[Hook] Session started: ${session.id}`);

    return c.json({ id: session.id, action: "created" }, 201);
  }
);

/**
 * POST /hook/session-stop - セッション停止
 *
 * セッションの要約を生成する。
 */
hooksRouter.post(
  "/session-stop",
  zValidator("json", SessionStopSchema, (result, c) => {
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
  async (c) => {
    const data = c.req.valid("json");

    // セッション取得
    const session = getSessionById(data.sessionId);
    if (!session) {
      return c.json(
        { error: "Session not found", sessionId: data.sessionId },
        404
      );
    }

    // トランスクリプトから要約生成
    let summary = null;
    if (data.transcript && data.transcript.length > 0) {
      try {
        // トランスクリプトをMessage形式に変換
        const messages: Message[] = data.transcript.map(
          (msg: unknown, index: number) => {
            const m = msg as { role?: string; content?: string };
            return {
              id: `msg-${index}`,
              sessionId: data.sessionId,
              type: m.role === "user" ? "user" : "assistant",
              content: m.content || "",
              createdAt: new Date(),
            };
          }
        );

        summary = await generateSummary(data.sessionId, messages);
        console.error(`[Hook] Summary generated for session: ${data.sessionId}`);
      } catch (error) {
        console.error(`[Hook] Summary generation failed:`, error);
        // 要約生成失敗でもセッションは継続
      }
    }

    return c.json({
      sessionId: data.sessionId,
      summary: summary?.shortSummary || null,
      detailedSummary: summary?.detailedSummary || null,
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
  zValidator("json", SessionEndSchema, (result, c) => {
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
  async (c) => {
    const data = c.req.valid("json");

    // セッション取得
    const session = getSessionById(data.sessionId);
    if (!session) {
      return c.json(
        { error: "Session not found", sessionId: data.sessionId },
        404
      );
    }

    // ステータス更新
    const status = data.status === "error" ? "error" : "completed";
    updateSession(data.sessionId, { status });

    console.error(`[Hook] Session ended: ${data.sessionId} (${status})`);

    return c.json({
      sessionId: data.sessionId,
      status,
    });
  }
);

export { hooksRouter };
