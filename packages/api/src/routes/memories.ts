/**
 * Memories API ルート（シンプル化版）
 *
 * RESTful なメモリ管理API
 *
 * 新エンドポイント（/api/memories にマウント）:
 * - POST /api/memories - メモリ追加
 * - GET /api/memories - メモリ一覧取得
 * - GET /api/memories/:id - 個別取得
 * - DELETE /api/memories/:id - 削除
 * - POST /api/memories/search - セマンティック検索
 * - GET /api/memories/context - コンテキスト取得
 *
 * 旧エンドポイント（/memories にマウント、後方互換性のため維持）:
 * - POST /memories/add - メモリ追加
 * - GET /memories/search - セマンティック検索
 * - GET /memories/context - コンテキスト取得
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getSession, listSessions } from "../repositories/session";
import {
  createObservation,
  getObservationById,
  listObservations,
  searchObservations,
  deleteObservation,
  type ObservationType,
} from "../repositories/observation";
import { searchSimilar, saveEmbedding } from "../repositories/embedding";
import {
  generateEmbedding,
  isEmbeddingAvailable,
  type EmbeddingResult,
} from "../services/embeddings";

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

/**
 * Observation を API レスポンス形式に変換
 */
function toMemoryResponse(obs: {
  observationId: string;
  sessionId: string;
  type: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}) {
  return {
    id: obs.observationId,
    sessionId: obs.sessionId,
    type: obs.type,
    title: obs.title,
    content: obs.content,
    metadata: obs.metadata,
    createdAt: obs.createdAt.toISOString(),
  };
}

// ==================== スキーマ定義 ====================

const ObservationTypeSchema = z.enum([
  "tool_use",
  "decision",
  "error",
  "learning",
  "note",
  "file_change",
]);

const MemoryCreateSchema = z.object({
  sessionId: z.string().min(1),
  type: ObservationTypeSchema,
  title: z.string().min(1),
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

const MemoryListSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sessionId: z.string().optional(),
  type: ObservationTypeSchema.optional(),
});

const MemorySearchSchema = z.object({
  query: z.string().min(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  projectId: z.string().optional(),
  type: ObservationTypeSchema.optional(),
});

// 旧APIのGET検索用（後方互換性）
const LegacyMemorySearchSchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  projectId: z.string().optional(),
  type: ObservationTypeSchema.optional(),
});

const MemoryContextSchema = z.object({
  projectPath: z.string().min(1),
  query: z.string().optional(),
  level: z.coerce.number().min(0).max(1).default(0),
});

// ==================== バリデーションエラーハンドラ ====================

function createValidationErrorHandler(message: string) {
  return (
    result: { success: boolean; error?: z.ZodError },
    c: { json: (data: unknown, status: number) => Response }
  ) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message,
            details: result.error?.flatten().fieldErrors,
          },
        },
        400
      );
    }
  };
}

// ==================== 新API（/api/memories にマウント） ====================

const memoriesRouter = new Hono();

/**
 * POST /api/memories
 *
 * メモリ（観測記録）を追加
 */
memoriesRouter.post(
  "/",
  zValidator(
    "json",
    MemoryCreateSchema,
    createValidationErrorHandler("Invalid request body")
  ),
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
 * GET /api/memories
 *
 * メモリ一覧を取得（ページネーション対応）
 */
memoriesRouter.get(
  "/",
  zValidator(
    "query",
    MemoryListSchema,
    createValidationErrorHandler("Invalid query parameters")
  ),
  async (c) => {
    const { page, limit, sessionId, type } = c.req.valid("query");

    const result = listObservations({
      page,
      limit,
      sessionId,
      type: type as ObservationType | undefined,
    });

    return c.json({
      items: result.items.map(toMemoryResponse),
      pagination: result.pagination,
    });
  }
);

/**
 * GET /api/memories/search - 検索エンドポイントとの衝突を避けるため先に定義
 *
 * POST /api/memories/search
 *
 * セマンティック検索
 */
memoriesRouter.post(
  "/search",
  zValidator(
    "json",
    MemorySearchSchema,
    createValidationErrorHandler("Invalid request body")
  ),
  async (c) => {
    const { query: queryParam, limit, type } = c.req.valid("json");

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
 * GET /api/memories/context
 *
 * コンテキスト取得（SessionStart Hook で使用）
 */
memoriesRouter.get(
  "/context",
  zValidator(
    "query",
    MemoryContextSchema,
    createValidationErrorHandler("Invalid query parameters")
  ),
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

/**
 * GET /api/memories/:id
 *
 * メモリを個別取得
 */
memoriesRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const observation = getObservationById(id);
  if (!observation) {
    return c.json(
      {
        error: {
          code: "MEMORY_NOT_FOUND",
          message: `Memory with id '${id}' not found`,
        },
      },
      404
    );
  }

  return c.json(toMemoryResponse(observation));
});

/**
 * DELETE /api/memories/:id
 *
 * メモリを削除
 */
memoriesRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const observation = getObservationById(id);
  if (!observation) {
    return c.json(
      {
        error: {
          code: "MEMORY_NOT_FOUND",
          message: `Memory with id '${id}' not found`,
        },
      },
      404
    );
  }

  deleteObservation(id);

  return new Response(null, { status: 204 });
});

// ==================== 旧API（/memories にマウント、後方互換性） ====================

const legacyMemoriesRouter = new Hono();

/**
 * POST /memories/add
 *
 * 旧エンドポイント（後方互換性のため維持）
 */
legacyMemoriesRouter.post(
  "/add",
  zValidator(
    "json",
    MemoryCreateSchema,
    createValidationErrorHandler("Invalid request body")
  ),
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
 * 旧エンドポイント（後方互換性のため維持）
 */
legacyMemoriesRouter.get(
  "/search",
  zValidator(
    "query",
    LegacyMemorySearchSchema,
    createValidationErrorHandler("Invalid query parameters")
  ),
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
            relevanceScore: 1 - r.distance,
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
        relevanceScore: 1.0,
        createdAt: obs.createdAt.toISOString(),
      }));
    }

    // typeフィルタリング
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
 * 旧エンドポイント（後方互換性のため維持）
 */
legacyMemoriesRouter.get(
  "/context",
  zValidator(
    "query",
    MemoryContextSchema,
    createValidationErrorHandler("Invalid query parameters")
  ),
  async (c) => {
    const { projectPath, query: queryParam, level } = c.req.valid("query");

    const { items: recentSessions } = listSessions({ limit: 10 });

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

    if (level >= 1) {
      response.project = { path: projectPath };
      response.dynamicFacts = {
        lastUpdated: new Date().toISOString(),
      };
    }

    return c.json(response);
  }
);

export { memoriesRouter, legacyMemoriesRouter };
