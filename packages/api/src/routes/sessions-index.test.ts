// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * セッションインデックス API テスト (L-02)
 *
 * Level 0 インデックス API のテスト
 * GET /api/sessions/index - 軽量インデックス一覧取得
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSessionRequestFixture } from "../test-utils";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

let app: ReturnType<typeof createApp>;

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

describe("Sessions Index API (L-02)", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    execute("DELETE FROM summaries");
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  describe("GET /api/sessions/index", () => {
    it("インデックスが空の場合は空配列を返す", async () => {
      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toEqual([]);
      expect(json.pagination).toBeDefined();
      expect(json.pagination.total).toBe(0);
    });

    it("セッションインデックスを取得できる（軽量版）", async () => {
      // セッションを作成
      await request("POST", "/api/sessions", createSessionRequestFixture());

      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(1);

      const session = json.sessions[0];
      // Level 0 の必須フィールド
      expect(session.id).toBeDefined();
      expect(session.sessionName).toBeDefined();
      expect(session.status).toBe("idle");
      expect(session.tags).toEqual([]);
      expect(session.summaryPreview).toBeDefined();
      expect(session.createdAt).toBeDefined();
      expect(session.updatedAt).toBeDefined();
    });

    it("複数セッションのインデックスを取得できる", async () => {
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Session 1",
      });
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Session 2",
      });
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Session 3",
      });

      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(3);
      expect(json.pagination.total).toBe(3);
    });

    it("ページネーションが正しく動作する", async () => {
      // 5つのセッションを作成
      for (let i = 1; i <= 5; i++) {
        await request("POST", "/api/sessions", {
          ...createSessionRequestFixture(),
          name: `Session ${i}`,
        });
      }

      const res = await request("GET", "/api/sessions/index?page=1&limit=2");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(2);
      expect(json.pagination.total).toBe(5);
      expect(json.pagination.page).toBe(1);
      expect(json.pagination.totalPages).toBe(3);
      expect(json.pagination.hasNext).toBe(true);
      expect(json.pagination.hasPrev).toBe(false);
    });

    it("ステータスでフィルタリングできる", async () => {
      // idleセッションを作成
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      // ステータスをcompletedに更新
      await request("PATCH", `/api/sessions/${created.sessionId}`, {
        status: "completed",
      });

      // 別のidleセッションを作成
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Idle Session",
      });

      // completedでフィルタ
      const res = await request("GET", "/api/sessions/index?status=completed");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(1);
      expect(json.sessions[0].status).toBe("completed");
    });

    it("projectIdでフィルタリングできる", async () => {
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Project A Session",
        projectId: "proj_a",
      });
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Project B Session",
        projectId: "proj_b",
      });

      const res = await request("GET", "/api/sessions/index?projectId=proj_a");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(1);
    });

    it("workItemIdでフィルタリングできる", async () => {
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Work Item 1 Session",
        workItemId: "wi_1",
      });
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Work Item 2 Session",
        workItemId: "wi_2",
      });

      const res = await request("GET", "/api/sessions/index?workItemId=wi_1");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(1);
    });

    it("削除済みセッションは除外される", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      // 削除
      await request("DELETE", `/api/sessions/${created.sessionId}`);

      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions).toHaveLength(0);
    });

    it("summaryPreviewは要約がない場合は空文字を返す", async () => {
      await request("POST", "/api/sessions", createSessionRequestFixture());

      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions[0].summaryPreview).toBe("");
    });

    it("sessionNameはセッション名を返す（自動命名未実装時はnameを使用）", async () => {
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "My Custom Session",
      });

      const res = await request("GET", "/api/sessions/index");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessions[0].sessionName).toBe("My Custom Session");
    });
  });
});
