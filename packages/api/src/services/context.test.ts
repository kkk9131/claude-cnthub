/**
 * コンテキスト注入サービスのテスト
 */

import {
  describe,
  test,
  expect,
  vi,
  beforeEach,
  afterAll,
  type Mock,
} from "vitest";
import {
  findRelatedSessions,
  buildRelatedContext,
  isContextInjectionAvailable,
} from "./context";

// 依存サービスをモック
vi.mock("./embeddings", () => ({
  generateQueryEmbedding: vi.fn(),
  isEmbeddingAvailable: vi.fn(),
}));

vi.mock("../repositories/embedding", () => ({
  searchSimilarSessions: vi.fn(),
}));

vi.mock("../repositories/summary", () => ({
  getSummariesBySessionIds: vi.fn(),
}));

import { isEmbeddingAvailable, generateQueryEmbedding } from "./embeddings";
import { searchSimilarSessions } from "../repositories/embedding";
import { getSummariesBySessionIds } from "../repositories/summary";

// 型アサーション用のヘルパー
const mockIsEmbeddingAvailable = isEmbeddingAvailable as Mock;
const mockGenerateQueryEmbedding = generateQueryEmbedding as Mock;
const mockSearchSimilarSessions = searchSimilarSessions as Mock;
const mockGetSummariesBySessionIds = getSummariesBySessionIds as Mock;

describe("Context Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("isContextInjectionAvailable", () => {
    test("Embedding が利用可能な場合は true を返す", () => {
      mockIsEmbeddingAvailable.mockReturnValue(true);
      expect(isContextInjectionAvailable()).toBe(true);
    });

    test("Embedding が利用不可の場合は false を返す", () => {
      mockIsEmbeddingAvailable.mockReturnValue(false);
      expect(isContextInjectionAvailable()).toBe(false);
    });
  });

  describe("findRelatedSessions", () => {
    test("Embedding が利用不可の場合は空配列を返す", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(false);

      const result = await findRelatedSessions("test query");

      expect(result).toEqual([]);
      expect(generateQueryEmbedding).not.toHaveBeenCalled();
    });

    test("Embedding 生成失敗時は空配列を返す", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(true);
      mockGenerateQueryEmbedding.mockResolvedValue(null);

      const result = await findRelatedSessions("test query");

      expect(result).toEqual([]);
    });

    test("検索結果を関連度でフィルタリングする", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(true);
      mockGenerateQueryEmbedding.mockResolvedValue({
        embedding: new Array(1024).fill(0),
        totalTokens: 10,
      });
      mockSearchSimilarSessions.mockReturnValue([
        {
          sessionId: "s1",
          sessionName: "Session 1",
          shortSummary: "Summary 1",
          distance: 0.2,
        },
        {
          sessionId: "s2",
          sessionName: "Session 2",
          shortSummary: "Summary 2",
          distance: 1.5,
        }, // 低関連度
        {
          sessionId: "s3",
          sessionName: "Session 3",
          shortSummary: "Summary 3",
          distance: 0.4,
        },
      ]);
      mockGetSummariesBySessionIds.mockReturnValue(new Map());

      const result = await findRelatedSessions("test query", {
        minRelevanceScore: 0.3,
      });

      // distance 1.5 は relevanceScore = 0.25 なのでフィルタされる
      expect(result.length).toBeLessThanOrEqual(2);
      expect(result.every((r) => r.relevanceScore >= 0.3)).toBe(true);
    });

    test("maxSessions の制限が適用される", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(true);
      mockGenerateQueryEmbedding.mockResolvedValue({
        embedding: new Array(1024).fill(0),
        totalTokens: 10,
      });
      mockSearchSimilarSessions.mockReturnValue([
        {
          sessionId: "s1",
          sessionName: "Session 1",
          shortSummary: "Summary 1",
          distance: 0.1,
        },
        {
          sessionId: "s2",
          sessionName: "Session 2",
          shortSummary: "Summary 2",
          distance: 0.2,
        },
        {
          sessionId: "s3",
          sessionName: "Session 3",
          shortSummary: "Summary 3",
          distance: 0.3,
        },
      ]);
      mockGetSummariesBySessionIds.mockReturnValue(new Map());

      const result = await findRelatedSessions("test query", {
        maxSessions: 2,
        minRelevanceScore: 0,
      });

      expect(result.length).toBe(2);
    });
  });

  describe("buildRelatedContext", () => {
    test("関連セッションがない場合は空のコンテキストを返す", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(false);

      const result = await buildRelatedContext("test query");

      expect(result.sessions).toEqual([]);
      expect(result.contextText).toBe("");
      expect(result.estimatedTokens).toBe(0);
      expect(result.query).toBe("test query");
    });

    test("コンテキスト文字列が正しく構築される", async () => {
      mockIsEmbeddingAvailable.mockReturnValue(true);
      mockGenerateQueryEmbedding.mockResolvedValue({
        embedding: new Array(1024).fill(0),
        totalTokens: 10,
      });
      mockSearchSimilarSessions.mockReturnValue([
        {
          sessionId: "s1",
          sessionName: "認証実装",
          shortSummary: "JWT認証を実装",
          distance: 0.1,
        },
      ]);
      const summaryMap = new Map();
      summaryMap.set("s1", {
        summaryId: "sum1",
        sessionId: "s1",
        shortSummary: "JWT認証を実装",
        detailedSummary: "JWT認証の詳細な実装",
        keyDecisions: ["JWTを採用"],
        filesModified: ["auth.ts"],
        toolsUsed: ["Write"],
        topics: ["認証"],
        originalTokenCount: 100,
        summaryTokenCount: 50,
        compressionRatio: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockGetSummariesBySessionIds.mockReturnValue(summaryMap);

      const result = await buildRelatedContext("認証機能", {
        minRelevanceScore: 0,
      });

      expect(result.sessions.length).toBe(1);
      expect(result.contextText).toContain("認証実装");
      expect(result.contextText).toContain("JWT認証の詳細な実装");
      expect(result.contextText).toContain("JWTを採用");
      expect(result.contextText).toContain("auth.ts");
      expect(result.estimatedTokens).toBeGreaterThan(0);
    });
  });
});
