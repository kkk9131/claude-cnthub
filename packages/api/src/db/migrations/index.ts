/**
 * マイグレーションシステム
 *
 * SQLiteデータベースのスキーマ管理を行う。
 * バージョン管理テーブルを使用して適用済みマイグレーションを追跡。
 */

import type { Database } from "bun:sqlite";
import { getDatabase } from "../index";

/**
 * マイグレーション定義
 */
export interface Migration {
  /** マイグレーションバージョン（連番） */
  version: number;
  /** マイグレーション名 */
  name: string;
  /** 適用処理 */
  up(db: Database): void;
  /** ロールバック処理 */
  down(db: Database): void;
}

/**
 * マイグレーションテーブルを作成
 */
function ensureMigrationsTable(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

/**
 * 適用済みバージョンを取得
 */
function getAppliedVersions(db: Database): number[] {
  const rows = db
    .prepare("SELECT version FROM migrations ORDER BY version")
    .all() as { version: number }[];
  return rows.map((row) => row.version);
}

/**
 * マイグレーションを適用
 */
export function migrate(migrations: Migration[]): void {
  const db = getDatabase();
  ensureMigrationsTable(db);

  const appliedVersions = new Set(getAppliedVersions(db));

  // バージョン順にソート
  const sortedMigrations = [...migrations].sort(
    (a, b) => a.version - b.version
  );

  for (const migration of sortedMigrations) {
    if (appliedVersions.has(migration.version)) {
      continue;
    }

    console.log(`Applying migration ${migration.version}: ${migration.name}`);

    try {
      db.exec("BEGIN TRANSACTION");
      migration.up(db);
      db.prepare("INSERT INTO migrations (version, name) VALUES (?, ?)").run(
        migration.version,
        migration.name
      );
      db.exec("COMMIT");
      console.log(`Migration ${migration.version} applied successfully`);
    } catch (error) {
      db.exec("ROLLBACK");
      throw new Error(
        `Migration ${migration.version} failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

/**
 * 指定バージョンまでロールバック
 */
export function rollback(migrations: Migration[], targetVersion: number): void {
  const db = getDatabase();
  ensureMigrationsTable(db);

  const appliedVersions = getAppliedVersions(db);

  // 降順でロールバック
  const sortedMigrations = [...migrations]
    .filter(
      (m) => m.version > targetVersion && appliedVersions.includes(m.version)
    )
    .sort((a, b) => b.version - a.version);

  for (const migration of sortedMigrations) {
    console.log(
      `Rolling back migration ${migration.version}: ${migration.name}`
    );

    try {
      db.exec("BEGIN TRANSACTION");
      migration.down(db);
      db.prepare("DELETE FROM migrations WHERE version = ?").run(
        migration.version
      );
      db.exec("COMMIT");
      console.log(`Migration ${migration.version} rolled back successfully`);
    } catch (error) {
      db.exec("ROLLBACK");
      throw new Error(
        `Rollback of migration ${migration.version} failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

/**
 * 現在のマイグレーション状態を取得
 */
export function getStatus(): {
  version: number;
  name: string;
  appliedAt: string;
}[] {
  const db = getDatabase();
  ensureMigrationsTable(db);

  return db
    .prepare(
      "SELECT version, name, applied_at as appliedAt FROM migrations ORDER BY version"
    )
    .all() as { version: number; name: string; appliedAt: string }[];
}
