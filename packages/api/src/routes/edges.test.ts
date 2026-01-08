// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Edges API テスト
 *
 * セッション間のエッジ（接続）操作APIのテスト。
 * UIでのノード接続をバックエンドで永続化し、コンテキスト注入に使用。
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";

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
      host: "localhost:3048",
      ...headers,
    },
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  return app.request(path, init);
}

// テスト用セッションを作成
async function createTestSession(
  sessionId: string,
  claudeSessionId: string
): Promise<void> {
  const now = new Date().toISOString();
  execute(
    `INSERT INTO sessions (session_id, name, working_dir, status, claude_session_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    sessionId,
    `Test Session ${sessionId}`,
    "/test/path",
    "idle",
    claudeSessionId,
    now,
    now
  );
}

describe("Edges API", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    // 各テスト前にエッジテーブルをクリア
    execute("DELETE FROM session_edges");
    execute("DELETE FROM sessions");
  });

  // ==================== POST /api/edges ====================
  describe("POST /api/edges", () => {
    beforeEach(async () => {
      // テスト用セッションを作成
      await createTestSession("ch_ss_0001", "claude-session-001");
    });

    it("エッジを作成できる", async () => {
      const res = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-claude-session-001",
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.edgeId).toMatch(/^ch_ed_/);
      expect(json.sourceSessionId).toBe("ch_ss_0001");
      expect(json.targetClaudeSessionId).toBe("target-claude-session-001");
      expect(json.createdAt).toBeDefined();
    });

    it("同じエッジの重複作成を拒否する (409 Conflict)", async () => {
      // 1回目: 成功
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-claude-session-001",
      });

      // 2回目: 重複
      const res = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-claude-session-001",
      });

      expect(res.status).toBe(409);
      const json = await res.json();
      expect(json.error).toBe("Edge already exists");
    });

    it("空のsourceSessionIdを拒否する", async () => {
      const res = await request("POST", "/api/edges", {
        sourceSessionId: "",
        targetClaudeSessionId: "target-claude-session-001",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("空のtargetClaudeSessionIdを拒否する", async () => {
      const res = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("必須フィールドが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/api/edges", {});

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });
  });

  // ==================== GET /api/edges/:id ====================
  describe("GET /api/edges/:id", () => {
    let createdEdgeId: string;

    beforeEach(async () => {
      await createTestSession("ch_ss_0001", "claude-session-001");

      const res = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-claude-session-001",
      });
      const json = await res.json();
      createdEdgeId = json.edgeId;
    });

    it("エッジを取得できる", async () => {
      const res = await request("GET", `/api/edges/${createdEdgeId}`);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.edgeId).toBe(createdEdgeId);
      expect(json.sourceSessionId).toBe("ch_ss_0001");
      expect(json.targetClaudeSessionId).toBe("target-claude-session-001");
    });

    it("存在しないエッジで404を返す", async () => {
      const res = await request("GET", "/api/edges/ch_ed_9999");

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Edge not found");
    });
  });

  // ==================== DELETE /api/edges/:id ====================
  describe("DELETE /api/edges/:id", () => {
    let createdEdgeId: string;

    beforeEach(async () => {
      await createTestSession("ch_ss_0001", "claude-session-001");

      const res = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-claude-session-001",
      });
      const json = await res.json();
      createdEdgeId = json.edgeId;
    });

    it("エッジを削除できる", async () => {
      const res = await request("DELETE", `/api/edges/${createdEdgeId}`);

      expect(res.status).toBe(204);

      // 削除確認
      const getRes = await request("GET", `/api/edges/${createdEdgeId}`);
      expect(getRes.status).toBe(404);
    });

    it("存在しないエッジで404を返す", async () => {
      const res = await request("DELETE", "/api/edges/ch_ed_9999");

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toBe("Edge not found");
    });
  });

  // ==================== GET /api/edges/by-target/:claudeSessionId ====================
  describe("GET /api/edges/by-target/:claudeSessionId", () => {
    beforeEach(async () => {
      // 複数のセッションとエッジを作成
      await createTestSession("ch_ss_0001", "claude-session-001");
      await createTestSession("ch_ss_0002", "claude-session-002");
      await createTestSession("ch_ss_0003", "claude-session-003");

      // 同じターゲットに複数のソースを接続
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-session-A",
      });
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0002",
        targetClaudeSessionId: "target-session-A",
      });

      // 別のターゲットにも接続
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0003",
        targetClaudeSessionId: "target-session-B",
      });
    });

    it("ターゲットに接続されたエッジ一覧を取得できる", async () => {
      const res = await request("GET", "/api/edges/by-target/target-session-A");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.targetClaudeSessionId).toBe("target-session-A");
      expect(json.edges).toHaveLength(2);
      expect(json.sourceSessionIds).toContain("ch_ss_0001");
      expect(json.sourceSessionIds).toContain("ch_ss_0002");
    });

    it("接続がない場合は空配列を返す", async () => {
      const res = await request(
        "GET",
        "/api/edges/by-target/non-existent-target"
      );

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.targetClaudeSessionId).toBe("non-existent-target");
      expect(json.edges).toHaveLength(0);
      expect(json.sourceSessionIds).toHaveLength(0);
    });
  });

  // ==================== GET /api/edges/by-source/:sessionId ====================
  describe("GET /api/edges/by-source/:sessionId", () => {
    beforeEach(async () => {
      await createTestSession("ch_ss_0001", "claude-session-001");

      // 同じソースから複数のターゲットに接続
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-session-A",
      });
      await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-session-B",
      });
    });

    it("ソースからのエッジ一覧を取得できる", async () => {
      const res = await request("GET", "/api/edges/by-source/ch_ss_0001");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.sourceSessionId).toBe("ch_ss_0001");
      expect(json.edges).toHaveLength(2);
      expect(json.targetClaudeSessionIds).toContain("target-session-A");
      expect(json.targetClaudeSessionIds).toContain("target-session-B");
    });

    it("接続がない場合は空配列を返す", async () => {
      const res = await request("GET", "/api/edges/by-source/ch_ss_9999");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.sourceSessionId).toBe("ch_ss_9999");
      expect(json.edges).toHaveLength(0);
      expect(json.targetClaudeSessionIds).toHaveLength(0);
    });
  });

  // ==================== 統合テスト ====================
  describe("統合テスト", () => {
    it("エッジ作成→取得→削除の一連のフローが動作する", async () => {
      await createTestSession("ch_ss_0001", "claude-session-001");

      // 1. エッジ作成
      const createRes = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_0001",
        targetClaudeSessionId: "target-session-flow",
      });
      expect(createRes.status).toBe(201);
      const created = await createRes.json();
      const edgeId = created.edgeId;

      // 2. 取得確認
      const getRes = await request("GET", `/api/edges/${edgeId}`);
      expect(getRes.status).toBe(200);
      const retrieved = await getRes.json();
      expect(retrieved.edgeId).toBe(edgeId);

      // 3. by-target で検索確認
      const byTargetRes = await request(
        "GET",
        "/api/edges/by-target/target-session-flow"
      );
      expect(byTargetRes.status).toBe(200);
      const byTarget = await byTargetRes.json();
      expect(byTarget.sourceSessionIds).toContain("ch_ss_0001");

      // 4. 削除
      const deleteRes = await request("DELETE", `/api/edges/${edgeId}`);
      expect(deleteRes.status).toBe(204);

      // 5. 削除後は取得できない
      const afterDeleteRes = await request("GET", `/api/edges/${edgeId}`);
      expect(afterDeleteRes.status).toBe(404);
    });

    // SQLite の foreign_keys がデフォルト無効のため、カスケード削除は動作しない
    // 将来的に PRAGMA foreign_keys = ON を有効にした場合に動作確認
    it.skip("セッション削除時にエッジもカスケード削除される", async () => {
      await createTestSession("ch_ss_cascade", "claude-session-cascade");

      // エッジ作成
      const createRes = await request("POST", "/api/edges", {
        sourceSessionId: "ch_ss_cascade",
        targetClaudeSessionId: "target-cascade-test",
      });
      const created = await createRes.json();
      const edgeId = created.edgeId;

      // エッジが存在することを確認
      const beforeDelete = await request("GET", `/api/edges/${edgeId}`);
      expect(beforeDelete.status).toBe(200);

      // セッションを削除
      execute("DELETE FROM sessions WHERE session_id = ?", "ch_ss_cascade");

      // エッジもカスケード削除されている
      const afterDelete = await request("GET", `/api/edges/${edgeId}`);
      expect(afterDelete.status).toBe(404);
    });
  });
});
