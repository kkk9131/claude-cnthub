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
 * MacOS用カスタムSQLiteライブラリの設定
 *
 * MacOSの組み込みSQLiteは拡張機能をサポートしないため、
 * Homebrewでインストールされたsqlite3を使用する。
 * これにより sqlite-vec 拡張が動作可能になる。
 */
function setupCustomSQLiteForMacOS(): void {
  if (process.platform !== "darwin") return;

  const customSqlitePaths = [
    "/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib", // Apple Silicon
    "/usr/local/opt/sqlite3/lib/libsqlite3.dylib", // Intel Mac
    "/usr/local/opt/sqlite/lib/libsqlite3.dylib", // 別名
  ];

  for (const path of customSqlitePaths) {
    try {
      const file = Bun.file(path);
      if (file.size > 0) {
        Database.setCustomSQLite(path);
        console.log(`[DB] Using custom SQLite: ${path}`);
        return;
      }
    } catch {
      // ファイルが存在しない場合は次を試す
    }
  }

  console.warn(
    "[DB] Custom SQLite not found. sqlite-vec may not work on MacOS.\n" +
      "     Install with: brew install sqlite3"
  );
}

// MacOS用の設定を初期化時に実行
setupCustomSQLiteForMacOS();

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
import { migration as migration007 } from "./migrations/007_create_observations";
import { migration as migration008 } from "./migrations/008_add_local_embeddings";
import { migration as migration009 } from "./migrations/009_add_session_edges";
import { migration as migration010 } from "./migrations/010_add_token_counts";
import { migration as migration011 } from "./migrations/011_add_session_classification";
import { migration as migration012 } from "./migrations/012_add_session_fork";

// 全マイグレーションリスト
const allMigrations = [
  migration001,
  migration002,
  migration003,
  migration004,
  migration005,
  migration006,
  migration007,
  migration008,
  migration009,
  migration010,
  migration011,
  migration012,
];

/**
 * 全マイグレーションを実行
 */
export function runMigrations(): void {
  console.log("Running database migrations...");
  migrate(allMigrations);
  console.log("Migrations completed.");
}
