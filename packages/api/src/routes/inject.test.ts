// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Pending Inject API テスト
 *
 * コンテキスト注入の残り部分を一時保存するAPI。
 * TDD: テストを先に作成し、実装を後から行う。
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations } from "../db";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

// アプリインスタンスを共有
let app: ReturnType<typeof createApp>;

// テスト用のHTTPリクエストヘルパー
async function request(
  method: string,
  path: string,
  body?: unknown,
  headers?: Record<string, string>
): Promise<Response & { json: () => Promise<any> }> {
  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      host: "localhost:3048", // localhost として認識させる
      ...headers,
    },
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  return app.request(path, init);
}

describe("Pending Inject API", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  // ==================== セキュリティテスト ====================
  describe("セキュリティ", () => {
    it("非localhostからのリクエストを拒否する", async () => {
      const res = await request(
        "POST",
        "/api/inject/pending",
        { sessionId: "test-session", context: "test context" },
        { host: "example.com" }
      );

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toBe("Forbidden");
    });

    it("プロキシ経由のリクエストを拒否する", async () => {
      const res = await request(
        "POST",
        "/api/inject/pending",
        { sessionId: "test-session", context: "test context" },
        { "x-forwarded-for": "192.168.1.1" }
      );

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toBe("Forbidden");
    });
  });

  // ==================== POST /api/inject/pending ====================
  describe("POST /api/inject/pending", () => {
    it("pending inject を作成できる", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "test-session-001",
        context: "This is the remaining context to inject later.",
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.sessionId).toBe("test-session-001");
      expect(json.createdAt).toBeDefined();
      expect(json.expiresAt).toBeDefined();
    });

    it("同じsessionIdで上書きできる", async () => {
      // 1回目
      await request("POST", "/api/inject/pending", {
        sessionId: "test-session-overwrite",
        context: "First context",
      });

      // 2回目（上書き）
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "test-session-overwrite",
        context: "Updated context",
      });

      expect(res.status).toBe(201);

      // 確認
      const getRes = await request(
        "GET",
        "/api/inject/pending/test-session-overwrite"
      );
      const json = await getRes.json();
      expect(json.context).toBe("Updated context");
    });

    it("空のsessionIdを拒否する", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "",
        context: "test context",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("空のcontextを拒否する", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "test-session",
        context: "",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("不正な形式のsessionIdを拒否する", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "invalid@session#id!",
        context: "test context",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("長すぎるcontextを拒否する", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "test-session",
        context: "x".repeat(100001), // 100KB超
      });

      expect(res.status).toBe(400);
    });
  });

  // ==================== GET /api/inject/pending/:sessionId ====================
  describe("GET /api/inject/pending/:sessionId", () => {
    beforeEach(async () => {
      // テストデータを作成
      await request("POST", "/api/inject/pending", {
        sessionId: "get-test-session",
        context: "Context for get test",
      });
    });

    it("pending inject を取得できる", async () => {
      const res = await request("GET", "/api/inject/pending/get-test-session");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.sessionId).toBe("get-test-session");
      expect(json.context).toBe("Context for get test");
      expect(json.createdAt).toBeDefined();
      expect(json.expiresAt).toBeDefined();
    });

    it("存在しないsessionIdで404を返す", async () => {
      const res = await request(
        "GET",
        "/api/inject/pending/non-existent-session"
      );

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Pending inject not found");
    });

    it("期限切れのpending injectは取得できない", async () => {
      // 直接ストアを操作して期限切れエントリを作成
      const { pendingInjectStore } = await import("./inject");
      const now = new Date();
      const expiredEntry = {
        sessionId: "expired-session-direct",
        context: "This is expired",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2時間前
        expiresAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1時間前（期限切れ）
      };
      pendingInjectStore.set("expired-session-direct", expiredEntry);

      const res = await request(
        "GET",
        "/api/inject/pending/expired-session-direct"
      );

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Pending inject not found");

      // エントリが削除されていることを確認
      expect(pendingInjectStore.has("expired-session-direct")).toBe(false);
    });
  });

  // ==================== DELETE /api/inject/pending/:sessionId ====================
  describe("DELETE /api/inject/pending/:sessionId", () => {
    beforeEach(async () => {
      // テストデータを作成
      await request("POST", "/api/inject/pending", {
        sessionId: "delete-test-session",
        context: "Context for delete test",
      });
    });

    it("pending inject を削除できる", async () => {
      const res = await request(
        "DELETE",
        "/api/inject/pending/delete-test-session"
      );

      expect(res.status).toBe(204);

      // 削除確認
      const getRes = await request(
        "GET",
        "/api/inject/pending/delete-test-session"
      );
      expect(getRes.status).toBe(404);
    });

    it("存在しないsessionIdで404を返す", async () => {
      const res = await request(
        "DELETE",
        "/api/inject/pending/non-existent-session"
      );

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Pending inject not found");
    });
  });

  // ==================== 自動削除テスト ====================
  describe("自動削除", () => {
    it("期限切れエントリはGET時に自動削除される（lazy deletion）", async () => {
      // 直接ストアを操作して期限切れエントリを作成
      const { pendingInjectStore } = await import("./inject");
      const now = new Date();
      const expiredEntry = {
        sessionId: "lazy-delete-session",
        context: "This will be lazily deleted",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2時間前
        expiresAt: new Date(now.getTime() - 1000), // 1秒前（期限切れ）
      };
      pendingInjectStore.set("lazy-delete-session", expiredEntry);

      // GET リクエストで期限切れを確認（lazy deletion がトリガーされる）
      const res = await request(
        "GET",
        "/api/inject/pending/lazy-delete-session"
      );
      expect(res.status).toBe(404);

      // エントリが削除されていることを確認
      expect(pendingInjectStore.has("lazy-delete-session")).toBe(false);
    });

    it("cleanupExpiredEntries で期限切れエントリが一括削除される", async () => {
      const { pendingInjectStore, cleanupExpiredEntries } =
        await import("./inject");
      const now = new Date();

      // 期限切れエントリを追加
      pendingInjectStore.set("cleanup-test-1", {
        sessionId: "cleanup-test-1",
        context: "expired 1",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      });
      pendingInjectStore.set("cleanup-test-2", {
        sessionId: "cleanup-test-2",
        context: "expired 2",
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(now.getTime() - 30 * 60 * 1000),
      });

      // 有効なエントリも追加
      pendingInjectStore.set("cleanup-test-valid", {
        sessionId: "cleanup-test-valid",
        context: "still valid",
        createdAt: now,
        expiresAt: new Date(now.getTime() + 60 * 60 * 1000),
      });

      // クリーンアップ実行
      cleanupExpiredEntries();

      // 期限切れエントリが削除されていることを確認
      expect(pendingInjectStore.has("cleanup-test-1")).toBe(false);
      expect(pendingInjectStore.has("cleanup-test-2")).toBe(false);

      // 有効なエントリは残っていることを確認
      expect(pendingInjectStore.has("cleanup-test-valid")).toBe(true);

      // クリーンアップ
      pendingInjectStore.delete("cleanup-test-valid");
    });
  });

  // ==================== バリデーションテスト ====================
  describe("バリデーション", () => {
    it("必須フィールドが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/api/inject/pending", {});

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
      expect(json.details).toBeDefined();
    });

    it("sessionIdのみでcontextが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/api/inject/pending", {
        sessionId: "test-session",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });
  });
});
