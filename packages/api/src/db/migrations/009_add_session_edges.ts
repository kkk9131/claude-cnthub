/**
 * Migration 009: session_edges テーブル作成
 *
 * UIでのノード接続情報を保存し、コンテキスト注入に使用
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 9,
  name: "add_session_edges",

  up(db: Database): void {
    db.exec(`
      CREATE TABLE IF NOT EXISTS session_edges (
        edge_id TEXT PRIMARY KEY,
        source_session_id TEXT NOT NULL,
        target_claude_session_id TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (source_session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
      )
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_edges_target ON session_edges(target_claude_session_id)
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_edges_source ON session_edges(source_session_id)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS session_edges");
  },
};
