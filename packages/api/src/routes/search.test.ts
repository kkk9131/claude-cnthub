/**
 * セマンティック検索 API のテスト
 */

import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createApp } from "../app";
import { runMigrations, resetDatabase, closeDatabase } from "../db";

// Voyage API をモック
vi.mock("../services/embeddings", () => ({
  generateQueryEmbedding: vi.fn().mockResolvedValue(null),
  isEmbeddingAvailable: vi.fn().mockReturnValue(false),
}));

describe("Search API", () => {
  const app = createApp();

  beforeAll(() => {
    resetDatabase();
    runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  describe("GET /api/search/status", () => {
    test("検索機能のステータスを返す", async () => {
      const res = await app.request("/api/search/status");

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("available");
      expect(data).toHaveProperty("indexedCount");
      expect(data).toHaveProperty("message");
    });

    test("APIキー未設定時は available: false", async () => {
      const res = await app.request("/api/search/status");
      const data = (await res.json()) as {
        available: boolean;
        message: string;
      };

      expect(data.available).toBe(false);
      expect(data.message).toContain("VOYAGE_API_KEY");
    });
  });

  describe("POST /api/search", () => {
    test("APIキー未設定時は 503 を返す", async () => {
      const res = await app.request("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "テスト検索" }),
      });

      expect(res.status).toBe(503);
      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("Semantic search is not available");
    });

    test("クエリが空の場合は 400 を返す", async () => {
      const res = await app.request("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "" }),
      });

      expect(res.status).toBe(400);
    });

    test("クエリが長すぎる場合は 400 を返す", async () => {
      const longQuery = "a".repeat(1001);
      const res = await app.request("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: longQuery }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/search/context", () => {
    test("APIキー未設定時は 503 を返す", async () => {
      const res = await app.request("/api/search/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "認証機能を実装したい" }),
      });

      expect(res.status).toBe(503);
      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("Context injection is not available");
    });

    test("オプションパラメータのバリデーション", async () => {
      // maxSessions が範囲外
      const res1 = await app.request("/api/search/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "test", maxSessions: 100 }),
      });
      expect(res1.status).toBe(400);

      // maxTokens が範囲外
      const res2 = await app.request("/api/search/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "test", maxTokens: 50 }),
      });
      expect(res2.status).toBe(400);

      // minRelevanceScore が範囲外
      const res3 = await app.request("/api/search/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "test", minRelevanceScore: 2.0 }),
      });
      expect(res3.status).toBe(400);
    });
  });
});
