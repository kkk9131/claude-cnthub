/**
 * Migration 006: Create merges table
 *
 * 複数セッションのマージ結果を保存するテーブル。
 * 元セッションIDリストと統合要約を格納。
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 6,
  name: "create_merges",

  up(db: Database): void {
    db.exec(`
      CREATE TABLE merges (
        merge_id TEXT PRIMARY KEY,
        source_session_ids TEXT NOT NULL,
        result_summary TEXT NOT NULL DEFAULT '',
        result_detailed_summary TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'completed', 'error')),
        project_id TEXT,
        error TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL
      )
    `);

    // ステータスでフィルタリング用インデックス
    db.exec(`
      CREATE INDEX idx_merges_status ON merges(status)
    `);

    // プロジェクトIDで検索用インデックス
    db.exec(`
      CREATE INDEX idx_merges_project_id ON merges(project_id)
    `);

    // 作成日時でソート
    db.exec(`
      CREATE INDEX idx_merges_created_at ON merges(created_at)
    `);

    // マージとセッションの関連テーブル（多対多）
    db.exec(`
      CREATE TABLE merge_sessions (
        merge_id TEXT NOT NULL,
        session_id TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (merge_id, session_id),
        FOREIGN KEY (merge_id) REFERENCES merges(merge_id) ON DELETE CASCADE,
        FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
      )
    `);

    // セッションIDで逆引き検索用インデックス
    db.exec(`
      CREATE INDEX idx_merge_sessions_session_id ON merge_sessions(session_id)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS merge_sessions");
    db.exec("DROP TABLE IF EXISTS merges");
  },
};
