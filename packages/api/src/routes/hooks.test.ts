// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Hook API テスト
 *
 * Claude Code プラグインからの Hook イベント処理をテスト。
 * セキュリティ、バリデーション、グレースフルデグラデーションを検証。
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSession } from "../repositories/session";

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

describe("Hook API", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    // 各テスト前にデータをクリア
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  // ==================== セキュリティテスト ====================
  describe("セキュリティ", () => {
    it("非localhostからのリクエストを拒否する", async () => {
      const res = await request(
        "POST",
        "/hook/session-start",
        { sessionId: "test-session-1" },
        { host: "example.com" }
      );

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toBe("Forbidden");
    });

    it("プロキシ経由のリクエストを拒否する", async () => {
      const res = await request(
        "POST",
        "/hook/session-start",
        { sessionId: "test-session-1" },
        { "x-forwarded-for": "192.168.1.1" }
      );

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toBe("Forbidden");
    });

    it("エラーレスポンスにsessionIdを含めない", async () => {
      const res = await request("POST", "/hook/session-end", {
        sessionId: "non-existent-session",
      });

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Session not found");
      expect(json.sessionId).toBeUndefined();
    });
  });

  // ==================== POST /hook/session-start ====================
  describe("POST /hook/session-start", () => {
    it("新規セッションを作成できる", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: "test-session-new",
        workingDirectory: "/home/user/project",
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.action).toBe("created");
      expect(json.id).toBeDefined();
    });

    it("既存セッションを再開できる", async () => {
      // 事前にセッションを作成
      const session = createSession({
        name: "Existing Session",
        workingDir: "/tmp/existing",
      });

      const res = await request("POST", "/hook/session-start", {
        sessionId: session.sessionId,
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.action).toBe("resumed");
    });

    it("無効なsessionIdを拒否する", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: "", // 空文字
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("不正な形式のsessionIdを拒否する", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: "invalid@session#id!", // 特殊文字
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("長すぎるsessionIdを拒否する", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: "a".repeat(300), // 256文字超
      });

      expect(res.status).toBe(400);
    });
  });

  // ==================== POST /hook/session-end ====================
  describe("POST /hook/session-end", () => {
    it("セッションを正常終了できる", async () => {
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      const res = await request("POST", "/hook/session-end", {
        sessionId: session.sessionId,
        status: "completed",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("completed");
    });

    it("セッションをエラー終了できる", async () => {
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      const res = await request("POST", "/hook/session-end", {
        sessionId: session.sessionId,
        status: "error",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("error");
    });

    it("存在しないセッションで404を返す", async () => {
      const res = await request("POST", "/hook/session-end", {
        sessionId: "non-existent",
      });

      expect(res.status).toBe(404);
    });
  });

  // ==================== バリデーションテスト ====================
  describe("バリデーション", () => {
    it("必須フィールドが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/hook/session-start", {});

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
      expect(json.details).toBeDefined();
    });

    it("メタデータの型が不正な場合エラーを返す", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: "test-session",
        metadata: { key: 123 }, // 値は文字列でなければならない
      });

      expect(res.status).toBe(400);
    });
  });
});
