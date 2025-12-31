/**
 * Migration 007: observations テーブル作成
 *
 * セッション中の観測記録（ツール使用、決定事項、エラー等）を保存
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 7,
  name: "create_observations",

  up(db: Database): void {
    db.exec(`
      CREATE TABLE IF NOT EXISTS observations (
        observation_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        type TEXT NOT NULL CHECK (type IN ('tool_use', 'decision', 'error', 'learning', 'note', 'file_change')),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        metadata TEXT,
        created_at TEXT NOT NULL
      )
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_observations_session ON observations(session_id)
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_observations_type ON observations(type)
    `);

    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_observations_created ON observations(created_at)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS observations");
  },
};
