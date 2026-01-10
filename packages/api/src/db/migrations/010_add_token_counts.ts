/**
 * Migration 010: Add token counts to sessions
 *
 * セッションにトークン数カラムを追加:
 * - input_tokens: 入力トークン数の累計
 * - output_tokens: 出力トークン数の累計
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

export const migration: Migration = {
  version: 10,
  name: "add_token_counts",

  up(db: Database): void {
    // input_tokens カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN input_tokens INTEGER DEFAULT 0
    `);

    // output_tokens カラム追加
    db.exec(`
      ALTER TABLE sessions ADD COLUMN output_tokens INTEGER DEFAULT 0
    `);
  },

  down(db: Database): void {
    // SQLiteではALTER TABLE DROP COLUMNがサポートされていないため、
    // テーブル再作成が必要だが、ここでは簡略化
    // 実際のロールバックでは新しいテーブルを作成してデータを移行する
    console.warn(
      "SQLite does not support dropping columns. Manual migration required."
    );
  },
};
