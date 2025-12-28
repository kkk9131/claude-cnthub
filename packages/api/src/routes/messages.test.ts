// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * メッセージ API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 *
 * メッセージAPIはセッションに紐づくため、
 * /api/sessions/:sessionId/messages の形式。
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import {
  createSessionRequestFixture,
  createMessageFixture,
} from "../test-utils";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

// アプリインスタンスを共有
let app: ReturnType<typeof createApp>;

// テスト用のHTTPリクエストヘルパー
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function request(
  method: string,
  path: string,
  body?: unknown
): Promise<Response & { json: () => Promise<any> }> {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  return app.request(path, init);
}

// セッション作成ヘルパー（メッセージテストの前提条件）
async function createTestSession(): Promise<{ sessionId: string }> {
  const res = await request(
    "POST",
    "/api/sessions",
    createSessionRequestFixture()
  );
  return res.json();
}

describe("Messages API", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    // 各テスト前にデータをクリア（外部キー制約のため順序重要）
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  // ===== POST /api/sessions/:sessionId/messages =====
  describe("POST /api/sessions/:sessionId/messages", () => {
    it("ユーザーメッセージを送信できる", async () => {
      const session = await createTestSession();

      const res = await request(
        "POST",
        `/api/sessions/${session.sessionId}/messages`,
        { content: "Hello, Claude!" }
      );
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.messageId).toBeDefined();
      expect(json.content).toBe("Hello, Claude!");
      expect(json.type).toBe("user");
      expect(json.sessionId).toBe(session.sessionId);
    });

    it("空のcontentは400エラーを返す", async () => {
      const session = await createTestSession();

      const res = await request(
        "POST",
        `/api/sessions/${session.sessionId}/messages`,
        { content: "" }
      );
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBeDefined();
    });

    it("contentがない場合は400エラーを返す", async () => {
      const session = await createTestSession();

      const res = await request(
        "POST",
        `/api/sessions/${session.sessionId}/messages`,
        {}
      );
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBeDefined();
    });

    it("存在しないセッションIDは404を返す", async () => {
      const res = await request(
        "POST",
        "/api/sessions/nonexistent_session/messages",
        { content: "Hello" }
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });
  });

  // ===== GET /api/sessions/:sessionId/messages =====
  describe("GET /api/sessions/:sessionId/messages", () => {
    it("メッセージがない場合は空配列を返す", async () => {
      const session = await createTestSession();

      const res = await request(
        "GET",
        `/api/sessions/${session.sessionId}/messages`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toEqual([]);
      expect(json.pagination).toBeDefined();
      expect(json.pagination.total).toBe(0);
    });

    it("送信したメッセージが一覧に含まれる", async () => {
      const session = await createTestSession();

      // メッセージを送信
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "First message",
      });
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "Second message",
      });

      const res = await request(
        "GET",
        `/api/sessions/${session.sessionId}/messages`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      // タイムスタンプ昇順でソートされる
      expect(json.items[0].content).toBe("First message");
      expect(json.items[1].content).toBe("Second message");
    });

    it("ページネーションが正しく動作する", async () => {
      const session = await createTestSession();

      // 3つのメッセージを送信
      for (let i = 1; i <= 3; i++) {
        await request("POST", `/api/sessions/${session.sessionId}/messages`, {
          content: `Message ${i}`,
        });
      }

      const res = await request(
        "GET",
        `/api/sessions/${session.sessionId}/messages?page=1&limit=2`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.total).toBe(3);
      expect(json.pagination.hasNext).toBe(true);
    });

    it("タイプでフィルタリングできる", async () => {
      const session = await createTestSession();

      // ユーザーメッセージを送信
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "User message",
      });

      // フィルタなしで取得
      const res = await request(
        "GET",
        `/api/sessions/${session.sessionId}/messages?type=user`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].type).toBe("user");
    });

    it("存在しないセッションIDは404を返す", async () => {
      const res = await request(
        "GET",
        "/api/sessions/nonexistent_session/messages"
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });
  });

  // ===== DELETE /api/sessions/:sessionId/messages/:messageId =====
  describe("DELETE /api/sessions/:sessionId/messages/:messageId", () => {
    it("メッセージを削除できる", async () => {
      const session = await createTestSession();

      // メッセージを作成
      const createRes = await request(
        "POST",
        `/api/sessions/${session.sessionId}/messages`,
        { content: "To be deleted" }
      );
      const created = await createRes.json();

      // 削除
      const deleteRes = await request(
        "DELETE",
        `/api/sessions/${session.sessionId}/messages/${created.messageId}`
      );

      expect(deleteRes.status).toBe(204);

      // 削除後は一覧に含まれない
      const listRes = await request(
        "GET",
        `/api/sessions/${session.sessionId}/messages`
      );
      const listJson = await listRes.json();
      expect(listJson.items.length).toBe(0);
    });

    it("存在しないメッセージIDは404を返す", async () => {
      const session = await createTestSession();

      const res = await request(
        "DELETE",
        `/api/sessions/${session.sessionId}/messages/nonexistent_msg`
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });
  });
});
