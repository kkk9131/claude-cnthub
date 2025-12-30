/**
 * Merges Migration テスト
 *
 * DBスキーマが正しく作成されることを検証
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDatabase, closeDatabase, runMigrations, execute, query } from "..";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

describe("Merges Migration", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  describe("merges table", () => {
    it("merges テーブルが作成されている", () => {
      const db = getDatabase();
      const tables = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='merges'"
        )
        .all() as { name: string }[];

      expect(tables.length).toBe(1);
      expect(tables[0].name).toBe("merges");
    });

    it("必要なカラムが存在する", () => {
      const db = getDatabase();
      const columns = db.prepare("PRAGMA table_info(merges)").all() as {
        name: string;
        type: string;
        notnull: number;
        pk: number;
      }[];

      const columnNames = columns.map((c) => c.name);

      expect(columnNames).toContain("merge_id");
      expect(columnNames).toContain("source_session_ids");
      expect(columnNames).toContain("result_summary");
      expect(columnNames).toContain("result_detailed_summary");
      expect(columnNames).toContain("status");
      expect(columnNames).toContain("project_id");
      expect(columnNames).toContain("error");
      expect(columnNames).toContain("created_at");
      expect(columnNames).toContain("updated_at");
    });

    it("merge_id がプライマリキーである", () => {
      const db = getDatabase();
      const columns = db.prepare("PRAGMA table_info(merges)").all() as {
        name: string;
        pk: number;
      }[];

      const pkColumn = columns.find((c) => c.pk === 1);
      expect(pkColumn?.name).toBe("merge_id");
    });

    it("ステータスにデフォルト値が設定されている", () => {
      const now = new Date().toISOString();
      execute(
        `INSERT INTO merges (merge_id, source_session_ids, created_at, updated_at)
         VALUES (?, ?, ?, ?)`,
        "merge_test1",
        '["sess_1", "sess_2"]',
        now,
        now
      );

      const result = query<{ status: string }>(
        "SELECT status FROM merges WHERE merge_id = ?",
        "merge_test1"
      );

      expect(result[0].status).toBe("pending");

      // クリーンアップ
      execute("DELETE FROM merges WHERE merge_id = ?", "merge_test1");
    });

    it("ステータスのCHECK制約が機能する", () => {
      const now = new Date().toISOString();

      expect(() => {
        execute(
          `INSERT INTO merges (merge_id, source_session_ids, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?)`,
          "merge_invalid",
          '["sess_1"]',
          "invalid_status",
          now,
          now
        );
      }).toThrow();
    });
  });

  describe("merge_sessions table", () => {
    it("merge_sessions テーブルが作成されている", () => {
      const db = getDatabase();
      const tables = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='merge_sessions'"
        )
        .all() as { name: string }[];

      expect(tables.length).toBe(1);
      expect(tables[0].name).toBe("merge_sessions");
    });

    it("必要なカラムが存在する", () => {
      const db = getDatabase();
      const columns = db.prepare("PRAGMA table_info(merge_sessions)").all() as {
        name: string;
      }[];

      const columnNames = columns.map((c) => c.name);

      expect(columnNames).toContain("merge_id");
      expect(columnNames).toContain("session_id");
      expect(columnNames).toContain("display_order");
    });

    it("複合プライマリキーが設定されている", () => {
      const db = getDatabase();
      const columns = db.prepare("PRAGMA table_info(merge_sessions)").all() as {
        name: string;
        pk: number;
      }[];

      const pkColumns = columns.filter((c) => c.pk > 0);
      expect(pkColumns.length).toBe(2);
      expect(pkColumns.map((c) => c.name)).toContain("merge_id");
      expect(pkColumns.map((c) => c.name)).toContain("session_id");
    });
  });

  describe("indexes", () => {
    it("ステータスインデックスが存在する", () => {
      const db = getDatabase();
      const indexes = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_merges_status'"
        )
        .all() as { name: string }[];

      expect(indexes.length).toBe(1);
    });

    it("プロジェクトIDインデックスが存在する", () => {
      const db = getDatabase();
      const indexes = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_merges_project_id'"
        )
        .all() as { name: string }[];

      expect(indexes.length).toBe(1);
    });

    it("作成日時インデックスが存在する", () => {
      const db = getDatabase();
      const indexes = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_merges_created_at'"
        )
        .all() as { name: string }[];

      expect(indexes.length).toBe(1);
    });

    it("セッションIDインデックスが存在する", () => {
      const db = getDatabase();
      const indexes = db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_merge_sessions_session_id'"
        )
        .all() as { name: string }[];

      expect(indexes.length).toBe(1);
    });
  });
});
