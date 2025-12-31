/**
 * マイグレーション 008: ローカル Embedding テーブル追加
 *
 * ローカルモデル (all-MiniLM-L6-v2) 用の 384 次元ベクトルテーブルを追加。
 * - vec_embeddings_local: 384 次元ベクトル格納
 * - embedding_index に dimension カラムを追加
 */

import type { Database } from "bun:sqlite";
import type { Migration } from "./index";

/**
 * sqlite-vec の動的ロードを試行
 */
function tryLoadSqliteVec(db: Database): boolean {
  try {
    const sqliteVec = require("sqlite-vec");
    sqliteVec.load(db);
    return true;
  } catch {
    console.warn(
      "[Migration 8] sqlite-vec extension not available. Vector search disabled."
    );
    return false;
  }
}

export const migration: Migration = {
  version: 8,
  name: "add_local_embeddings",

  up(db: Database) {
    // sqlite-vec 拡張をロード
    const vecAvailable = tryLoadSqliteVec(db);

    if (vecAvailable) {
      // ローカルモデル用ベクトルテーブル (384 次元)
      db.exec(`
        CREATE VIRTUAL TABLE IF NOT EXISTS vec_embeddings_local USING vec0(
          embedding float[384]
        )
      `);
    }

    // embedding_index に dimension カラムを追加
    // SQLite では ALTER TABLE ADD COLUMN のみサポート
    try {
      db.exec(`
        ALTER TABLE embedding_index ADD COLUMN dimension INTEGER DEFAULT 1024
      `);
    } catch (error: any) {
      // カラムが既に存在する場合は無視
      if (!error.message?.includes("duplicate column")) {
        throw error;
      }
    }

    // provider カラムも追加
    try {
      db.exec(`
        ALTER TABLE embedding_index ADD COLUMN provider TEXT DEFAULT 'voyage'
      `);
    } catch (error: any) {
      if (!error.message?.includes("duplicate column")) {
        throw error;
      }
    }
  },

  down(db: Database) {
    // ローカル用テーブルを削除
    try {
      db.exec("DROP TABLE IF EXISTS vec_embeddings_local");
    } catch {
      // テーブルが存在しない場合は無視
    }
    // 注意: SQLite では ALTER TABLE DROP COLUMN は制限があるため、
    // dimension と provider カラムは残る
  },
};
