/**
 * Memories API ルート
 *
 * シンプルなメモリ管理API（supermemory 参考）
 *
 * エンドポイント:
 * - POST /memories/add - メモリ追加
 * - GET /memories/search - セマンティック検索
 * - GET /memories/context - コンテキスト取得（注入用）
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getSession, listSessions } from "../repositories/session";
import {
  createObservation,
  searchObservations,
  type ObservationType,
} from "../repositories/observation";
import { searchSimilar, saveEmbedding } from "../repositories/embedding";
import {
  generateEmbedding,
  isEmbeddingAvailable,
  type EmbeddingResult,
} from "../services/embeddings";

const memoriesRouter = new Hono();

// ==================== ヘルパー関数 ====================

/** Embedding 生成タイムアウト (ms) */
const EMBEDDING_TIMEOUT = 3000;

/**
 * タイムアウト付きでEmbeddingを生成
 * タイムアウト時は null を返し、フォールバック検索に移行
 */
async function generateEmbeddingWithTimeout(
  text: string,
  timeoutMs: number = EMBEDDING_TIMEOUT
): Promise<EmbeddingResult | null> {
  const embeddingPromise = generateEmbedding(text);
  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => {
      console.warn(
        `[Memories] Embedding generation timed out after ${timeoutMs}ms`
      );
      resolve(null);
    }, timeoutMs)
  );

  return Promise.race([embeddingPromise, timeoutPromise]);
}

// ==================== スキーマ定義 ====================

const MemoryAddSchema = z.object({
  sessionId: z.string().min(1),
  type: z.enum([
    "tool_use",
    "decision",
    "error",
    "learning",
    "note",
    "file_change",
  ]),
  title: z.string().min(1),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

const MemorySearchSchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  projectId: z.string().optional(),
  type: z
    .enum(["tool_use", "decision", "error", "learning", "note", "file_change"])
    .optional(),
});

const MemoryContextSchema = z.object({
  projectPath: z.string().min(1),
  query: z.string().optional(),
  level: z.coerce.number().min(0).max(1).default(0),
});

// ==================== エンドポイント ====================

/**
 * POST /memories/add
 *
 * メモリ（観測記録）を追加
 */
memoriesRouter.post(
  "/add",
  zValidator("json", MemoryAddSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request body",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const data = c.req.valid("json");

    // セッションの存在確認
    const session = getSession(data.sessionId);
    if (!session) {
      return c.json(
        {
          error: {
            code: "SESSION_NOT_FOUND",
            message: `Session with id '${data.sessionId}' not found`,
          },
        },
        404
      );
    }

    // 観測記録を作成
    const observation = createObservation({
      sessionId: data.sessionId,
      type: data.type as ObservationType,
      title: data.title,
      content: data.content,
      metadata: data.metadata,
    });

    // Embedding を生成して保存（セマンティック検索用）
    if (isEmbeddingAvailable()) {
      const embeddingText = [data.title, data.content].join("\n");

      try {
        const embeddingResult = await generateEmbedding(embeddingText);
        if (embeddingResult) {
          saveEmbedding(
            "observation",
            observation.observationId,
            embeddingResult.embedding,
            data.sessionId,
            data.title.slice(0, 200)
          );
        }
      } catch (error) {
        // Embedding生成失敗でも観測記録は保存済み
        console.error("[Memories] Embedding generation failed:", error);
      }
    }

    return c.json(
      {
        id: observation.observationId,
        sessionId: observation.sessionId,
        type: observation.type,
        title: observation.title,
        createdAt: observation.createdAt.toISOString(),
      },
      201
    );
  }
);

/**
 * GET /memories/search
 *
 * セマンティック検索
 */
memoriesRouter.get(
  "/search",
  zValidator("query", MemorySearchSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const { q: queryParam, limit, type } = c.req.valid("query");

    // セマンティック検索（Embeddingが利用可能な場合）
    let results: Array<{
      id: string;
      sessionId: string;
      type: string;
      title: string;
      content: string;
      relevanceScore: number;
      createdAt: string;
    }> = [];

    if (isEmbeddingAvailable()) {
      try {
        const embeddingResult = await generateEmbeddingWithTimeout(queryParam);
        if (embeddingResult) {
          const searchResults = searchSimilar(
            embeddingResult.embedding,
            limit,
            ["observation"]
          );

          results = searchResults.map((r) => ({
            id: r.sourceId,
            sessionId: r.sessionId || "",
            type: "observation",
            title: r.contentPreview || "",
            content: r.contentPreview || "",
            relevanceScore: 1 - r.distance, // distanceを類似度に変換
            createdAt: r.createdAt?.toISOString() || "",
          }));
        }
      } catch (error) {
        console.error("[Memories] Semantic search failed:", error);
      }
    }

    // フォールバック: 全文検索
    if (results.length === 0) {
      const observations = searchObservations(queryParam, { limit, type });
      results = observations.map((obs) => ({
        id: obs.observationId,
        sessionId: obs.sessionId,
        type: obs.type,
        title: obs.title,
        content: obs.content,
        relevanceScore: 1.0, // 全文検索では固定スコア
        createdAt: obs.createdAt.toISOString(),
      }));
    }

    // typeフィルタリング（セマンティック検索結果に対して）
    if (type && results.length > 0) {
      results = results.filter((r) => r.type === type);
    }

    return c.json({
      results,
      totalCount: results.length,
      query: queryParam,
    });
  }
);

/**
 * GET /memories/context
 *
 * コンテキスト取得（SessionStart Hook で使用）
 */
memoriesRouter.get(
  "/context",
  zValidator("query", MemoryContextSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const { projectPath, query: queryParam, level } = c.req.valid("query");

    // 最近のセッションを取得（プロジェクトパスでフィルタ可能な場合）
    const { items: recentSessions } = listSessions({ limit: 10 });

    // 関連メモリを取得（queryがある場合）
    let relevantMemories: Array<{
      id: string;
      type: string;
      title: string;
      summary?: string;
    }> = [];

    if (queryParam && isEmbeddingAvailable()) {
      try {
        const embeddingResult = await generateEmbeddingWithTimeout(queryParam);
        if (embeddingResult) {
          const searchResults = searchSimilar(embeddingResult.embedding, 5, [
            "observation",
          ]);

          relevantMemories = searchResults.map((r) => ({
            id: r.sourceId,
            type: "observation",
            title: r.contentPreview || "",
            summary: r.contentPreview?.slice(0, 100),
          }));
        }
      } catch (error) {
        console.error("[Memories] Context search failed:", error);
      }
    }

    // レスポンス構築
    const response: {
      project?: { path: string };
      recentSessions: Array<{
        id: string;
        name: string;
        status: string;
        tags?: string[];
      }>;
      relevantMemories: typeof relevantMemories;
      dynamicFacts?: Record<string, unknown>;
    } = {
      recentSessions: recentSessions.map((s) => ({
        id: s.sessionId,
        name: s.name,
        status: s.status,
        tags: [],
      })),
      relevantMemories,
    };

    // level 1 の場合は追加情報を含める
    if (level >= 1) {
      response.project = { path: projectPath };
      response.dynamicFacts = {
        lastUpdated: new Date().toISOString(),
      };
    }

    return c.json(response);
  }
);

export { memoriesRouter };
