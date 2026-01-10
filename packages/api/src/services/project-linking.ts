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
 *    - ただし、ホームディレクトリ直下やシステムディレクトリは自動作成しない
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
 * プロジェクト自動作成をスキップすべきパスかどうかを判定
 *
 * 以下のパスはプロジェクトとして不適切なため自動作成しない:
 * - ルートディレクトリ (/)
 * - ホームディレクトリ直下 (/Users/*, /home/*)
 * - 一時ディレクトリ (/tmp, /var/tmp, etc.)
 * - システムディレクトリ (/usr, /etc, /var, etc.)
 *
 * @param path 判定するパス
 * @returns スキップすべき場合は true
 */
function shouldSkipAutoCreate(path: string): boolean {
  const normalized = normalizePath(path);
  if (!normalized) return true;

  // パスを分割
  const parts = normalized.split("/").filter(Boolean);

  // ルートディレクトリ
  if (parts.length === 0) return true;

  // 1階層目のみのパス（/Users, /home, /tmp など）
  if (parts.length === 1) return true;

  // ホームディレクトリ直下 (/Users/username, /home/username)
  if (parts.length === 2 && (parts[0] === "Users" || parts[0] === "home")) {
    return true;
  }

  // 一時ディレクトリ
  if (parts[0] === "tmp" || (parts[0] === "var" && parts[1] === "tmp")) {
    return true;
  }

  // システムディレクトリ
  const systemDirs = ["usr", "etc", "bin", "sbin", "lib", "opt"];
  if (systemDirs.includes(parts[0])) {
    return true;
  }

  return false;
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

  // 4. 自動作成をスキップすべきパスかチェック
  if (shouldSkipAutoCreate(normalizedPath)) {
    return null;
  }

  // 5. 新規プロジェクト作成
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
