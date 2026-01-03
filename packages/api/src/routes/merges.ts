/**
 * Merges API ルート
 *
 * マージのCRUD操作を提供。
 *
 * エンドポイント:
 * - POST   /merges              - マージ作成
 * - POST   /merges/with-summary - マージ作成 + 要約生成（同期）
 * - GET    /merges              - マージ一覧
 * - GET    /merges/:id          - マージ詳細
 * - DELETE /merges/:id          - マージ削除
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateMergeSchema, ListMergesSchema } from "../schemas";
import {
  createMerge,
  getMergeById,
  listMerges,
  deleteMerge,
  updateMergeStatus,
} from "../repositories/merge";
import { generateMergeSummary } from "../services/merge-summarizer";

const mergesRouter = new Hono();

/**
 * POST /merges - マージ作成
 */
mergesRouter.post(
  "/",
  zValidator("json", CreateMergeSchema, (result, c) => {
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

    const merge = createMerge({
      sourceSessionIds: data.sourceSessionIds,
      projectId: data.projectId,
    });

    return c.json(merge, 201);
  }
);

/**
 * POST /merges/with-summary - マージ作成 + 要約生成（同期）
 *
 * セッションを統合し、AIで要約を生成して返す。
 * ノードエディタからの接続時に使用。
 */
mergesRouter.post(
  "/with-summary",
  zValidator("json", CreateMergeSchema, (result, c) => {
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

    // マージレコード作成
    const merge = createMerge({
      sourceSessionIds: data.sourceSessionIds,
      projectId: data.projectId,
    });

    try {
      // AI で統合要約を生成
      const summaryResult = await generateMergeSummary(data.sourceSessionIds);

      // マージレコードを更新
      const updated = updateMergeStatus(merge.mergeId, "completed", {
        resultSummary: summaryResult.shortSummary,
        resultDetailedSummary: summaryResult.detailedSummary,
      });

      return c.json({
        ...updated,
        summary: {
          shortSummary: summaryResult.shortSummary,
          detailedSummary: summaryResult.detailedSummary,
          keyDecisions: summaryResult.keyDecisions,
          topics: summaryResult.topics,
          sessionCount: summaryResult.sessionCount,
          totalOriginalTokens: summaryResult.totalOriginalTokens,
          mergedTokens: summaryResult.mergedTokens,
          compressionRatio: summaryResult.compressionRatio,
        },
      });
    } catch (error) {
      // エラー時はマージステータスを更新
      updateMergeStatus(merge.mergeId, "error");
      console.error("[Merge] Summary generation failed:", error);
      return c.json(
        {
          error: "Summary generation failed",
          mergeId: merge.mergeId,
          message: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }
);

/**
 * GET /merges - マージ一覧
 */
mergesRouter.get(
  "/",
  zValidator("query", ListMergesSchema, (result, c) => {
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
    const query = c.req.valid("query");

    const result = listMerges({
      page: query.page,
      limit: query.limit,
      status: query.status,
      projectId: query.projectId,
    });

    return c.json(result);
  }
);

/**
 * GET /merges/:id - マージ詳細
 */
mergesRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const merge = getMergeById(id);

  if (!merge) {
    return c.json({ error: "Merge not found", mergeId: id }, 404);
  }

  return c.json(merge);
});

/**
 * DELETE /merges/:id - マージ削除
 */
mergesRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = deleteMerge(id);

  if (!deleted) {
    return c.json({ error: "Merge not found", mergeId: id }, 404);
  }

  // 204 No Content
  return c.body(null, 204);
});

export { mergesRouter };
