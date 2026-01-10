/**
 * Migration 011: Add session classification columns
 *
 * セッションに分類・品質管理カラムを追加:
 * - importance: 重要度 (high, medium, low)
 * - category: 分類カテゴリ (feature, bugfix, refactor, exploration, other)
 * - has_issues: 問題フラグ
 * - issue_type: 問題タイプ
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 11,
  name: "add_session_classification",

  up(db: Database): void {
    // importance カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN importance TEXT DEFAULT NULL
    `);

    // category カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN category TEXT DEFAULT NULL
    `);

    // has_issues カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN has_issues INTEGER DEFAULT 0
    `);

    // issue_type カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN issue_type TEXT DEFAULT NULL
    `);
  },

  down(db: Database): void {
    console.warn(
      "SQLite does not support dropping columns. Manual migration required."
    );
  },
};
