/**
 * マイグレーション 004: Embedding テーブル作成
 *
 * sqlite-vec を使用したベクトル検索機能のためのテーブルを作成。
 * - vec_embeddings: ベクトルデータ格納（sqlite-vec 仮想テーブル）
 * - embedding_index: ベクトルとソースのマッピング
 *
 * 注意: sqlite-vec はファイルベースのDBでのみ動作。
 * インメモリDB（テスト環境）では動的拡張のロードがサポートされない。
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

/**
 * sqlite-vec の動的ロードを試行
 * 失敗した場合（テスト環境など）は false を返す
 */
function tryLoadSqliteVec(db: Database): boolean {
  try {
    // 動的インポート（ロード失敗時にキャッチ可能）
    const sqliteVec = require("sqlite-vec");
    sqliteVec.load(db);
    return true;
  } catch {
    console.warn(
      "[Migration 4] sqlite-vec extension not available. Vector search disabled."
    );
    return false;
  }
}

export const migration: Migration = {
  version: 4,
  name: "create_embeddings",

  up(db: Database) {
    // sqlite-vec 拡張をロード（失敗してもマイグレーションは続行）
    const vecAvailable = tryLoadSqliteVec(db);

    if (vecAvailable) {
      // ベクトル格納用テーブル（sqlite-vec 仮想テーブル）
      // Voyage AI voyage-3.5 は 1024 次元
      db.exec(`
        CREATE VIRTUAL TABLE IF NOT EXISTS vec_embeddings USING vec0(
          embedding float[1024]
        )
      `);
    }

    // ベクトルとソースのマッピングテーブル（常に作成）
    db.exec(`
      CREATE TABLE IF NOT EXISTS embedding_index (
        embedding_id INTEGER PRIMARY KEY,
        source_type TEXT NOT NULL CHECK (source_type IN ('summary', 'message', 'work_item')),
        source_id TEXT NOT NULL,
        session_id TEXT REFERENCES sessions(session_id) ON DELETE CASCADE,
        content_preview TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // インデックス作成
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_embedding_source
      ON embedding_index(source_type, source_id)
    `);
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_embedding_session
      ON embedding_index(session_id)
    `);
  },

  down(db: Database) {
    db.exec("DROP TABLE IF EXISTS embedding_index");
    // vec_embeddings は存在する場合のみ削除
    try {
      db.exec("DROP TABLE IF EXISTS vec_embeddings");
    } catch {
      // テーブルが存在しない場合は無視
    }
  },
};
