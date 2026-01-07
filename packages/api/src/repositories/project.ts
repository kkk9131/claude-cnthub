/**
 * プロジェクトリポジトリ
 *
 * projects テーブルへのCRUD操作を提供
 */

import type { Project } from "@claude-cnthub/shared";
import { query, queryOne, execute } from "../db";
import {
  now,
  calculatePagination,
  rowToEntity,
  type PaginationOptions,
  type PaginatedResult,
} from "./base";
import { AppError, ErrorCode } from "../middleware/error-handler";

/**
 * プロジェクトパスのバリデーション
 *
 * パストラバーサル攻撃を防止
 */
function validateProjectPath(path: string): void {
  // パストラバーサル防止
  if (path.includes("..")) {
    throw new AppError(
      ErrorCode.VALIDATION_ERROR,
      "Path cannot contain '..'",
      400
    );
  }

  // 空パス防止
  if (!path || path.trim().length === 0) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, "Path cannot be empty", 400);
  }

  // 不正な文字を防止（英数字、ハイフン、アンダースコア、スラッシュ、ドット、チルダのみ許可）
  if (!/^[a-zA-Z0-9\-_./~]+$/.test(path)) {
    throw new AppError(
      ErrorCode.VALIDATION_ERROR,
      "Path contains invalid characters",
      400
    );
  }
}

/**
 * プロジェクトID生成
 *
 * 形式: ch_pj_XXXX（4桁のシーケンシャルID）
 */
function generateProjectId(): string {
  // 現在の最大IDを取得
  const result = queryOne<{ maxId: string | null }>(
    "SELECT MAX(project_id) as maxId FROM projects"
  );

  let nextNumber = 1;
  if (result?.maxId) {
    // ch_pj_0001 形式から数値を抽出
    const match = result.maxId.match(/ch_pj_(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `ch_pj_${String(nextNumber).padStart(4, "0")}`;
}

/**
 * プロジェクト作成データ
 */
interface CreateProjectData {
  name: string;
  path: string;
  description?: string;
}

/**
 * プロジェクト更新データ
 */
interface UpdateProjectData {
  name?: string;
  description?: string | null;
}

/**
 * プロジェクト一覧取得オプション
 */
interface ListProjectsOptions extends PaginationOptions {}

/**
 * DBレコードからProjectエンティティへ変換
 */
function toProject(row: Record<string, unknown>): Project {
  return rowToEntity<Project>(row, ["created_at", "updated_at"]);
}

/**
 * プロジェクトを作成
 */
export function createProject(data: CreateProjectData): Project {
  try {
    // パスバリデーション（パストラバーサル対策）
    validateProjectPath(data.path);

    // パスの重複チェック
    const existing = queryOne<Record<string, unknown>>(
      "SELECT project_id FROM projects WHERE path = ?",
      data.path
    );

    if (existing) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        "Project with this path already exists",
        409
      );
    }

    const projectId = generateProjectId();
    const timestamp = now();
    const description = data.description ?? null;

    execute(
      `INSERT INTO projects (
        project_id, name, path, description,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      projectId,
      data.name,
      data.path,
      description,
      timestamp,
      timestamp
    );

    // N+1クエリ回避: INSERT済みデータから直接Projectを構築
    return {
      projectId,
      name: data.name,
      path: data.path,
      description: description ?? undefined,
      createdAt: new Date(timestamp),
      updatedAt: new Date(timestamp),
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to create project: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * プロジェクトをIDで取得
 */
export function getProjectById(projectId: string): Project | null {
  try {
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM projects WHERE project_id = ?",
      projectId
    );

    return row ? toProject(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get project: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * プロジェクト一覧を取得
 */
export function listProjects(
  options: ListProjectsOptions = {}
): PaginatedResult<Project> {
  try {
    const { page = 1, limit = 20 } = options;

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      "SELECT COUNT(*) as count FROM projects"
    );
    const total = countResult?.count ?? 0;

    // データ取得
    const offset = (page - 1) * limit;
    const rows = query<Record<string, unknown>>(
      "SELECT * FROM projects ORDER BY updated_at DESC LIMIT ? OFFSET ?",
      limit,
      offset
    );

    return {
      items: rows.map(toProject),
      pagination: calculatePagination(total, page, limit),
    };
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to list projects: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * プロジェクトを更新
 */
export function updateProject(
  projectId: string,
  data: UpdateProjectData
): Project | null {
  try {
    const fields: string[] = [];
    const params: (string | number | null)[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      params.push(data.name);
    }

    if (data.description !== undefined) {
      fields.push("description = ?");
      params.push(data.description);
    }

    // 更新フィールドがない場合は現在のプロジェクトを返す
    if (fields.length === 0) {
      return getProjectById(projectId);
    }

    fields.push("updated_at = ?");
    params.push(now());
    params.push(projectId);

    const result = execute(
      `UPDATE projects SET ${fields.join(", ")} WHERE project_id = ?`,
      ...params
    );

    // N+1クエリ回避: UPDATE結果で存在確認
    if (result.changes === 0) {
      return null;
    }

    // 更新後のデータを取得（1回のSELECTのみ）
    return getProjectById(projectId);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to update project: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * プロジェクトを削除
 */
export function deleteProject(projectId: string): boolean {
  try {
    const result = execute(
      "DELETE FROM projects WHERE project_id = ?",
      projectId
    );

    return result.changes > 0;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to delete project: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * パスでプロジェクトを取得
 */
export function getProjectByPath(path: string): Project | null {
  try {
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM projects WHERE path = ?",
      path
    );

    return row ? toProject(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get project by path: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}
