// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Memory API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 *
 * 要約生成・取得・一覧のAPIエンドポイントを検証
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  vi,
} from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import {
  createSessionRequestFixture,
  createMessageFixture,
} from "../test-utils";

// モック: Anthropic SDK
vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [
          {
            type: "text",
            text: "SHORT_SUMMARY: テストセッションの要約です。\nDETAILED_SUMMARY: ユーザーがテスト機能を実装。Vitestを使用したテスト環境を構築しました。\nKEY_DECISIONS:\n- Vitestを採用\n- TDDで進める",
          },
        ],
      }),
    },
  })),
}));

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

let app: ReturnType<typeof createApp>;

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

describe("Memory API", () => {
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

  // ===== POST /api/memory/sessions/:id/summarize =====
  describe("POST /api/memory/sessions/:id/summarize", () => {
    it("セッションの要約を生成できる", async () => {
      // セッションを作成
      const sessionRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const session = await sessionRes.json();

      // メッセージを追加
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "テスト機能を実装してください",
        type: "user",
      });
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "Vitestを使ってテストを実装します。",
        type: "assistant",
      });

      // 要約を生成
      const res = await request(
        "POST",
        `/api/memory/sessions/${session.sessionId}/summarize`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.summaryId).toBeDefined();
      expect(json.sessionId).toBe(session.sessionId);
      expect(json.shortSummary).toBeDefined();
      expect(json.detailedSummary).toBeDefined();
      expect(Array.isArray(json.keyDecisions)).toBe(true);
    });

    it("存在しないセッションIDは404を返す", async () => {
      const res = await request(
        "POST",
        "/api/memory/sessions/nonexistent_id/summarize"
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });

    it("メッセージがないセッションは空の要約を返す", async () => {
      const sessionRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const session = await sessionRes.json();

      const res = await request(
        "POST",
        `/api/memory/sessions/${session.sessionId}/summarize`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.shortSummary).toBe("");
      expect(json.detailedSummary).toBe("");
    });

    it("既存の要約があれば上書きする", async () => {
      const sessionRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const session = await sessionRes.json();

      // メッセージを追加
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "初回メッセージ",
        type: "user",
      });

      // 1回目の要約
      const res1 = await request(
        "POST",
        `/api/memory/sessions/${session.sessionId}/summarize`
      );
      const json1 = await res1.json();

      // 追加メッセージ
      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "追加メッセージ",
        type: "user",
      });

      // 2回目の要約（上書き）
      const res2 = await request(
        "POST",
        `/api/memory/sessions/${session.sessionId}/summarize`
      );
      const json2 = await res2.json();

      expect(res2.status).toBe(200);
      // 同じsummaryIdになるか、新しいIDになるかは実装次第
      expect(json2.sessionId).toBe(session.sessionId);
    });
  });

  // ===== GET /api/memory/sessions/:id/summary =====
  describe("GET /api/memory/sessions/:id/summary", () => {
    it("生成済みの要約を取得できる", async () => {
      const sessionRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const session = await sessionRes.json();

      await request("POST", `/api/sessions/${session.sessionId}/messages`, {
        content: "テスト",
        type: "user",
      });

      // 要約を生成
      await request(
        "POST",
        `/api/memory/sessions/${session.sessionId}/summarize`
      );

      // 要約を取得
      const res = await request(
        "GET",
        `/api/memory/sessions/${session.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessionId).toBe(session.sessionId);
      expect(json.shortSummary).toBeDefined();
    });

    it("要約がないセッションは404を返す", async () => {
      const sessionRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const session = await sessionRes.json();

      const res = await request(
        "GET",
        `/api/memory/sessions/${session.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });

    it("存在しないセッションIDは404を返す", async () => {
      const res = await request(
        "GET",
        "/api/memory/sessions/nonexistent_id/summary"
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBeDefined();
    });
  });

  // ===== GET /api/memory/summaries =====
  describe("GET /api/memory/summaries", () => {
    it("空の場合は空配列を返す", async () => {
      const res = await request("GET", "/api/memory/summaries");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toEqual([]);
      expect(json.pagination).toBeDefined();
    });

    it("生成済みの要約一覧を取得できる", async () => {
      // セッション1を作成して要約
      const session1Res = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture({ name: "Session 1" })
      );
      const session1 = await session1Res.json();
      await request("POST", `/api/sessions/${session1.sessionId}/messages`, {
        content: "テスト1",
        type: "user",
      });
      await request(
        "POST",
        `/api/memory/sessions/${session1.sessionId}/summarize`
      );

      // セッション2を作成して要約
      const session2Res = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture({ name: "Session 2" })
      );
      const session2 = await session2Res.json();
      await request("POST", `/api/sessions/${session2.sessionId}/messages`, {
        content: "テスト2",
        type: "user",
      });
      await request(
        "POST",
        `/api/memory/sessions/${session2.sessionId}/summarize`
      );

      const res = await request("GET", "/api/memory/summaries");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
    });

    it("ページネーションが正しく動作する", async () => {
      // 3つのセッションを作成して要約
      for (let i = 1; i <= 3; i++) {
        const sessionRes = await request(
          "POST",
          "/api/sessions",
          createSessionRequestFixture({ name: `Session ${i}` })
        );
        const session = await sessionRes.json();
        await request("POST", `/api/sessions/${session.sessionId}/messages`, {
          content: `テスト${i}`,
          type: "user",
        });
        await request(
          "POST",
          `/api/memory/sessions/${session.sessionId}/summarize`
        );
      }

      const res = await request("GET", "/api/memory/summaries?page=1&limit=2");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.total).toBe(3);
      expect(json.pagination.hasNext).toBe(true);
    });
  });
});
