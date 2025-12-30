/**
 * Merges API ルート
 *
 * マージのCRUD操作を提供。
 *
 * エンドポイント:
 * - POST   /merges     - マージ作成
 * - GET    /merges     - マージ一覧
 * - GET    /merges/:id - マージ詳細
 * - DELETE /merges/:id - マージ削除
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateMergeSchema, ListMergesSchema } from "../schemas";
import {
  createMerge,
  getMergeById,
  listMerges,
  deleteMerge,
} from "../repositories/merge";

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
