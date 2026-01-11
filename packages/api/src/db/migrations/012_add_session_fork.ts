/**
 * Migration 012: Add session fork columns
 *
 * セッション分岐機能のためのカラムを追加:
 * - parent_session_id: 分岐元セッションID
 * - fork_point: 分岐時点のメッセージインデックス
 * - worktree_path: git worktree パス
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 12,
  name: "add_session_fork",

  up(db: Database): void {
    // parent_session_id カラム追加（分岐元セッションID）
    db.exec(`
      ALTER TABLE sessions ADD COLUMN parent_session_id TEXT DEFAULT NULL
        REFERENCES sessions(session_id) ON DELETE SET NULL
    `);

    // fork_point カラム追加（分岐時点のメッセージインデックス）
    db.exec(`
      ALTER TABLE sessions ADD COLUMN fork_point INTEGER DEFAULT NULL
    `);

    // worktree_path カラム追加（git worktree パス）
    db.exec(`
      ALTER TABLE sessions ADD COLUMN worktree_path TEXT DEFAULT NULL
    `);

    // parent_session_id のインデックス作成
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_sessions_parent ON sessions(parent_session_id)
    `);
  },

  down(db: Database): void {
    // インデックス削除
    db.exec(`DROP INDEX IF EXISTS idx_sessions_parent`);

    console.warn(
      "SQLite does not support dropping columns. Manual migration required."
    );
  },
};
