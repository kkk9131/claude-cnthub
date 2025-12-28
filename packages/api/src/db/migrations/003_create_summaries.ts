/**
 * Migration 003: Create summaries table
 *
 * セッション要約を保存するテーブル。
 * AI生成の短縮・詳細要約、抽出されたメタデータを格納。
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 3,
  name: "create_summaries",

  up(db: Database): void {
    db.exec(`
      CREATE TABLE summaries (
        summary_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL UNIQUE,
        short_summary TEXT NOT NULL,
        detailed_summary TEXT NOT NULL,
        key_decisions TEXT NOT NULL DEFAULT '[]',
        files_modified TEXT NOT NULL DEFAULT '[]',
        tools_used TEXT NOT NULL DEFAULT '[]',
        topics TEXT NOT NULL DEFAULT '[]',
        original_token_count INTEGER NOT NULL DEFAULT 0,
        summary_token_count INTEGER NOT NULL DEFAULT 0,
        compression_ratio REAL NOT NULL DEFAULT 0.0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE
      )
    `);

    // セッションIDで高速検索（1:1リレーション）
    db.exec(`
      CREATE UNIQUE INDEX idx_summaries_session_id ON summaries(session_id)
    `);

    // 作成日時でソート
    db.exec(`
      CREATE INDEX idx_summaries_created_at ON summaries(created_at)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS summaries");
  },
};
