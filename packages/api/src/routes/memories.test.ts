// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * Memories API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 *
 * シンプル化されたエンドポイント:
 * - POST /api/memories - メモリ追加
 * - GET /api/memories - メモリ一覧取得
 * - GET /api/memories/:id - 個別取得
 * - DELETE /api/memories/:id - 削除
 * - POST /api/memories/search - セマンティック検索
 * - GET /api/memories/context - コンテキスト取得
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
    // sqlite-vec の既定次元 (voyage: 1024) に合わせる
    embedding: new Array(1024).fill(0.1),
    totalTokens: Math.ceil(text.length / 4),
    dimension: 1024,
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
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    execute("DELETE FROM observations");
    execute("DELETE FROM sessions");
  });

  // ===== POST /api/memories =====
  describe("POST /api/memories", () => {
    it("メモリを追加できる", async () => {
      // セッションを先に作成
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const res = await request("POST", "/api/memories", {
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
      const res = await request("POST", "/api/memories", {
        type: "decision",
        // sessionId, title, content が欠けている
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBeDefined();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("存在しないセッションIDの場合は404を返す", async () => {
      const res = await request("POST", "/api/memories", {
        sessionId: "nonexistent_session",
        type: "learning",
        title: "テスト学習",
        content: "テスト内容です。",
      });

      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error.code).toBe("SESSION_NOT_FOUND");
    });

    it("様々なtypeでメモリを追加できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const types = [
        "tool_use",
        "decision",
        "error",
        "learning",
        "note",
        "file_change",
      ];

      for (const type of types) {
        const res = await request("POST", "/api/memories", {
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

    it("無効なtypeの場合は400を返す", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const res = await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "invalid_type",
        title: "テスト",
        content: "テスト内容",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("メタデータがnullの場合も正常に処理される", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const res = await request("POST", "/api/memories", {
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
  });

  // ===== GET /api/memories =====
  describe("GET /api/memories", () => {
    it("メモリ一覧を取得できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      // メモリを2つ作成
      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "決定事項1",
        content: "内容1",
      });
      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "note",
        title: "メモ1",
        content: "内容2",
      });

      const res = await request("GET", "/api/memories");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toBeDefined();
      expect(Array.isArray(json.items)).toBe(true);
      expect(json.items.length).toBe(2);
      expect(json.pagination).toBeDefined();
      expect(json.pagination.total).toBe(2);
    });

    it("pageとlimitでページネーションできる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      // 5つのメモリを作成
      for (let i = 0; i < 5; i++) {
        await request("POST", "/api/memories", {
          sessionId: session.sessionId,
          type: "note",
          title: `メモ${i}`,
          content: `内容${i}`,
        });
      }

      const res = await request("GET", "/api/memories?page=1&limit=2");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.page).toBe(1);
      expect(json.pagination.limit).toBe(2);
      expect(json.pagination.total).toBe(5);
      expect(json.pagination.totalPages).toBe(3);
    });

    it("sessionIdでフィルタリングできる", async () => {
      const session1Res = await request("POST", "/api/sessions", {
        name: "Session 1",
        workingDir: "/Users/test/project1",
      });
      const session1 = await session1Res.json();

      const session2Res = await request("POST", "/api/sessions", {
        name: "Session 2",
        workingDir: "/Users/test/project2",
      });
      const session2 = await session2Res.json();

      await request("POST", "/api/memories", {
        sessionId: session1.sessionId,
        type: "note",
        title: "Session1のメモ",
        content: "内容1",
      });
      await request("POST", "/api/memories", {
        sessionId: session2.sessionId,
        type: "note",
        title: "Session2のメモ",
        content: "内容2",
      });

      const res = await request(
        "GET",
        `/api/memories?sessionId=${session1.sessionId}`
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].sessionId).toBe(session1.sessionId);
    });

    it("typeでフィルタリングできる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "決定事項",
        content: "内容1",
      });
      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "error",
        title: "エラー",
        content: "内容2",
      });

      const res = await request("GET", "/api/memories?type=decision");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].type).toBe("decision");
    });

    it("空の場合は空配列を返す", async () => {
      const res = await request("GET", "/api/memories");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toEqual([]);
      expect(json.pagination.total).toBe(0);
    });
  });

  // ===== GET /api/memories/:id =====
  describe("GET /api/memories/:id", () => {
    it("IDでメモリを取得できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const createRes = await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "テスト決定",
        content: "テスト内容です。",
        metadata: { key: "value" },
      });
      const created = await createRes.json();

      const res = await request("GET", `/api/memories/${created.id}`);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.id).toBe(created.id);
      expect(json.sessionId).toBe(session.sessionId);
      expect(json.type).toBe("decision");
      expect(json.title).toBe("テスト決定");
      expect(json.content).toBe("テスト内容です。");
      expect(json.metadata).toEqual({ key: "value" });
      expect(json.createdAt).toBeDefined();
    });

    it("存在しないIDの場合は404を返す", async () => {
      const res = await request("GET", "/api/memories/nonexistent_id");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error.code).toBe("MEMORY_NOT_FOUND");
    });
  });

  // ===== DELETE /api/memories/:id =====
  describe("DELETE /api/memories/:id", () => {
    it("メモリを削除できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      const createRes = await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "note",
        title: "削除するメモ",
        content: "削除されます。",
      });
      const created = await createRes.json();

      const deleteRes = await request("DELETE", `/api/memories/${created.id}`);

      expect(deleteRes.status).toBe(204);

      // 削除されたことを確認
      const getRes = await request("GET", `/api/memories/${created.id}`);
      expect(getRes.status).toBe(404);
    });

    it("存在しないIDの場合は404を返す", async () => {
      const res = await request("DELETE", "/api/memories/nonexistent_id");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error.code).toBe("MEMORY_NOT_FOUND");
    });
  });

  // ===== POST /api/memories/search =====
  describe("POST /api/memories/search", () => {
    it("検索クエリでメモリを検索できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "JWT認証を採用",
        content: "JWT を使用した認証機能を実装しました。",
      });

      const res = await request("POST", "/api/memories/search", {
        query: "認証",
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.results).toBeDefined();
      expect(Array.isArray(json.results)).toBe(true);
      expect(json.query).toBe("認証");
    });

    it("クエリがない場合は400を返す", async () => {
      const res = await request("POST", "/api/memories/search", {});

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("空のクエリの場合は400を返す", async () => {
      const res = await request("POST", "/api/memories/search", {
        query: "",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("limitパラメータで結果数を制限できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      // 複数のメモリを作成
      for (let i = 0; i < 5; i++) {
        await request("POST", "/api/memories", {
          sessionId: session.sessionId,
          type: "note",
          title: `テストメモ ${i}`,
          content: `テスト内容 ${i}`,
        });
      }

      const res = await request("POST", "/api/memories/search", {
        query: "テスト",
        limit: 3,
      });
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

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "決定事項",
        content: "テスト決定",
      });

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "error",
        title: "エラー記録",
        content: "テストエラー",
      });

      const res = await request("POST", "/api/memories/search", {
        query: "テスト",
        type: "decision",
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      if (json.results.length > 0) {
        expect(json.results.every((r: any) => r.type === "decision")).toBe(
          true
        );
      }
    });

    it("limitが100を超える場合は400を返す", async () => {
      const res = await request("POST", "/api/memories/search", {
        query: "テスト",
        limit: 101,
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("limitが0以下の場合は400を返す", async () => {
      const res = await request("POST", "/api/memories/search", {
        query: "テスト",
        limit: 0,
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("無効なtypeパラメータの場合は400を返す", async () => {
      const res = await request("POST", "/api/memories/search", {
        query: "テスト",
        type: "invalid_type",
      });

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });
  });

  // ===== GET /api/memories/context =====
  describe("GET /api/memories/context", () => {
    it("プロジェクトパスでコンテキストを取得できる", async () => {
      const res = await request(
        "GET",
        "/api/memories/context?projectPath=/Users/test/project"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.recentSessions).toBeDefined();
      expect(Array.isArray(json.recentSessions)).toBe(true);
    });

    it("projectPathがない場合は400を返す", async () => {
      const res = await request("GET", "/api/memories/context");

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });

    it("queryパラメータで関連メモリを取得できる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "decision",
        title: "認証の実装",
        content: "JWT認証を実装しました。",
      });

      const res = await request(
        "GET",
        "/api/memories/context?projectPath=/Users/test/project&query=認証"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.relevantMemories).toBeDefined();
    });

    it("levelパラメータでdetail levelを制御できる", async () => {
      const res = await request(
        "GET",
        "/api/memories/context?projectPath=/Users/test/project&level=0"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      // level 0 はインデックスのみ（project/dynamicFacts なし）
      expect(json.project).toBeUndefined();
      expect(json.dynamicFacts).toBeUndefined();
    });

    it("level=1でprojectとdynamicFactsが含まれる", async () => {
      const res = await request(
        "GET",
        "/api/memories/context?projectPath=/Users/test/project&level=1"
      );
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.project).toBeDefined();
      expect(json.project.path).toBe("/Users/test/project");
      expect(json.dynamicFacts).toBeDefined();
      expect(json.dynamicFacts.lastUpdated).toBeDefined();
    });

    it("levelパラメータが2以上の場合は400を返す", async () => {
      const res = await request(
        "GET",
        "/api/memories/context?projectPath=/test&level=2"
      );

      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error.code).toBe("VALIDATION_ERROR");
    });
  });

  // ===== 後方互換性テスト =====
  describe("Backward Compatibility", () => {
    it("旧エンドポイント POST /memories/add は /api/memories にリダイレクトされる", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      // 旧エンドポイントでも動作することを確認
      const res = await request("POST", "/memories/add", {
        sessionId: session.sessionId,
        type: "note",
        title: "旧APIテスト",
        content: "後方互換性テスト",
      });

      // 新APIと同じ結果が返る
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.id).toBeDefined();
    });

    it("旧エンドポイント GET /memories/search は POST /api/memories/search と同等の結果を返す", async () => {
      const sessionRes = await request("POST", "/api/sessions", {
        name: "Test Session",
        workingDir: "/Users/test/project",
      });
      const session = await sessionRes.json();

      await request("POST", "/api/memories", {
        sessionId: session.sessionId,
        type: "note",
        title: "検索テスト",
        content: "検索される内容",
      });

      const res = await request("GET", "/memories/search?q=検索");

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.results).toBeDefined();
    });

    it("旧エンドポイント GET /memories/context は /api/memories/context と同等", async () => {
      const res = await request(
        "GET",
        "/memories/context?projectPath=/Users/test/project"
      );

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.recentSessions).toBeDefined();
    });
  });
});
