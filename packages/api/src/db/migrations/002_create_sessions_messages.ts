/**
 * Migration 002: Create Sessions and Messages
 *
 * セッションとメッセージの管理テーブル:
 * - sessions: Claude Code セッション
 * - messages: セッション内のメッセージ
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 2,
  name: "create_sessions_messages",

  up(db: Database): void {
    // セッションテーブル
    db.exec(`
      CREATE TABLE sessions (
        session_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        working_dir TEXT NOT NULL,
        task TEXT,
        status TEXT NOT NULL DEFAULT 'idle'
          CHECK (status IN ('idle', 'processing', 'completed', 'error')),
        claude_session_id TEXT,
        work_item_id TEXT REFERENCES work_items(work_item_id) ON DELETE SET NULL,
        project_id TEXT REFERENCES projects(project_id) ON DELETE SET NULL,
        continue_chat INTEGER DEFAULT 0,
        dangerously_skip_permissions INTEGER DEFAULT 0,
        error TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        deleted_at TEXT
      )
    `);

    db.exec(`
      CREATE INDEX idx_sessions_status ON sessions(status)
    `);

    db.exec(`
      CREATE INDEX idx_sessions_work_item ON sessions(work_item_id)
    `);

    db.exec(`
      CREATE INDEX idx_sessions_project ON sessions(project_id)
    `);

    db.exec(`
      CREATE INDEX idx_sessions_created ON sessions(created_at)
    `);

    // メッセージテーブル
    db.exec(`
      CREATE TABLE messages (
        message_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        type TEXT NOT NULL
          CHECK (type IN ('user', 'assistant', 'system', 'tool_use', 'tool_result', 'thinking', 'error')),
        content TEXT NOT NULL,
        compressed INTEGER DEFAULT 0,
        original_size INTEGER,
        compressed_size INTEGER,
        metadata TEXT,
        timestamp TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    db.exec(`
      CREATE INDEX idx_messages_session ON messages(session_id)
    `);

    db.exec(`
      CREATE INDEX idx_messages_timestamp ON messages(timestamp)
    `);

    db.exec(`
      CREATE INDEX idx_messages_type ON messages(type)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS messages");
    db.exec("DROP TABLE IF EXISTS sessions");
  },
};
