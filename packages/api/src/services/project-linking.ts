/**
 * プロジェクト自動紐付けサービス
 *
 * セッション作成時に cwd（作業ディレクトリ）からプロジェクトを自動判定する
 *
 * 判定ロジック:
 * 1. cwd が既存プロジェクトの rootPath に完全一致 → そのプロジェクトに紐付け
 * 2. cwd が既存プロジェクトの rootPath のサブディレクトリ → そのプロジェクトに紐付け
 *    - 複数マッチした場合は、最も長いパス（より具体的なプロジェクト）を優先
 * 3. マッチなし → 新規プロジェクト作成（autoCreate オプション）
 */

import type { Project } from "@claude-cnthub/shared";
import { query } from "../db";
import { rowToEntity } from "../repositories/base";
import { createProject, getProjectByPath } from "../repositories/project";

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

/**
 * パスからプロジェクト名を抽出
 *
 * @param workingDir 作業ディレクトリ
 * @returns プロジェクト名
 */
function extractProjectName(workingDir: string): string {
  const parts = workingDir.split(/[/\\]/).filter(Boolean);
  return parts[parts.length - 1] || "Unknown Project";
}

/**
 * 作業ディレクトリからプロジェクトを取得または作成
 *
 * @param workingDir 作業ディレクトリ（cwd）
 * @param options.autoCreate マッチなしの場合に自動作成するか（デフォルト: true）
 * @returns プロジェクト、または null
 */
export function findOrCreateProjectByWorkingDir(
  workingDir: string,
  options: { autoCreate?: boolean } = {}
): Project | null {
  const { autoCreate = true } = options;

  if (!workingDir || workingDir.trim() === "") {
    return null;
  }

  // 1. 既存プロジェクトを検索
  const existing = findProjectByWorkingDir(workingDir);
  if (existing) {
    return existing;
  }

  // 2. 自動作成が無効の場合は null
  if (!autoCreate) {
    return null;
  }

  // 3. 完全一致するプロジェクトがあるかチェック（重複防止）
  const normalizedPath = normalizePath(workingDir);
  const exactMatch = getProjectByPath(normalizedPath);
  if (exactMatch) {
    return exactMatch;
  }

  // 4. 新規プロジェクト作成
  try {
    const name = extractProjectName(workingDir);
    return createProject({
      name,
      path: normalizedPath,
    });
  } catch {
    // プロジェクト作成に失敗しても、セッションは作成可能にする
    return null;
  }
}
