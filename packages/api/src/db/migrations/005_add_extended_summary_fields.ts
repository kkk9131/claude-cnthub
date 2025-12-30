/**
 * Migration 005: Add extended summary fields
 *
 * Phase 6 段階的開示システム用の拡張フィールドを追加。
 * - changes: 変更差分の詳細
 * - errors: エラー履歴
 * - decisions: 構造化された決定事項
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 5,
  name: "add_extended_summary_fields",

  up(db: Database): void {
    // 拡張フィールドを追加（JSON形式で保存）
    db.exec(`
      ALTER TABLE summaries ADD COLUMN changes TEXT NOT NULL DEFAULT '[]'
    `);

    db.exec(`
      ALTER TABLE summaries ADD COLUMN errors TEXT NOT NULL DEFAULT '[]'
    `);

    db.exec(`
      ALTER TABLE summaries ADD COLUMN decisions TEXT NOT NULL DEFAULT '[]'
    `);
  },

  down(db: Database): void {
    // SQLite では ALTER TABLE DROP COLUMN がサポートされていないため、
    // 新しいテーブルを作成してデータを移行する必要があるが、
    // ダウングレードは基本的に行わないため省略
    console.warn(
      "Migration 005 down: SQLite does not support DROP COLUMN. Skipping."
    );
  },
};
