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
import { getSummaryBySessionId } from "../repositories/summary";
import { getSessionById } from "../repositories/session";
import { addPendingInject } from "./inject";
import { emitEdgeCreated, emitEdgeDeleted } from "../websocket";

const edgesRouter = new Hono();

// ==================== ヘルパー関数 ====================

/**
 * セッションのコンテキストパートを生成
 *
 * @param sessionId - セッションID
 * @returns コンテキスト文字列、または生成できない場合はnull
 */
function buildSessionContextPart(sessionId: string): string | null {
  const session = getSessionById(sessionId);
  if (!session) return null;

  const summary = getSummaryBySessionId(sessionId);
  const sessionName = session.name || sessionId;
  const summaryText =
    summary?.shortSummary || summary?.detailedSummary || "(要約なし)";
  const decisions = summary?.keyDecisions || [];
  const files = summary?.filesModified || [];

  let contextPart = `## ${sessionName} (${sessionId})\n\n${summaryText}\n`;

  if (decisions.length > 0) {
    contextPart += `\n**決定事項:**\n`;
    for (const decision of decisions) {
      contextPart += `- ${decision}\n`;
    }
  }

  if (files.length > 0) {
    contextPart += `\n**変更ファイル:**\n`;
    for (const file of files) {
      contextPart += `- \`${file}\`\n`;
    }
  }

  return contextPart;
}

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

    // ソースセッションの要約をpending_injectに追加
    try {
      const contextPart = buildSessionContextPart(data.sourceSessionId);
      if (contextPart) {
        const context = `# 接続セッションのコンテキスト\n\n${contextPart}`;
        addPendingInject(data.targetClaudeSessionId, context, true);
      }
    } catch (error) {
      console.error("[edges] Failed to add pending inject:", error);
    }

    // WebSocketでEdge作成イベントを全クライアントに通知
    try {
      emitEdgeCreated(edge);
    } catch (error) {
      console.error("[edges] Failed to emit edge_created event:", error);
    }

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
 * 残りの接続セッションをpending_injectに保存し、/clear通知を送信
 */
edgesRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  // 削除前にEdgeの情報を取得
  const edge = getEdgeById(id);
  if (!edge) {
    return c.json({ error: "Edge not found", edgeId: id }, 404);
  }

  const { targetClaudeSessionId } = edge;

  // Edgeを削除
  const deleted = deleteEdge(id);
  if (!deleted) {
    return c.json({ error: "Failed to delete edge", edgeId: id }, 500);
  }

  // 残りの接続セッションのコンテキストを生成してpending_injectに保存
  let remainingContext: string | undefined;
  try {
    const remainingEdges = findEdgesByTarget(targetClaudeSessionId);
    const contextParts = remainingEdges
      .map((e) => buildSessionContextPart(e.sourceSessionId))
      .filter((part): part is string => part !== null);

    if (contextParts.length > 0) {
      remainingContext = `# 接続セッションのコンテキスト（復元用）\n\n**注意**: コンテキストが変更されました。/clear を実行後、このコンテキストが自動的に復元されます。\n\n${contextParts.join("\n---\n\n")}`;
      addPendingInject(targetClaudeSessionId, remainingContext, false);
    }
  } catch (error) {
    console.error("[edges] Failed to save remaining context:", error);
  }

  // WebSocketでedge_deletedイベントを全クライアントに通知
  try {
    emitEdgeDeleted(id, remainingContext);
  } catch (error) {
    console.error("[edges] Failed to emit edge_deleted event:", error);
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
