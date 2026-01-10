/**
 * セマンティック検索 API
 *
 * ベクトル検索を使用して関連セッションを検索する。
 *
 * エンドポイント:
 * - POST /api/search - セマンティック検索
 * - GET /api/search/status - 検索機能の状態確認
 */

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  generateQueryEmbedding,
  isEmbeddingAvailable,
} from "../services/embeddings";
import {
  searchSimilarSessions,
  countEmbeddings,
} from "../repositories/embedding";
import {
  buildRelatedContext,
  isContextInjectionAvailable,
} from "../services/context";
import { distanceToRelevanceScore } from "../utils/relevance";
import { rateLimit } from "../middleware/rateLimit";

/** 検索API用レート制限（1分あたり20リクエスト） */
const searchRateLimit = rateLimit({
  windowMs: 60000,
  maxRequests: 20,
  message:
    "Search rate limit exceeded. Please wait before making more requests.",
});

/**
 * 検索リクエストスキーマ
 */
const searchRequestSchema = z.object({
  /** 検索クエリ */
  query: z.string().min(1).max(1000),
  /** 取得件数（デフォルト: 10） */
  limit: z.number().int().min(1).max(50).optional().default(10),
});

/**
 * 検索レスポンス
 */
interface SearchResponse {
  results: {
    sessionId: string;
    sessionName: string;
    shortSummary: string;
    relevanceScore: number;
  }[];
  totalResults: number;
  queryTokens: number;
}

/**
 * 検索ステータスレスポンス
 */
interface SearchStatusResponse {
  available: boolean;
  indexedCount: number;
  message: string;
}

// Hono アプリケーション
const app = new Hono();

/**
 * セマンティック検索の共通処理
 */
async function handleSearch(
  queryText: string,
  limit: number
): Promise<
  SearchResponse | { error: string; message: string; status: number }
> {
  // Embedding 機能が利用可能かチェック
  if (!isEmbeddingAvailable()) {
    return {
      error: "Semantic search is not available",
      message: "VOYAGE_API_KEY is not configured",
      status: 503,
    };
  }

  // クエリの Embedding を生成
  const embeddingResult = await generateQueryEmbedding(queryText);
  if (!embeddingResult) {
    return {
      error: "Failed to process query",
      message: "Could not generate embedding for the query",
      status: 500,
    };
  }

  // セマンティック検索を実行
  const searchResults = searchSimilarSessions(embeddingResult.embedding, limit);

  // 距離をスコアに変換
  const results = searchResults.map((result) => ({
    sessionId: result.sessionId,
    sessionName: result.sessionName,
    shortSummary: result.shortSummary,
    relevanceScore: distanceToRelevanceScore(result.distance),
  }));

  return {
    results,
    totalResults: results.length,
    queryTokens: embeddingResult.totalTokens,
  };
}

/**
 * GET /api/search - セマンティック検索（クエリパラメータ）
 *
 * MCPサーバーや簡易アクセス用
 */
app.get("/", searchRateLimit, async (c) => {
  const query = c.req.query("query") || c.req.query("q");
  const limitParam = c.req.query("limit");

  if (!query) {
    return c.json({ error: "Query parameter 'query' or 'q' is required" }, 400);
  }

  const limit = limitParam
    ? Math.min(Math.max(parseInt(limitParam, 10), 1), 50)
    : 10;
  const result = await handleSearch(query, limit);

  if ("status" in result) {
    return c.json(
      { error: result.error, message: result.message },
      result.status as 400 | 500
    );
  }

  return c.json(result);
});

/**
 * POST /api/search - セマンティック検索
 *
 * クエリテキストに関連するセッションを検索
 */
app.post(
  "/",
  searchRateLimit,
  zValidator("json", searchRequestSchema),
  async (c) => {
    const { query: queryText, limit } = c.req.valid("json");
    const result = await handleSearch(queryText, limit);

    if ("status" in result) {
      return c.json(
        { error: result.error, message: result.message },
        result.status as 400 | 500
      );
    }

    return c.json(result);
  }
);

/**
 * GET /api/search/status - 検索機能のステータス
 */
app.get("/status", async (c) => {
  const available = isEmbeddingAvailable();
  const indexedCount = available ? countEmbeddings() : 0;

  const response: SearchStatusResponse = {
    available,
    indexedCount,
    message: available
      ? `Semantic search is ready with ${indexedCount} indexed items`
      : "Semantic search is not available. Set VOYAGE_API_KEY to enable.",
  };

  return c.json(response);
});

/**
 * コンテキスト注入リクエストスキーマ
 */
const contextRequestSchema = z.object({
  /** 検索クエリ（タスク説明など） */
  query: z.string().min(1).max(2000),
  /** 取得するセッション数（デフォルト: 5） */
  maxSessions: z.number().int().min(1).max(10).optional().default(5),
  /** 最大トークン数（デフォルト: 4000） */
  maxTokens: z.number().int().min(100).max(16000).optional().default(4000),
  /** 最小関連度スコア（デフォルト: 0.3） */
  minRelevanceScore: z.number().min(0).max(1).optional().default(0.3),
});

/**
 * POST /api/search/context - 関連コンテキスト取得
 *
 * クエリに関連する過去のセッション情報を
 * 新しいセッションに注入するためのコンテキストとして構築
 */
app.post(
  "/context",
  searchRateLimit,
  zValidator("json", contextRequestSchema),
  async (c) => {
    const {
      query: queryText,
      maxSessions,
      maxTokens,
      minRelevanceScore,
    } = c.req.valid("json");

    // コンテキスト注入が利用可能かチェック
    if (!isContextInjectionAvailable()) {
      return c.json(
        {
          error: "Context injection is not available",
          message: "VOYAGE_API_KEY is not configured",
        },
        503
      );
    }

    // コンテキストを構築
    const context = await buildRelatedContext(queryText, {
      maxSessions,
      maxTokens,
      minRelevanceScore,
    });

    return c.json({
      contextText: context.contextText,
      estimatedTokens: context.estimatedTokens,
      sessionsUsed: context.sessions.length,
      sessions: context.sessions.map((s) => ({
        sessionId: s.sessionId,
        sessionName: s.sessionName,
        relevanceScore: s.relevanceScore,
      })),
    });
  }
);

/**
 * 失敗セッション検索リクエストスキーマ
 */
const issuesSearchSchema = z.object({
  /** 検索クエリ */
  query: z.string().min(1).max(1000),
  /** 取得件数（デフォルト: 3） */
  limit: z.number().int().min(1).max(10).optional().default(3),
  /** 最小関連度スコア（デフォルト: 0.4） */
  minRelevanceScore: z.number().min(0).max(1).optional().default(0.4),
});

/**
 * POST /api/search/issues - 失敗セッション検索
 *
 * has_issues=true のセッションのみを対象にセマンティック検索。
 * ネガティブ学習のための類似失敗セッション検索に使用。
 */
app.post(
  "/issues",
  searchRateLimit,
  zValidator("json", issuesSearchSchema),
  async (c) => {
    const { query: queryText, limit, minRelevanceScore } = c.req.valid("json");

    // Embedding 機能が利用可能かチェック
    if (!isEmbeddingAvailable()) {
      return c.json(
        {
          error: "Semantic search is not available",
          message: "VOYAGE_API_KEY is not configured",
        },
        503
      );
    }

    // クエリの Embedding を生成
    const embeddingResult = await generateQueryEmbedding(queryText);
    if (!embeddingResult) {
      return c.json(
        {
          error: "Failed to process query",
          message: "Could not generate embedding for the query",
        },
        500
      );
    }

    // 失敗セッションのみを検索
    const searchResults = searchSimilarSessions(
      embeddingResult.embedding,
      limit * 2, // フィルタリング用に多めに取得
      { hasIssuesOnly: true }
    );

    // 距離をスコアに変換してフィルタ
    const results = searchResults
      .map((result) => ({
        sessionId: result.sessionId,
        sessionName: result.sessionName,
        shortSummary: result.shortSummary,
        relevanceScore: distanceToRelevanceScore(result.distance),
      }))
      .filter((result) => result.relevanceScore >= minRelevanceScore)
      .slice(0, limit);

    return c.json({
      results,
      totalResults: results.length,
      queryTokens: embeddingResult.totalTokens,
      hasIssuesFilter: true,
    });
  }
);

export default app;
