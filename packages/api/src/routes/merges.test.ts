// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Merges API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSessionRequestFixture } from "../test-utils";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

// アプリインスタンスを共有
let app: ReturnType<typeof createApp>;

// テスト用のHTTPリクエストヘルパー
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

// ヘルパー: テスト用セッションを作成
async function createTestSession(name: string = "Test Session") {
  const res = await request("POST", "/api/sessions", {
    ...createSessionRequestFixture(),
    name,
  });
  return res.json();
}

describe("Merges API", () => {
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
    execute("DELETE FROM merge_sessions");
    execute("DELETE FROM merges");
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  // ===== POST /api/merges =====
  describe("POST /api/merges", () => {
    it("2つ以上のセッションでマージを作成できる", async () => {
      // 2つのセッションを作成
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      const res = await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.mergeId).toBeDefined();
      // 新ID体系: ch_mg_XXXX
      expect(json.mergeId).toMatch(/^ch_mg_\d{4}$/);
      expect(json.sourceSessionIds).toEqual([
        session1.sessionId,
        session2.sessionId,
      ]);
      expect(json.status).toBe("pending");
    });

    it("3つ以上のセッションでマージを作成できる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");
      const session3 = await createTestSession("Session 3");

      const res = await request("POST", "/api/merges", {
        sourceSessionIds: [
          session1.sessionId,
          session2.sessionId,
          session3.sessionId,
        ],
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.sourceSessionIds.length).toBe(3);
    });

    it("projectIdを含めてマージを作成できる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      const res = await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
        projectId: "proj_001",
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.projectId).toBe("proj_001");
    });

    it("1つのセッションではマージを作成できない（400エラー）", async () => {
      const session1 = await createTestSession("Session 1");

      const res = await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId],
      });
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
    });

    it("空の配列ではマージを作成できない（400エラー）", async () => {
      const res = await request("POST", "/api/merges", {
        sourceSessionIds: [],
      });
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
    });

    it("sourceSessionIdsがない場合は400エラーを返す", async () => {
      const res = await request("POST", "/api/merges", {});
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
    });
  });

  // ===== GET /api/merges =====
  describe("GET /api/merges", () => {
    it("マージがない場合は空配列を返す", async () => {
      const res = await request("GET", "/api/merges");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toEqual([]);
      expect(json.pagination).toBeDefined();
      expect(json.pagination.total).toBe(0);
    });

    it("作成したマージが一覧に含まれる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });

      const res = await request("GET", "/api/merges");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.pagination.total).toBe(1);
    });

    it("ページネーションが正しく動作する", async () => {
      // 3つのマージを作成
      for (let i = 1; i <= 3; i++) {
        const s1 = await createTestSession(`Session ${i}a`);
        const s2 = await createTestSession(`Session ${i}b`);
        await request("POST", "/api/merges", {
          sourceSessionIds: [s1.sessionId, s2.sessionId],
        });
      }

      const res = await request("GET", "/api/merges?page=1&limit=2");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.total).toBe(3);
      expect(json.pagination.hasNext).toBe(true);
    });

    it("ステータスでフィルタリングできる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });

      const res = await request("GET", "/api/merges?status=pending");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].status).toBe("pending");
    });

    it("completedでフィルタリングすると結果が0件", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });

      const res = await request("GET", "/api/merges?status=completed");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(0);
    });
  });

  // ===== GET /api/merges/:id =====
  describe("GET /api/merges/:id", () => {
    it("マージ詳細を取得できる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      const createRes = await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });
      const created = await createRes.json();

      const res = await request("GET", `/api/merges/${created.mergeId}`);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.mergeId).toBe(created.mergeId);
      expect(json.sourceSessionIds).toEqual([
        session1.sessionId,
        session2.sessionId,
      ]);
    });

    it("存在しないIDは404を返す", async () => {
      const res = await request("GET", "/api/merges/nonexistent_merge");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Merge not found");
    });
  });

  // ===== DELETE /api/merges/:id =====
  describe("DELETE /api/merges/:id", () => {
    it("マージを削除できる", async () => {
      const session1 = await createTestSession("Session 1");
      const session2 = await createTestSession("Session 2");

      const createRes = await request("POST", "/api/merges", {
        sourceSessionIds: [session1.sessionId, session2.sessionId],
      });
      const created = await createRes.json();

      const deleteRes = await request(
        "DELETE",
        `/api/merges/${created.mergeId}`
      );
      expect(deleteRes.status).toBe(204);

      // 削除後は取得できない
      const getRes = await request("GET", `/api/merges/${created.mergeId}`);
      expect(getRes.status).toBe(404);
    });

    it("存在しないIDは404を返す", async () => {
      const res = await request("DELETE", "/api/merges/nonexistent_merge");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Merge not found");
    });
  });
});
