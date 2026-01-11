/**
 * 最適化 API ルート
 *
 * CLAUDE.md と Skills の段階的開示ルールに従った最適化を提供。
 *
 * エンドポイント:
 * - POST /optimize        - 最適化実行（dryRun対応）
 * - POST /optimize/apply  - 変更適用
 * - POST /optimize/cancel - キャンセル
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { OptimizeChange } from "@claude-cnthub/shared";
import { runOptimization, applyChanges } from "../services/optimizer";

/**
 * 最適化リクエストスキーマ
 */
const OptimizeRequestSchema = z.object({
  projectPath: z.string().min(1),
  globalPath: z.string().optional(),
  targets: z
    .array(z.enum(["claude-md", "skills"]))
    .default(["claude-md", "skills"]),
  dryRun: z.boolean().default(true),
});

/**
 * 変更適用リクエストスキーマ
 */
const ApplyChangesSchema = z.object({
  changes: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["claude-md", "skills"]),
      filePath: z.string(),
      originalContent: z.string(),
      optimizedContent: z.string(),
      extractedFiles: z.array(
        z.object({
          path: z.string(),
          content: z.string(),
          referenceType: z.enum(["rule", "reference", "example"]),
        })
      ),
      lineCountBefore: z.number(),
      lineCountAfter: z.number(),
    })
  ),
  projectPath: z.string().min(1),
});

const optimizeRouter = new Hono();

/**
 * POST /optimize - 最適化実行
 *
 * dryRun: true の場合、変更内容を返すが適用はしない
 * dryRun: false の場合、変更を適用する（現在は未実装）
 */
optimizeRouter.post(
  "/",
  zValidator("json", OptimizeRequestSchema, (result, c) => {
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
    const body = c.req.valid("json");

    try {
      const result = await runOptimization(
        {
          projectPath: body.projectPath,
          globalPath: body.globalPath,
          targets: body.targets,
          dryRun: body.dryRun,
        },
        {
          onProgress: (progress) => {
            // TODO: WebSocket で進捗を配信
            // broadcastToAll({ type: "optimize_progress", progress });
          },
        }
      );

      return c.json(result);
    } catch (error) {
      return c.json(
        {
          error: {
            message: error instanceof Error ? error.message : "Unknown error",
          },
        },
        500
      );
    }
  }
);

/**
 * POST /optimize/apply - 変更適用
 *
 * dryRun で取得した変更を適用する
 */
optimizeRouter.post(
  "/apply",
  zValidator("json", ApplyChangesSchema, (result, c) => {
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
    const body = c.req.valid("json");

    if (body.changes.length === 0) {
      return c.json(
        {
          error: {
            message: "No changes to apply",
          },
        },
        400
      );
    }

    try {
      const result = await applyChanges(
        body.changes as OptimizeChange[],
        body.projectPath
      );

      if (!result.success) {
        return c.json(
          {
            error: {
              message: result.errors.join(", "),
            },
          },
          500
        );
      }

      return c.json({
        success: true,
        appliedCount: body.changes.length,
      });
    } catch (error) {
      return c.json(
        {
          error: {
            message: error instanceof Error ? error.message : "Unknown error",
          },
        },
        500
      );
    }
  }
);

/**
 * POST /optimize/cancel - キャンセル
 *
 * 実行中の最適化をキャンセルする
 */
optimizeRouter.post("/cancel", async (c) => {
  // TODO: 実行中のタスクをキャンセル
  // 現在は単純に成功を返す
  return c.json({
    success: true,
    message: "Optimization cancelled",
  });
});

export { optimizeRouter };
