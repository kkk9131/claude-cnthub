// @ts-nocheck - テストファイルでは動的なJSON型を許容
/**
 * セッション API テスト
 *
 * TDD: まずテストを書いて失敗させる（Red）
 * その後、実装を行いテストを通す（Green）
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { createApp } from "../app";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSessionRequestFixture } from "../test-utils";
import { createProject, deleteProject } from "../repositories/project";
import type { Project } from "@claude-cnthub/shared";

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

describe("Sessions API", () => {
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

  // ===== POST /api/sessions =====
  describe("POST /api/sessions", () => {
    it("セッションを作成できる", async () => {
      const res = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.sessionId).toBeDefined();
      // 新ID体系: ch_ss_XXXX
      expect(json.sessionId).toMatch(/^ch_ss_\d{4}$/);
      expect(json.name).toBe("Test Session");
      expect(json.workingDir).toBe("/tmp/test");
      expect(json.status).toBe("idle");
    });

    it("taskを含めてセッションを作成できる", async () => {
      const res = await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        task: "Implement user authentication",
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.task).toBe("Implement user authentication");
    });

    it("nameが空の場合は400エラーを返す", async () => {
      const res = await request("POST", "/api/sessions", {
        name: "",
        workingDir: "/tmp/test",
      });
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
      expect(json.details).toBeDefined();
    });

    it("workingDirがない場合は400エラーを返す", async () => {
      const res = await request("POST", "/api/sessions", {
        name: "Test Session",
      });
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
    });
  });

  // ===== GET /api/sessions =====
  describe("GET /api/sessions", () => {
    it("セッションがない場合は空配列を返す", async () => {
      const res = await request("GET", "/api/sessions");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items).toEqual([]);
      expect(json.pagination).toBeDefined();
      expect(json.pagination.total).toBe(0);
    });

    it("作成したセッションが一覧に含まれる", async () => {
      // 2つのセッションを作成
      await request("POST", "/api/sessions", createSessionRequestFixture());
      await request("POST", "/api/sessions", {
        ...createSessionRequestFixture(),
        name: "Second Session",
      });

      const res = await request("GET", "/api/sessions");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.total).toBe(2);
    });

    it("ページネーションが正しく動作する", async () => {
      // 3つのセッションを作成
      for (let i = 1; i <= 3; i++) {
        await request("POST", "/api/sessions", {
          ...createSessionRequestFixture(),
          name: `Session ${i}`,
        });
      }

      const res = await request("GET", "/api/sessions?page=1&limit=2");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(2);
      expect(json.pagination.total).toBe(3);
      expect(json.pagination.hasNext).toBe(true);
    });

    it("ステータスでフィルタリングできる", async () => {
      // idleセッションを作成
      await request("POST", "/api/sessions", createSessionRequestFixture());

      const res = await request("GET", "/api/sessions?status=idle");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].status).toBe("idle");
    });

    it("processingでフィルタリングすると結果が0件", async () => {
      // idleセッションを作成（デフォルトステータス）
      await request("POST", "/api/sessions", createSessionRequestFixture());

      const res = await request("GET", "/api/sessions?status=processing");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(0);
    });
  });

  // ===== GET /api/sessions/:id =====
  describe("GET /api/sessions/:id", () => {
    it("セッション詳細を取得できる", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request("GET", `/api/sessions/${created.sessionId}`);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sessionId).toBe(created.sessionId);
      expect(json.name).toBe("Test Session");
    });

    it("存在しないIDは404を返す", async () => {
      const res = await request("GET", "/api/sessions/nonexistent_session");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Session not found");
    });
  });

  // ===== PATCH /api/sessions/:id =====
  describe("PATCH /api/sessions/:id", () => {
    it("セッション名を更新できる", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request("PATCH", `/api/sessions/${created.sessionId}`, {
        name: "Updated Session Name",
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.name).toBe("Updated Session Name");
    });

    it("ステータスを更新できる", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request("PATCH", `/api/sessions/${created.sessionId}`, {
        status: "processing",
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.status).toBe("processing");
    });

    it("taskを更新できる", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request("PATCH", `/api/sessions/${created.sessionId}`, {
        task: "New task description",
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.task).toBe("New task description");
    });

    it("存在しないIDは404を返す", async () => {
      const res = await request("PATCH", "/api/sessions/nonexistent_session", {
        name: "Updated",
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Session not found");
    });

    it("無効なステータスは400エラーを返す", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const res = await request("PATCH", `/api/sessions/${created.sessionId}`, {
        status: "invalid_status",
      });
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe("Validation Error");
    });
  });

  // ===== DELETE /api/sessions/:id =====
  describe("DELETE /api/sessions/:id", () => {
    it("セッションを削除できる（論理削除）", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      const deleteRes = await request(
        "DELETE",
        `/api/sessions/${created.sessionId}`
      );
      expect(deleteRes.status).toBe(204);

      // 削除後は一覧に含まれない（デフォルトで論理削除されたものは除外）
      const listRes = await request("GET", "/api/sessions");
      const listJson = await listRes.json();
      expect(listJson.items.length).toBe(0);
    });

    it("includeDeletedで削除済みセッションも取得できる", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      await request("DELETE", `/api/sessions/${created.sessionId}`);

      const res = await request("GET", "/api/sessions?includeDeleted=true");
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.items.length).toBe(1);
      expect(json.items[0].deletedAt).toBeDefined();
    });

    it("存在しないIDは404を返す", async () => {
      const res = await request("DELETE", "/api/sessions/nonexistent_session");
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toBe("Session not found");
    });

    it("既に削除済みのセッションは404を返す", async () => {
      const createRes = await request(
        "POST",
        "/api/sessions",
        createSessionRequestFixture()
      );
      const created = await createRes.json();

      // 1回目の削除
      await request("DELETE", `/api/sessions/${created.sessionId}`);

      // 2回目の削除は404
      const res = await request("DELETE", `/api/sessions/${created.sessionId}`);
      const json = await res.json();

      expect(res.status).toBe(404);
    });
  });

  // ===== Project Auto-linking (P-03) =====
  describe("Project Auto-linking (P-03)", () => {
    let testProject: Project;

    beforeEach(() => {
      // テスト用プロジェクトを作成
      execute("DELETE FROM projects");
      testProject = createProject({
        name: "Auto-link Test Project",
        path: "/Users/test/projects/autolink",
        description: "Project for auto-linking test",
      });
    });

    it("workingDirがプロジェクトパスと一致する場合、自動的にprojectIdを設定する", async () => {
      const res = await request("POST", "/api/sessions", {
        name: "Auto-linked Session",
        workingDir: "/Users/test/projects/autolink",
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.projectId).toBe(testProject.projectId);
    });

    it("workingDirがプロジェクトパスのサブディレクトリの場合、自動的にprojectIdを設定する", async () => {
      const res = await request("POST", "/api/sessions", {
        name: "Auto-linked Session from Subdir",
        workingDir: "/Users/test/projects/autolink/src/components",
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.projectId).toBe(testProject.projectId);
    });

    it("workingDirがどのプロジェクトにもマッチしない場合、projectIdはnull", async () => {
      const res = await request("POST", "/api/sessions", {
        name: "Unlinked Session",
        workingDir: "/Users/other/random/path",
      });
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.projectId).toBeNull();
    });

    it("projectIdを明示的に指定した場合、自動判定をスキップする", async () => {
      // 別のプロジェクトを作成
      const anotherProject = createProject({
        name: "Another Project",
        path: "/Users/test/other-project",
        description: "Another project",
      });

      try {
        // workingDirはtestProjectにマッチするが、明示的にanotherProjectを指定
        const res = await request("POST", "/api/sessions", {
          name: "Explicitly Linked Session",
          workingDir: "/Users/test/projects/autolink/src",
          projectId: anotherProject.projectId,
        });
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.projectId).toBe(anotherProject.projectId);
      } finally {
        deleteProject(anotherProject.projectId);
      }
    });

    it("最も具体的な（長いパスの）プロジェクトにマッチする", async () => {
      // ネストしたプロジェクトを作成
      const nestedProject = createProject({
        name: "Nested Project",
        path: "/Users/test/projects/autolink/packages/nested",
        description: "Nested project",
      });

      try {
        const res = await request("POST", "/api/sessions", {
          name: "Nested Session",
          workingDir: "/Users/test/projects/autolink/packages/nested/src",
        });
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.projectId).toBe(nestedProject.projectId);
      } finally {
        deleteProject(nestedProject.projectId);
      }
    });
  });
});
