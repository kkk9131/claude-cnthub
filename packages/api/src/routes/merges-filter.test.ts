// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Merges Filter API テスト
 *
 * マージ済み（completed）のみのフィルタリングをテスト
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSessionRequestFixture } from "../test-utils";
import { updateMergeStatus } from "../repositories/merge";

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

// ヘルパー: テスト用マージを作成
async function createTestMerge(sessionNames: string[] = ["S1", "S2"]) {
  const sessions = await Promise.all(
    sessionNames.map((name) => createTestSession(name))
  );
  const res = await request("POST", "/api/merges", {
    sourceSessionIds: sessions.map((s) => s.sessionId),
  });
  return res.json();
}

describe("Merges Filter API", () => {
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
    execute("DELETE FROM merge_sessions");
    execute("DELETE FROM merges");
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  describe("GET /api/merges?status=completed", () => {
    it("completedステータスのマージのみ取得できる", async () => {
      // マージを3つ作成
      const merge1 = await createTestMerge(["A1", "A2"]);
      const merge2 = await createTestMerge(["B1", "B2"]);
      const merge3 = await createTestMerge(["C1", "C2"]);

      // 1つだけcompletedに更新
      updateMergeStatus(merge1.mergeId, "completed", {
        resultSummary: "Merged summary for sessions A1 and A2",
      });

      // completedでフィルタリング
      const res = await request("GET", "/api/merges?status=completed");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].mergeId).toBe(merge1.mergeId);
      expect(json.items[0].status).toBe("completed");
      expect(json.items[0].resultSummary).toBe(
        "Merged summary for sessions A1 and A2"
      );
    });

    it("pendingステータスのマージのみ取得できる", async () => {
      // マージを3つ作成（全てpending）
      await createTestMerge(["A1", "A2"]);
      await createTestMerge(["B1", "B2"]);
      const merge3 = await createTestMerge(["C1", "C2"]);

      // 1つだけcompletedに更新
      updateMergeStatus(merge3.mergeId, "completed", {
        resultSummary: "Completed",
      });

      // pendingでフィルタリング
      const res = await request("GET", "/api/merges?status=pending");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.items.every((m: any) => m.status === "pending")).toBe(true);
    });

    it("errorステータスのマージのみ取得できる", async () => {
      // マージを作成
      const merge1 = await createTestMerge(["A1", "A2"]);
      const merge2 = await createTestMerge(["B1", "B2"]);

      // 1つをerrorに更新
      updateMergeStatus(merge1.mergeId, "error", {
        error: "Failed to merge: AI service unavailable",
      });

      // errorでフィルタリング
      const res = await request("GET", "/api/merges?status=error");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].mergeId).toBe(merge1.mergeId);
      expect(json.items[0].status).toBe("error");
      expect(json.items[0].error).toBe(
        "Failed to merge: AI service unavailable"
      );
    });

    it("processingステータスのマージのみ取得できる", async () => {
      // マージを作成
      const merge1 = await createTestMerge(["A1", "A2"]);
      await createTestMerge(["B1", "B2"]);

      // 1つをprocessingに更新
      updateMergeStatus(merge1.mergeId, "processing");

      // processingでフィルタリング
      const res = await request("GET", "/api/merges?status=processing");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].mergeId).toBe(merge1.mergeId);
      expect(json.items[0].status).toBe("processing");
    });
  });

  describe("GET /api/merges?projectId=xxx", () => {
    it("特定のプロジェクトのマージのみ取得できる", async () => {
      // プロジェクトA用のセッション
      const sessionA1 = await createTestSession("Project A - Session 1");
      const sessionA2 = await createTestSession("Project A - Session 2");

      // プロジェクトB用のセッション
      const sessionB1 = await createTestSession("Project B - Session 1");
      const sessionB2 = await createTestSession("Project B - Session 2");

      // プロジェクトAのマージ
      await request("POST", "/api/merges", {
        sourceSessionIds: [sessionA1.sessionId, sessionA2.sessionId],
        projectId: "proj_A",
      });

      // プロジェクトBのマージ
      await request("POST", "/api/merges", {
        sourceSessionIds: [sessionB1.sessionId, sessionB2.sessionId],
        projectId: "proj_B",
      });

      // プロジェクトなしのマージ
      const sessionC1 = await createTestSession("No Project - Session 1");
      const sessionC2 = await createTestSession("No Project - Session 2");
      await request("POST", "/api/merges", {
        sourceSessionIds: [sessionC1.sessionId, sessionC2.sessionId],
      });

      // プロジェクトAでフィルタリング
      const res = await request("GET", "/api/merges?projectId=proj_A");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].projectId).toBe("proj_A");
    });
  });

  describe("GET /api/merges with combined filters", () => {
    it("ステータスとプロジェクトを組み合わせてフィルタリングできる", async () => {
      // プロジェクトA用のセッション
      const sessionA1 = await createTestSession("A1");
      const sessionA2 = await createTestSession("A2");
      const sessionA3 = await createTestSession("A3");
      const sessionA4 = await createTestSession("A4");

      // プロジェクトB用のセッション
      const sessionB1 = await createTestSession("B1");
      const sessionB2 = await createTestSession("B2");

      // プロジェクトAのマージ2つ
      const mergeA1Res = await request("POST", "/api/merges", {
        sourceSessionIds: [sessionA1.sessionId, sessionA2.sessionId],
        projectId: "proj_A",
      });
      const mergeA1 = await mergeA1Res.json();

      await request("POST", "/api/merges", {
        sourceSessionIds: [sessionA3.sessionId, sessionA4.sessionId],
        projectId: "proj_A",
      });

      // プロジェクトBのマージ
      await request("POST", "/api/merges", {
        sourceSessionIds: [sessionB1.sessionId, sessionB2.sessionId],
        projectId: "proj_B",
      });

      // mergeA1だけcompletedに
      updateMergeStatus(mergeA1.mergeId, "completed", {
        resultSummary: "Completed merge for project A",
      });

      // プロジェクトA + completedでフィルタリング
      const res = await request(
        "GET",
        "/api/merges?projectId=proj_A&status=completed"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].mergeId).toBe(mergeA1.mergeId);
      expect(json.items[0].projectId).toBe("proj_A");
      expect(json.items[0].status).toBe("completed");
    });
  });
});
