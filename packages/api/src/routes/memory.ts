/**
 * Memory API ルート
 *
 * セッション要約の生成・取得・一覧を提供。
 * AI要約機能のエントリーポイント。
 *
 * エンドポイント:
 * - POST /api/memory/sessions/:id/summarize - 要約生成
 * - GET /api/memory/sessions/:id/summary - 要約取得
 * - GET /api/memory/summaries - 要約一覧
 */

import { Hono } from "hono";
import type { SessionSummary } from "@claude-cnthub/shared";
import { getSession } from "../repositories/session";
import { getSessionMessages } from "../repositories/message";
import {
  createSummary,
  getSummaryBySessionId,
  listSummaries,
} from "../repositories/summary";
import { generateSummary } from "../services/summarizer";
import { ListSummariesSchema } from "../schemas";

const memory = new Hono();

/**
 * POST /sessions/:id/summarize
 *
 * セッションのメッセージからAI要約を生成
 */
memory.post("/sessions/:id/summarize", async (c) => {
  const sessionId = c.req.param("id");

  // セッションの存在確認
  const session = getSession(sessionId);
  if (!session) {
    return c.json(
      { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
      404
    );
  }

  // セッションのメッセージを取得
  const { items: messages } = getSessionMessages(sessionId);

  // AI要約を生成
  const generatedSummary = await generateSummary(sessionId, messages);

  // DBに保存
  const savedSummary = createSummary({
    sessionId: generatedSummary.sessionId,
    shortSummary: generatedSummary.shortSummary,
    detailedSummary: generatedSummary.detailedSummary,
    keyDecisions: generatedSummary.keyDecisions,
    filesModified: generatedSummary.filesModified,
    toolsUsed: generatedSummary.toolsUsed,
    topics: generatedSummary.topics,
    originalTokenCount: generatedSummary.originalTokenCount,
    summaryTokenCount: generatedSummary.summaryTokenCount,
    compressionRatio: generatedSummary.compressionRatio,
  });

  return c.json(savedSummary, 200);
});

/**
 * GET /sessions/:id/summary
 *
 * セッションの要約を取得
 */
memory.get("/sessions/:id/summary", async (c) => {
  const sessionId = c.req.param("id");

  // セッションの存在確認
  const session = getSession(sessionId);
  if (!session) {
    return c.json(
      { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
      404
    );
  }

  // 要約を取得
  const summary = getSummaryBySessionId(sessionId);
  if (!summary) {
    return c.json(
      {
        error: {
          code: "SUMMARY_NOT_FOUND",
          message: "Summary not found for this session",
        },
      },
      404
    );
  }

  return c.json(summary, 200);
});

/**
 * GET /summaries
 *
 * 全要約一覧（ページネーション対応）
 */
memory.get("/summaries", async (c) => {
  // Zodでクエリパラメータをバリデーション
  const queryParams = ListSummariesSchema.parse({
    page: c.req.query("page"),
    limit: c.req.query("limit"),
  });

  const result = listSummaries({
    page: queryParams.page,
    limit: queryParams.limit,
  });

  return c.json(result, 200);
});

export { memory };
