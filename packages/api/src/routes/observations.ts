/**
 * Observations API ルート
 *
 * セッションの観測記録を取得・管理する。
 *
 * エンドポイント:
 * - GET    /sessions/:sessionId/observations     - 観測記録一覧
 * - POST   /sessions/:sessionId/observations     - 観測記録作成
 * - POST   /sessions/:sessionId/analyze          - AI でグルーピング分析 (SE-01)
 * - POST   /sessions/:sessionId/export           - 観測記録をエクスポート
 * - POST   /sessions/:sessionId/smart-export     - Smart Export (SE-03)
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  listObservations,
  createObservation,
  getObservationById,
  deleteObservation,
  type ObservationType,
} from "../repositories/observation";
import {
  getSessionById,
  createSession,
  updateSession,
} from "../repositories/session";
import { createSummary } from "../repositories/summary";
import { generateSummary } from "../services/summarizer";
import { analyzeObservations } from "../services/observation-analyzer";
import { hookLogger as log } from "../utils/logger";
import type { Message } from "@claude-cnthub/shared";

const observationsRouter = new Hono();

// ==================== 定数 ====================

/** エクスポート時の最大観測記録数 */
const MAX_EXPORT_OBSERVATIONS = 1000;

// ==================== スキーマ定義 ====================

const ListObservationsSchema = z.object({
  type: z
    .enum(["tool_use", "decision", "error", "learning", "note", "file_change"])
    .optional(),
  limit: z.coerce.number().min(1).max(500).default(100),
  page: z.coerce.number().min(1).default(1),
});

const CreateObservationSchema = z.object({
  type: z.enum([
    "tool_use",
    "decision",
    "error",
    "learning",
    "note",
    "file_change",
  ]),
  title: z.string().min(1).max(500),
  content: z.string().max(10000).default(""),
  metadata: z.record(z.unknown()).optional(),
});

const ExportObservationsSchema = z.object({
  observationIds: z.array(z.string()).min(1),
  groupName: z.string().min(1).max(200),
});

const SmartExportSchema = z.object({
  observationIds: z.array(z.string()).min(1),
  groupName: z.string().min(1).max(200),
  deleteAfterExport: z.boolean().default(true),
});

// ==================== エンドポイント ====================

/**
 * GET /sessions/:sessionId/observations - 観測記録一覧
 */
observationsRouter.get(
  "/",
  zValidator("query", ListObservationsSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation Error",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const sessionId = c.req.param("sessionId");
    if (!sessionId) {
      return c.json(
        { error: { code: "MISSING_PARAM", message: "Session ID is required" } },
        400
      );
    }
    const query = c.req.valid("query");

    // セッション存在確認
    const session = getSessionById(sessionId);
    if (!session) {
      return c.json(
        { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
        404
      );
    }

    const result = listObservations({
      sessionId,
      type: query.type as ObservationType | undefined,
      page: query.page,
      limit: query.limit,
    });

    return c.json(result);
  }
);

/**
 * POST /sessions/:sessionId/observations - 観測記録作成
 */
observationsRouter.post(
  "/",
  zValidator("json", CreateObservationSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation Error",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const sessionId = c.req.param("sessionId");
    if (!sessionId) {
      return c.json(
        { error: { code: "MISSING_PARAM", message: "Session ID is required" } },
        400
      );
    }
    const data = c.req.valid("json");

    // セッション存在確認
    const session = getSessionById(sessionId);
    if (!session) {
      return c.json(
        { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
        404
      );
    }

    const observation = createObservation({
      sessionId,
      type: data.type,
      title: data.title,
      content: data.content ?? "",
      metadata: data.metadata,
    });

    return c.json(observation, 201);
  }
);

/**
 * POST /sessions/:sessionId/analyze - AI でグルーピング分析 (SE-01)
 *
 * セッションの observations を AI で分析し、カテゴリ別にグルーピングする。
 * Smart Export 機能の前段階として使用。
 */
observationsRouter.post("/analyze", async (c) => {
  const sessionId = c.req.param("sessionId");
  if (!sessionId) {
    return c.json(
      { error: { code: "MISSING_PARAM", message: "Session ID is required" } },
      400
    );
  }

  // セッション存在確認
  const session = getSessionById(sessionId);
  if (!session) {
    return c.json(
      { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
      404
    );
  }

  // 全ての observations を取得（ページネーションなし）
  const result = listObservations({
    sessionId,
    limit: 500,
    page: 1,
  });

  try {
    // AI で分析
    const analysisResult = await analyzeObservations(result.items);

    return c.json({
      sessionId,
      ...analysisResult,
    });
  } catch (error) {
    log.error("Observation analysis failed", {
      sessionId,
      error: error instanceof Error ? error.message : String(error),
    });
    return c.json(
      {
        error: {
          code: "ANALYSIS_FAILED",
          message: "Failed to analyze observations",
        },
      },
      500
    );
  }
});

/**
 * POST /sessions/:sessionId/export - 観測記録をエクスポート
 *
 * 選択された観測記録から新しいセッションを作成し、要約を生成する。
 */
observationsRouter.post(
  "/export",
  zValidator("json", ExportObservationsSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation Error",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const sourceSessionId = c.req.param("sessionId");
    if (!sourceSessionId) {
      return c.json(
        { error: { code: "MISSING_PARAM", message: "Session ID is required" } },
        400
      );
    }
    const { observationIds, groupName } = c.req.valid("json");

    // 上限チェック
    if (observationIds.length > MAX_EXPORT_OBSERVATIONS) {
      return c.json(
        {
          error: {
            code: "TOO_MANY_OBSERVATIONS",
            message: `Cannot export more than ${MAX_EXPORT_OBSERVATIONS} observations at once`,
          },
        },
        400
      );
    }

    // ソースセッション存在確認
    const sourceSession = getSessionById(sourceSessionId);
    if (!sourceSession) {
      return c.json(
        { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
        404
      );
    }

    // 観測記録を直接IDで取得（N+1問題の修正）
    const selectedObservations = observationIds
      .map((id) => getObservationById(id))
      .filter(
        (obs): obs is NonNullable<typeof obs> =>
          obs !== null && obs.sessionId === sourceSessionId
      );

    if (selectedObservations.length === 0) {
      return c.json(
        {
          error: {
            code: "NO_MATCHING_OBSERVATIONS",
            message: "No matching observations found for the specified IDs",
          },
        },
        400
      );
    }

    // 新しいセッションを作成
    const newSession = createSession({
      name: groupName,
      workingDir: sourceSession.workingDir,
      projectId: sourceSession.projectId ?? undefined,
    });

    // 観測記録をメッセージ形式に変換して要約生成
    const messages: Message[] = selectedObservations.map((obs) => ({
      messageId: obs.observationId,
      sessionId: newSession.sessionId,
      type:
        obs.type === "tool_use"
          ? ("tool_use" as const)
          : ("assistant" as const),
      content: `[${obs.type}] ${obs.title}\n\n${obs.content}`,
      compressed: false,
      timestamp: obs.createdAt,
    }));

    try {
      // 要約を生成
      const summary = await generateSummary(newSession.sessionId, messages);

      // 要約を summaries テーブルに保存
      createSummary({
        sessionId: newSession.sessionId,
        shortSummary: summary.shortSummary,
        detailedSummary: summary.detailedSummary,
        keyDecisions: summary.keyDecisions,
        filesModified: summary.filesModified,
        toolsUsed: summary.toolsUsed,
        topics: summary.topics,
        originalTokenCount: summary.originalTokenCount,
        summaryTokenCount: summary.summaryTokenCount,
        compressionRatio: summary.compressionRatio,
      });

      // 要約を observation として新セッションに保存（トークン数計算用）
      const summaryContent = [
        `## 短い要約\n${summary.shortSummary}`,
        `\n## 詳細な要約\n${summary.detailedSummary}`,
        summary.keyDecisions.length > 0
          ? `\n## 重要な決定事項\n${summary.keyDecisions.map((d) => `- ${d}`).join("\n")}`
          : "",
        summary.filesModified.length > 0
          ? `\n## 変更ファイル\n${summary.filesModified.map((f) => `- ${f}`).join("\n")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      createObservation({
        sessionId: newSession.sessionId,
        type: "note",
        title: `Export Summary (${summary.originalTokenCount} → ${summary.summaryTokenCount} tokens)`,
        content: summaryContent,
        metadata: {
          originalTokenCount: summary.originalTokenCount,
          summaryTokenCount: summary.summaryTokenCount,
          compressionRatio: summary.compressionRatio,
          toolsUsed: summary.toolsUsed,
          topics: summary.topics,
        },
      });

      // Export したセッションは completed に設定
      updateSession(newSession.sessionId, { status: "completed" });
      newSession.status = "completed";

      return c.json(
        {
          session: newSession,
          summary: {
            shortSummary: summary.shortSummary,
            detailedSummary: summary.detailedSummary,
            keyDecisions: summary.keyDecisions,
          },
          observations: [{ type: "note", title: "Export Summary" }],
          observationCount: selectedObservations.length,
        },
        201
      );
    } catch (error) {
      // 要約生成に失敗してもセッションは作成済み
      log.warn("Summary generation failed in export", {
        sessionId: newSession.sessionId,
        error: error instanceof Error ? error.message : String(error),
      });
      return c.json(
        {
          session: newSession,
          summary: null,
          observationCount: selectedObservations.length,
          warning: "Summary generation failed",
        },
        201
      );
    }
  }
);

/**
 * POST /sessions/:sessionId/smart-export - Smart Export (SE-03)
 *
 * 選択された観測記録を Export し、元のセッションから削除する。
 * コンテキスト削減のための機能。
 */
observationsRouter.post(
  "/smart-export",
  zValidator("json", SmartExportSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation Error",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const sourceSessionId = c.req.param("sessionId");
    if (!sourceSessionId) {
      return c.json(
        { error: { code: "MISSING_PARAM", message: "Session ID is required" } },
        400
      );
    }
    const { observationIds, groupName, deleteAfterExport } =
      c.req.valid("json");

    // 上限チェック
    if (observationIds.length > MAX_EXPORT_OBSERVATIONS) {
      return c.json(
        {
          error: {
            code: "TOO_MANY_OBSERVATIONS",
            message: `Cannot export more than ${MAX_EXPORT_OBSERVATIONS} observations at once`,
          },
        },
        400
      );
    }

    // ソースセッション存在確認
    const sourceSession = getSessionById(sourceSessionId);
    if (!sourceSession) {
      return c.json(
        { error: { code: "SESSION_NOT_FOUND", message: "Session not found" } },
        404
      );
    }

    // 観測記録を取得（ソースセッションに属するもののみ）
    const selectedObservations = observationIds
      .map((id) => getObservationById(id))
      .filter(
        (obs): obs is NonNullable<typeof obs> =>
          obs !== null && obs.sessionId === sourceSessionId
      );

    if (selectedObservations.length === 0) {
      return c.json(
        {
          error: {
            code: "NO_MATCHING_OBSERVATIONS",
            message: "No matching observations found for the specified IDs",
          },
        },
        400
      );
    }

    // 新しいセッションを作成
    const newSession = createSession({
      name: groupName,
      workingDir: sourceSession.workingDir,
      projectId: sourceSession.projectId ?? undefined,
    });

    // 観測記録をメッセージ形式に変換して要約生成
    const messages: Message[] = selectedObservations.map((obs) => ({
      messageId: obs.observationId,
      sessionId: newSession.sessionId,
      type:
        obs.type === "tool_use"
          ? ("tool_use" as const)
          : ("assistant" as const),
      content: `[${obs.type}] ${obs.title}\n\n${obs.content}`,
      compressed: false,
      timestamp: obs.createdAt,
    }));

    let deletedCount = 0;

    try {
      // 要約を生成
      const summary = await generateSummary(newSession.sessionId, messages);

      // 要約を summaries テーブルに保存
      createSummary({
        sessionId: newSession.sessionId,
        shortSummary: summary.shortSummary,
        detailedSummary: summary.detailedSummary,
        keyDecisions: summary.keyDecisions,
        filesModified: summary.filesModified,
        toolsUsed: summary.toolsUsed,
        topics: summary.topics,
        originalTokenCount: summary.originalTokenCount,
        summaryTokenCount: summary.summaryTokenCount,
        compressionRatio: summary.compressionRatio,
      });

      // 要約を observation として新セッションに保存
      const summaryContent = [
        `## 短い要約\n${summary.shortSummary}`,
        `\n## 詳細な要約\n${summary.detailedSummary}`,
        summary.keyDecisions.length > 0
          ? `\n## 重要な決定事項\n${summary.keyDecisions.map((d) => `- ${d}`).join("\n")}`
          : "",
        summary.filesModified.length > 0
          ? `\n## 変更ファイル\n${summary.filesModified.map((f) => `- ${f}`).join("\n")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      createObservation({
        sessionId: newSession.sessionId,
        type: "note",
        title: `Smart Export Summary (${summary.originalTokenCount} → ${summary.summaryTokenCount} tokens)`,
        content: summaryContent,
        metadata: {
          originalTokenCount: summary.originalTokenCount,
          summaryTokenCount: summary.summaryTokenCount,
          compressionRatio: summary.compressionRatio,
          toolsUsed: summary.toolsUsed,
          topics: summary.topics,
          sourceSessionId,
        },
      });

      // Export したセッションは completed に設定
      updateSession(newSession.sessionId, { status: "completed" });
      newSession.status = "completed";

      // 元のセッションから observations を削除（コンテキスト削減）
      if (deleteAfterExport) {
        for (const obs of selectedObservations) {
          const deleted = deleteObservation(obs.observationId);
          if (deleted) deletedCount++;
        }
        log.info("Smart Export: Deleted observations from source session", {
          sourceSessionId,
          deletedCount,
          newSessionId: newSession.sessionId,
        });
      }

      return c.json(
        {
          session: newSession,
          summary: {
            shortSummary: summary.shortSummary,
            detailedSummary: summary.detailedSummary,
            keyDecisions: summary.keyDecisions,
          },
          observationCount: selectedObservations.length,
          deletedCount,
          deleteAfterExport,
        },
        201
      );
    } catch (error) {
      // 要約生成に失敗してもセッションは作成済み
      log.warn("Summary generation failed in smart-export", {
        sessionId: newSession.sessionId,
        error: error instanceof Error ? error.message : String(error),
      });

      // 削除は実行（要約失敗でもコンテキスト削減は優先）
      if (deleteAfterExport) {
        for (const obs of selectedObservations) {
          const deleted = deleteObservation(obs.observationId);
          if (deleted) deletedCount++;
        }
      }

      return c.json(
        {
          session: newSession,
          summary: null,
          observationCount: selectedObservations.length,
          deletedCount,
          deleteAfterExport,
          warning: "Summary generation failed",
        },
        201
      );
    }
  }
);

export { observationsRouter };
