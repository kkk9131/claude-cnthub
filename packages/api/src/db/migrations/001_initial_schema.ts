/**
 * Migration 001: Initial Schema
 *
 * 基盤テーブルの作成:
 * - projects: プロジェクト管理
 * - work_items: タスク管理
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 1,
  name: "initial_schema",

  up(db: Database): void {
    // プロジェクトテーブル
    db.exec(`
      CREATE TABLE projects (
        project_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        path TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    db.exec(`
      CREATE INDEX idx_projects_path ON projects(path)
    `);

    // Work Items テーブル
    db.exec(`
      CREATE TABLE work_items (
        work_item_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'planning'
          CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'blocked')),
        project_id TEXT REFERENCES projects(project_id) ON DELETE SET NULL,
        tags TEXT DEFAULT '[]',
        priority INTEGER DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    db.exec(`
      CREATE INDEX idx_work_items_project ON work_items(project_id)
    `);

    db.exec(`
      CREATE INDEX idx_work_items_status ON work_items(status)
    `);
  },

  down(db: Database): void {
    db.exec("DROP TABLE IF EXISTS work_items");
    db.exec("DROP TABLE IF EXISTS projects");
  },
};
