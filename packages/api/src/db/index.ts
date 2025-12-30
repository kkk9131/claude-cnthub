/**
 * データベース接続とクエリユーティリティ
 *
 * SQLiteデータベースへの接続と基本的なクエリ操作を提供
 */

import { Database } from "bun:sqlite";

// データベースパス（環境変数またはデフォルト）
const DB_PATH = process.env.DATABASE_PATH || ":memory:";

// データベース接続（遅延初期化）
let db: Database | null = null;

/**
 * データベース接続を取得
 */
export function getDatabase(): Database {
  if (!db) {
    db = new Database(DB_PATH);
    // WALモードを有効化（パフォーマンス向上）
    db.run("PRAGMA journal_mode = WAL");
  }
  return db;
}

/**
 * SQLクエリのバインディング型
 */
export type SQLQueryBindings = string | number | boolean | null | Uint8Array;

/**
 * SELECT クエリを実行（複数行）
 */
export function query<T>(sql: string, ...params: SQLQueryBindings[]): T[] {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  return stmt.all(...params) as T[];
}

/**
 * SELECT クエリを実行（単一行）
 */
export function queryOne<T>(
  sql: string,
  ...params: SQLQueryBindings[]
): T | null {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  return (stmt.get(...params) as T) ?? null;
}

/**
 * INSERT / UPDATE / DELETE を実行
 */
export function execute(
  sql: string,
  ...params: SQLQueryBindings[]
): { changes: number; lastInsertRowid: number } {
  const database = getDatabase();
  const stmt = database.prepare(sql);
  const result = stmt.run(...params);
  return {
    changes: result.changes,
    lastInsertRowid: Number(result.lastInsertRowid),
  };
}

/**
 * データベース接続をクローズ
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}

/**
 * テスト用: データベースをリセット
 */
export function resetDatabase(): void {
  closeDatabase();
  db = new Database(":memory:");
}

// マイグレーション関連
import { migrate } from "./migrations";
import { migration as migration001 } from "./migrations/001_initial_schema";
import { migration as migration002 } from "./migrations/002_create_sessions_messages";
import { migration as migration003 } from "./migrations/003_create_summaries";
import { migration as migration004 } from "./migrations/004_create_embeddings";
import { migration as migration005 } from "./migrations/005_add_extended_summary_fields";
import { migration as migration006 } from "./migrations/006_create_merges";

// 全マイグレーションリスト
const allMigrations = [
  migration001,
  migration002,
  migration003,
  migration004,
  migration005,
  migration006,
];

/**
 * 全マイグレーションを実行
 */
export function runMigrations(): void {
  console.log("Running database migrations...");
  migrate(allMigrations);
  console.log("Migrations completed.");
}
