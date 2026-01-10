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
      // 同じ claudeSessionId で2回 session-start を呼ぶ
      const claudeSessionId = `test-resume-session-${Date.now()}`;

      // 1回目: 新規作成
      const firstRes = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/existing",
      });
      expect(firstRes.status).toBe(201);
      const firstJson = await firstRes.json();
      expect(firstJson.action).toBe("created");

      // 2回目: 再開
      const res = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
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

    it("requestContext=true でもセッション作成が成功する", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: `test-context-session-${Date.now()}`,
        workingDirectory: "/home/user/my-project",
        requestContext: true,
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.action).toBe("created");
      expect(json.id).toBeDefined();
      // contextText は関連セッションがない場合 null になる
      expect(json).toHaveProperty("contextText");
    });

    it("contextQuery を指定して検索できる", async () => {
      const res = await request("POST", "/hook/session-start", {
        sessionId: `test-query-session-${Date.now()}`,
        workingDirectory: "/home/user/project",
        requestContext: true,
        contextQuery: "API implementation",
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.action).toBe("created");
      // 関連セッションがない場合は null、ある場合は文字列
      expect(
        json.contextText === null || typeof json.contextText === "string"
      ).toBe(true);
    });

    it("既存セッション再開時もコンテキスト注入を要求できる", async () => {
      const claudeSessionId = `test-resume-context-${Date.now()}`;

      // 1回目: 新規作成
      await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });

      // 2回目: 再開（コンテキスト注入を要求）
      const res = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        requestContext: true,
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.action).toBe("resumed");
      expect(json).toHaveProperty("contextText");
    });
  });

  // ==================== POST /hook/session-end ====================
  describe("POST /hook/session-end", () => {
    it("セッションを正常終了できる", async () => {
      // session-start API 経由でセッション作成（claudeSessionId が登録される）
      const claudeSessionId = `test-end-session-${Date.now()}`;
      await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });

      const res = await request("POST", "/hook/session-end", {
        sessionId: claudeSessionId,
        status: "completed",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("completed");
    });

    it("セッションをエラー終了できる", async () => {
      // session-start API 経由でセッション作成
      const claudeSessionId = `test-error-session-${Date.now()}`;
      await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });

      const res = await request("POST", "/hook/session-end", {
        sessionId: claudeSessionId,
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

  // ==================== POST /hook/post-tooluse ====================
  describe("POST /hook/post-tooluse", () => {
    it("ツール使用を観測記録として保存できる", async () => {
      // 事前にセッションを session-start API 経由で作成（claudeSessionId が登録される）
      const claudeSessionId = `test-session-${Date.now()}`;
      await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });

      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Read",
        title: "Read: /path/to/file.ts",
        content: "file contents here...",
        metadata: { tool_input: '{"file_path":"/path/to/file.ts"}' },
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("recorded");
      expect(json.observationId).toBeDefined();
      expect(json.observationId).toMatch(/^ch_ob_/);
    });

    it("セッションが存在しない場合はスキップする", async () => {
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: "non-existent-session-id",
        toolName: "Bash",
        title: "Bash: ls",
        content: "output",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("skipped");
      expect(json.reason).toBe("session_not_found");
    });

    it("コンテンツなしでも記録できる", async () => {
      // 事前にセッションを session-start API 経由で作成
      const claudeSessionId = `test-session-no-content-${Date.now()}`;
      await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });

      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Write",
        title: "Write: /path/to/new-file.ts",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("recorded");
    });

    it("無効なsessionIdを拒否する", async () => {
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: "", // 空文字
        toolName: "Read",
        title: "Read: file",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("toolNameが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: "valid-session-id",
        title: "Some title",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("titleが欠落している場合エラーを返す", async () => {
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: "valid-session-id",
        toolName: "Read",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation Error");
    });

    it("長すぎるコンテンツを拒否する", async () => {
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: session.sessionId,
        toolName: "Read",
        title: "Read: large file",
        content: "x".repeat(11000), // 10000文字超
      });

      expect(res.status).toBe(400);
    });

    it("usage情報が含まれている場合トークン数を更新する", async () => {
      // セッションを作成
      const claudeSessionId = `test-session-tokens-${Date.now()}`;
      const createRes = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });
      const createJson = await createRes.json();
      const sessionId = createJson.id;

      // トークン情報付きでpost-tooluseを呼び出し
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Read",
        title: "Read: /path/to/file.ts",
        content: "file contents",
        usage: {
          inputTokens: 1000,
          outputTokens: 500,
        },
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("recorded");
      expect(json.tokensUpdated).toBe(true);

      // セッションのトークン数が更新されていることを確認
      const sessionRes = await request("GET", `/api/sessions/${sessionId}`);
      const sessionJson = await sessionRes.json();
      expect(sessionJson.inputTokens).toBe(1000);
      expect(sessionJson.outputTokens).toBe(500);
    });

    it("post-tooluseでトークン数の合計値が設定される", async () => {
      // セッションを作成
      const claudeSessionId = `test-session-tokens-cumulative-${Date.now()}`;
      const createRes = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });
      const createJson = await createRes.json();
      const sessionId = createJson.id;

      // 1回目のpost-tooluse（トランスクリプト全体の合計: 100, 50）
      await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Read",
        title: "Read: file1.ts",
        usage: { inputTokens: 100, outputTokens: 50 },
      });

      // 2回目のpost-tooluse（トランスクリプト全体の合計: 300, 150）
      await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Write",
        title: "Write: file2.ts",
        usage: { inputTokens: 300, outputTokens: 150 },
      });

      // セッションのトークン数が最新の合計値に設定されていることを確認
      const sessionRes = await request("GET", `/api/sessions/${sessionId}`);
      const sessionJson = await sessionRes.json();
      expect(sessionJson.inputTokens).toBe(300);
      expect(sessionJson.outputTokens).toBe(150);
    });

    it("usage情報がない場合はトークン更新をスキップする", async () => {
      // セッションを作成
      const claudeSessionId = `test-session-no-usage-${Date.now()}`;
      const createRes = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId,
        workingDirectory: "/tmp/test",
      });
      const createJson = await createRes.json();
      const sessionId = createJson.id;

      // usage情報なしでpost-tooluseを呼び出し
      const res = await request("POST", "/hook/post-tooluse", {
        sessionId: claudeSessionId,
        toolName: "Read",
        title: "Read: /path/to/file.ts",
      });

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("recorded");
      expect(json.tokensUpdated).toBeUndefined();

      // セッションのトークン数は0のまま
      const sessionRes = await request("GET", `/api/sessions/${sessionId}`);
      const sessionJson = await sessionRes.json();
      expect(sessionJson.inputTokens).toBe(0);
      expect(sessionJson.outputTokens).toBe(0);
    });
  });

  // ==================== クリーンアップテスト ====================
  describe("起動時クリーンアップ", () => {
    it("新規セッション開始時に最近作成されたセッションはクリーンアップされない", async () => {
      // 30分以内に作成されたセッションはクリーンアップ対象外
      const workingDir = "/tmp/cleanup-test-project";

      // 1つ目のセッションを作成
      const claudeSessionId1 = `cleanup-session-1-${Date.now()}`;
      const res1 = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId1,
        workingDirectory: workingDir,
      });
      expect(res1.status).toBe(201);
      const json1 = await res1.json();
      const sessionId1 = json1.id;

      // 2つ目のセッションを作成
      const claudeSessionId2 = `cleanup-session-2-${Date.now()}`;
      const res2 = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId2,
        workingDirectory: workingDir,
      });
      expect(res2.status).toBe(201);

      // 3つ目のセッションを作成
      const claudeSessionId3 = `cleanup-session-3-${Date.now()}`;
      const res3 = await request("POST", "/hook/session-start", {
        sessionId: claudeSessionId3,
        workingDirectory: workingDir,
      });
      expect(res3.status).toBe(201);
      const json3 = await res3.json();
      const sessionId3 = json3.id;

      // セッション状態を確認
      const sessionsRes = await request("GET", `/api/sessions?limit=10`);
      expect(sessionsRes.status).toBe(200);
      const sessionsJson = await sessionsRes.json();

      // すべてのセッションがprocessingのまま（30分以内なのでクリーンアップ対象外）
      const session1 = sessionsJson.items.find(
        (s: any) => s.sessionId === sessionId1
      );
      const session3 = sessionsJson.items.find(
        (s: any) => s.sessionId === sessionId3
      );
      expect(session1?.status).toBe("processing");
      expect(session3?.status).toBe("processing");
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
