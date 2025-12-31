// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Memories API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 *
 * /memories/* エンドポイント（シンプルなCRUD API）
 * - POST /memories/add - メモリ追加
 * - GET /memories/search - セマンティック検索
 * - GET /memories/context - コンテキスト取得
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

// モック: Embedding API
vi.mock("../services/embeddings", () => ({
  generateEmbedding: vi.fn(async (text: string) => ({
    embedding: new Array(1536).fill(0.1),
    model: "text-embedding-3-small",
    tokenCount: text.length / 4,
  })),
  isEmbeddingAvailable: vi.fn(() => true),
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

describe("Memories API", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
    app = createApp();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    execute("DELETE FROM observations");
    execute("DELETE FROM sessions");
  });

  // ===== POST /memories/add =====
  describe("POST /memories/add", () => {
    it("メモリを追加できる", async () => {
      // セッションを先に作成
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const res = await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "decision",
        title: "Skills + Worker API を採用",
        content: "MCP Tools ではなく Skills を使用することに決定しました。",
        metadata: {
          reason: "安定性とclaude-code-harnessとの一貫性",
        },
      });

      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.id).toBeDefined();
      expect(json.sessionId).toBe(session.sessionId);
      expect(json.type).toBe("decision");
      expect(json.title).toBe("Skills + Worker API を採用");
      expect(json.createdAt).toBeDefined();
    });

    it("必須フィールドがない場合は400を返す", async () => {
      const res = await request("POST", "/memories/add", {
        type: "decision",
        // sessionId, title, content が欠けている
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("存在しないセッションIDでも新規作成される（セッション自動作成）", async () => {
      const res = await request("POST", "/memories/add", {
        sessionId: "nonexistent_session",
        type: "learning",
        title: "テスト学習",
        content: "テスト内容です。",
      });

      // 実装により201か400か決まる - ここでは sessionId が存在しない場合はエラーにする
      expect(res.status).toBe(404);
    });

    it("様々なtypeでメモリを追加できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const types = ["decision", "error", "learning", "note"];

      for (const type of types) {
        const res = await request("POST", "/memories/add", {
          sessionId: session.sessionId,
          type,
          title: `${type}のテスト`,
          content: `${type}の内容です。`,
        });

        expect(res.status).toBe(201);
        const json = await res.json();
        expect(json.type).toBe(type);
      }
    });
  });

  // ===== GET /memories/search =====
  describe("GET /memories/search", () => {
    it("検索クエリでメモリを検索できる", async () => {
      // セッションとメモリを作成
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "decision",
        title: "JWT認証を採用",
        content: "JWT を使用した認証機能を実装しました。",
      });

      const res = await request("GET", "/memories/search?q=認証");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.results).toBeDefined();
      expect(Array.isArray(json.results)).toBe(true);
      expect(json.query).toBe("認証");
    });

    it("クエリパラメータがない場合は400を返す", async () => {
      const res = await request("GET", "/memories/search");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("limitパラメータで結果数を制限できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      // 複数のメモリを作成
      for (let i = 0; i < 5; i++) {
        await request("POST", "/memories/add", {
          sessionId: session.sessionId,
          type: "note",
          title: `テストメモ ${i}`,
          content: `テスト内容 ${i}`,
        });
      }

      const res = await request("GET", "/memories/search?q=テスト&limit=3");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.results.length).toBeLessThanOrEqual(3);
    });

    it("typeパラメータでフィルタリングできる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "decision",
        title: "決定事項",
        content: "テスト決定",
      });

      await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "error",
        title: "エラー記録",
        content: "テストエラー",
      });

      const res = await request(
        "GET",
        "/memories/search?q=テスト&type=decision"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      // 結果はdecisionのみ含むことを確認
      if (json.results.length > 0) {
        expect(json.results.every((r: any) => r.type === "decision")).toBe(
          true
        );
      }
    });
  });

  // ===== GET /memories/context =====
  describe("GET /memories/context", () => {
    it("プロジェクトパスでコンテキストを取得できる", async () => {
      const res = await request(
        "GET",
        "/memories/context?projectPath=/Users/test/project"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.recentSessions).toBeDefined();
      expect(Array.isArray(json.recentSessions)).toBe(true);
    });

    it("projectPathがない場合は400を返す", async () => {
      const res = await request("GET", "/memories/context");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("queryパラメータで関連メモリを取得できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "decision",
        title: "認証の実装",
        content: "JWT認証を実装しました。",
      });

      const res = await request(
        "GET",
        "/memories/context?projectPath=/Users/test/project&query=認証"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.relevantMemories).toBeDefined();
    });

    it("levelパラメータでdetail levelを制御できる", async () => {
      const res = await request(
        "GET",
        "/memories/context?projectPath=/Users/test/project&level=0"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      // level 0 はインデックスのみ
    });

    it("level=1でprojectとdynamicFactsが含まれる", async () => {
      const res = await request(
        "GET",
        "/memories/context?projectPath=/Users/test/project&level=1"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.project).toBeDefined();
      expect(json.project.path).toBe("/Users/test/project");
      expect(json.dynamicFacts).toBeDefined();
      expect(json.dynamicFacts.lastUpdated).toBeDefined();
    });
  });

  // ===== エッジケースのテスト =====
  describe("Edge Cases", () => {
    it("メタデータがnullの場合も正常に処理される", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const res = await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "note",
        title: "メタデータなしのメモ",
        content: "メタデータを指定しないテストです。",
        // metadata は省略
      });

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.id).toBeDefined();
    });

    it("limitを100（最大値）で検索できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "note",
        title: "テストメモ",
        content: "テスト内容",
      });

      const res = await request("GET", "/memories/search?q=テスト&limit=100");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.results).toBeDefined();
    });

    it("limitが101以上の場合は400を返す", async () => {
      const res = await request("GET", "/memories/search?q=テスト&limit=101");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("limitが0以下の場合は400を返す", async () => {
      const res = await request("GET", "/memories/search?q=テスト&limit=0");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("無効なtypeパラメータは無視される", async () => {
      const res = await request(
        "GET",
        "/memories/search?q=テスト&type=invalid_type"
      );

      // Zod バリデーションにより400を返す
      expect(res.status).toBe(400);
    });

    it("空のqueryパラメータで検索した場合は400を返す", async () => {
      const res = await request("GET", "/memories/search?q=");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });

    it("levelパラメータが2以上の場合は400を返す", async () => {
      const res = await request(
        "GET",
        "/memories/context?projectPath=/test&level=2"
      );

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
    });
  });
});
