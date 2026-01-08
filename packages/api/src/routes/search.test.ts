/**
 * セマンティック検索 API のテスト
 *
 * ローカルモデル (Transformers.js) が使えるため、セマンティック検索は常に利用可能
 */

import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { createApp } from "../app";
import { runMigrations, resetDatabase, closeDatabase } from "../db";

describe("Search API", () => {
  const app = createApp();

  beforeAll(() => {
    // 環境変数をクリア（ローカルモデルを使用）
    delete process.env.VOYAGE_API_KEY;
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

    test("ローカルモデルで available: true", async () => {
      const res = await app.request("/api/search/status");
      const data = (await res.json()) as {
        available: boolean;
        message: string;
      };

      expect(data.available).toBe(true);
      expect(data.message).toContain("ready");
    });
  });

  describe("POST /api/search", () => {
    test("ローカルモデルで検索が実行できる", async () => {
      const res = await app.request("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "テスト検索" }),
      });

      // ローカルモデルで検索可能（結果は空でも200）
      expect(res.status).toBe(200);
      const data = (await res.json()) as { results: unknown[] };
      expect(data.results).toBeDefined();
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
    test("ローカルモデルでコンテキスト検索が実行できる", async () => {
      const res = await app.request("/api/search/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "認証機能を実装したい" }),
      });

      // ローカルモデルで検索可能（結果は空でも200）
      expect(res.status).toBe(200);
      const data = (await res.json()) as {
        contextText: string;
        sessionsUsed: number;
      };
      expect(data).toHaveProperty("contextText");
      expect(data).toHaveProperty("sessionsUsed");
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
