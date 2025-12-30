// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * セッション要約詳細 API テスト (L-03)
 *
 * Level 1 要約詳細 API のテスト
 * GET /api/sessions/:id/summary - 要約詳細取得
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute, query } from "../db";
import { createSessionRequestFixture } from "../test-utils";
import { generateId, now } from "../repositories/base";

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

/**
 * テスト用の要約データを作成
 */
function createTestSummary(sessionId: string) {
  const summaryId = generateId("sum");
  const timestamp = now();

  execute(
    `INSERT INTO summaries (
      summary_id, session_id, short_summary, detailed_summary,
      key_decisions, files_modified, tools_used, topics,
      original_token_count, summary_token_count, compression_ratio,
      changes, errors, decisions,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    summaryId,
    sessionId,
    "Phase 6 disclosure system implementation",
    "Implemented Level 0 and Level 1 APIs for the progressive disclosure system. Added auto-tagging and auto-naming services.",
    JSON.stringify(["Use 3-level disclosure", "Zod for validation"]),
    JSON.stringify(["packages/api/src/routes/sessions.ts"]),
    JSON.stringify(["Bash", "Read", "Write"]),
    JSON.stringify(["api", "disclosure", "phase6"]),
    50000,
    1000,
    0.02,
    JSON.stringify([
      {
        filePath: "packages/api/src/routes/sessions-index.ts",
        changeType: "create",
        summary: "Added Level 0 API",
        additions: 100,
      },
    ]),
    JSON.stringify([
      {
        errorId: "err_001",
        errorType: "test",
        message: "Initial test failure",
        timestamp: timestamp,
        resolved: true,
        resolution: "Fixed assertion",
      },
    ]),
    JSON.stringify([
      {
        decisionId: "dec_001",
        title: "3-Level Disclosure",
        description: "Use 3-level disclosure for progressive data loading",
        category: "architecture",
        timestamp: timestamp,
      },
    ]),
    timestamp,
    timestamp
  );

  return summaryId;
}

describe("Sessions Summary API (L-03)", () => {
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

  describe("GET /api/sessions/:id/summary", () => {
    it("要約が存在しない場合は404を返す", async () => {
      // セッションを作成（要約なし）
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Summary not found");
    });

    it("存在しないセッションは404を返す", async () => {
      const res = await request("GET", "/api/sessions/nonexistent/summary");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Session not found");
    });

    it("要約詳細を取得できる（基本フィールド）", async () => {
      // セッションを作成
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      // 要約を作成
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.summaryId).toBeDefined();
      expect(json.sessionId).toBe(created.sessionId);
      expect(json.shortSummary).toContain("Phase 6");
      expect(json.detailedSummary).toContain("Level 0");
      expect(json.keyDecisions).toContain("Use 3-level disclosure");
      expect(json.filesModified).toContain(
        "packages/api/src/routes/sessions.ts"
      );
      expect(json.toolsUsed).toContain("Bash");
      expect(json.topics).toContain("api");
    });

    it("要約詳細を取得できる（拡張フィールド - changes）", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.changes).toHaveLength(1);
      expect(json.changes[0].filePath).toContain("sessions-index.ts");
      expect(json.changes[0].changeType).toBe("create");
      expect(json.changes[0].additions).toBe(100);
    });

    it("要約詳細を取得できる（拡張フィールド - errors）", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.errors).toHaveLength(1);
      expect(json.errors[0].errorType).toBe("test");
      expect(json.errors[0].resolved).toBe(true);
      expect(json.errors[0].resolution).toBe("Fixed assertion");
    });

    it("要約詳細を取得できる（拡張フィールド - decisions）", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.decisions).toHaveLength(1);
      expect(json.decisions[0].title).toBe("3-Level Disclosure");
      expect(json.decisions[0].category).toBe("architecture");
    });

    it("圧縮率などのメタデータを含む", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.originalTokenCount).toBe(50000);
      expect(json.summaryTokenCount).toBe(1000);
      expect(json.compressionRatio).toBe(0.02);
    });

    it("タイムスタンプを含む", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();
      createTestSummary(created.sessionId);

      const res = await request(
        "GET",
        `/api/sessions/${created.sessionId}/summary`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.createdAt).toBeDefined();
      expect(json.updatedAt).toBeDefined();
    });
  });
});
