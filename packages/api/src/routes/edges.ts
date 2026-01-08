/**
 * Edges API ルート
 *
 * セッション間のエッジ（接続）操作を提供。
 * UIでのノード接続をバックエンドで永続化し、コンテキスト注入に使用。
 *
 * エンドポイント:
 * - POST   /edges                    - エッジ作成
 * - DELETE /edges/:id                - エッジ削除
 * - GET    /edges/by-target/:id      - ターゲットに接続されたエッジ一覧
 * - GET    /edges/by-source/:id      - ソースからのエッジ一覧
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateEdgeSchema } from "../schemas";
import {
  createEdge,
  deleteEdge,
  findEdgesByTarget,
  findEdgesBySource,
  edgeExists,
  getEdgeById,
} from "../repositories/edge";

const edgesRouter = new Hono();

/**
 * POST /edges - エッジ作成
 *
 * UIでセッションノードをコンテキストノードに接続した時に呼ばれる
 */
edgesRouter.post(
  "/",
  zValidator("json", CreateEdgeSchema, (result, c) => {
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

    // 同じエッジが既に存在するかチェック
    if (edgeExists(data.sourceSessionId, data.targetClaudeSessionId)) {
      return c.json(
        {
          error: "Edge already exists",
          sourceSessionId: data.sourceSessionId,
          targetClaudeSessionId: data.targetClaudeSessionId,
        },
        409
      );
    }

    const edge = createEdge({
      sourceSessionId: data.sourceSessionId,
      targetClaudeSessionId: data.targetClaudeSessionId,
    });

    return c.json(edge, 201);
  }
);

/**
 * GET /edges/:id - エッジ詳細
 */
edgesRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const edge = getEdgeById(id);

  if (!edge) {
    return c.json({ error: "Edge not found", edgeId: id }, 404);
  }

  return c.json(edge);
});

/**
 * DELETE /edges/:id - エッジ削除
 *
 * UIでセッションノードとコンテキストノードの接続を解除した時に呼ばれる
 */
edgesRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = deleteEdge(id);

  if (!deleted) {
    return c.json({ error: "Edge not found", edgeId: id }, 404);
  }

  // 204 No Content
  return c.body(null, 204);
});

/**
 * GET /edges/by-target/:claudeSessionId - ターゲットに接続されたエッジ一覧
 *
 * 特定のClaude Codeセッションに接続されている全てのソースセッションを取得
 * Hook/MCPツールからのコンテキスト注入時に使用
 */
edgesRouter.get("/by-target/:claudeSessionId", async (c) => {
  const claudeSessionId = c.req.param("claudeSessionId");
  const edges = findEdgesByTarget(claudeSessionId);

  return c.json({
    targetClaudeSessionId: claudeSessionId,
    edges,
    sourceSessionIds: edges.map((e) => e.sourceSessionId),
  });
});

/**
 * GET /edges/by-source/:sessionId - ソースからのエッジ一覧
 *
 * 特定のセッションがどのClaude Codeセッションに接続されているかを取得
 */
edgesRouter.get("/by-source/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const edges = findEdgesBySource(sessionId);

  return c.json({
    sourceSessionId: sessionId,
    edges,
    targetClaudeSessionIds: edges.map((e) => e.targetClaudeSessionId),
  });
});

export { edgesRouter };
