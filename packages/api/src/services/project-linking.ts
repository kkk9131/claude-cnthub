/**
 * プロジェクト自動紐付けサービス
 *
 * セッション作成時に cwd（作業ディレクトリ）からプロジェクトを自動判定する
 *
 * 判定ロジック:
 * 1. cwd が既存プロジェクトの rootPath に完全一致 → そのプロジェクトに紐付け
 * 2. cwd が既存プロジェクトの rootPath のサブディレクトリ → そのプロジェクトに紐付け
 *    - 複数マッチした場合は、最も長いパス（より具体的なプロジェクト）を優先
 * 3. マッチなし → null（プロジェクト紐付けなし）
 */

import type { Project } from "@claude-cnthub/shared";
import { query } from "../db";
import { rowToEntity } from "../repositories/base";

/**
 * DBレコードからProjectエンティティへ変換
 */
function toProject(row: Record<string, unknown>): Project {
  return rowToEntity<Project>(row, ["created_at", "updated_at"]);
}

/**
 * パスを正規化（末尾のスラッシュを除去）
 */
function normalizePath(path: string): string {
  if (!path) return "";
  // 末尾のスラッシュを除去（ルート '/' の場合は除く）
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * cwd が projectPath のサブディレクトリかどうかを判定
 *
 * @param cwd 作業ディレクトリ
 * @param projectPath プロジェクトのパス
 * @returns サブディレクトリの場合は true
 */
function isSubdirectoryOf(cwd: string, projectPath: string): boolean {
  const normalizedCwd = normalizePath(cwd);
  const normalizedProjectPath = normalizePath(projectPath);

  if (!normalizedCwd || !normalizedProjectPath) {
    return false;
  }

  // 完全一致の場合
  if (normalizedCwd === normalizedProjectPath) {
    return true;
  }

  // cwdがprojectPathのサブディレクトリかチェック
  // projectPath + "/" で始まることを確認
  // これにより、"/path/to/project-extra" が "/path/to/project" にマッチしないことを保証
  return normalizedCwd.startsWith(normalizedProjectPath + "/");
}

/**
 * 作業ディレクトリからプロジェクトを自動判定
 *
 * @param workingDir 作業ディレクトリ（cwd）
 * @returns マッチしたプロジェクト、またはマッチなしの場合は null
 */
export function findProjectByWorkingDir(workingDir: string): Project | null {
  if (!workingDir || workingDir.trim() === "") {
    return null;
  }

  // 全プロジェクトを取得
  const rows = query<Record<string, unknown>>(
    "SELECT * FROM projects ORDER BY LENGTH(path) DESC"
  );

  const projects = rows.map(toProject);

  // マッチするプロジェクトを検索
  // パスの長さでソート済みなので、最初にマッチしたものが最も具体的
  for (const project of projects) {
    if (isSubdirectoryOf(workingDir, project.path)) {
      return project;
    }
  }

  return null;
}
