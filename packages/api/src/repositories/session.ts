/**
 * セッションリポジトリ
 *
 * sessions テーブルへのCRUD操作を提供
 */

import type { Session, SessionStatus } from "@claude-cnthub/shared";
import { query, queryOne, execute } from "../db";
import {
  generateId,
  now,
  calculatePagination,
  rowToEntity,
  type PaginationOptions,
  type PaginatedResult,
} from "./base";
import { AppError, ErrorCode } from "../middleware/error-handler";

/**
 * セッション作成データ
 */
interface CreateSessionData {
  name: string;
  workingDir: string;
  task?: string;
  workItemId?: string;
  projectId?: string;
  continueChat?: boolean;
  dangerouslySkipPermissions?: boolean;
}

/**
 * セッション更新データ
 */
interface UpdateSessionData {
  name?: string;
  task?: string;
  status?: SessionStatus;
  claudeSessionId?: string;
  workItemId?: string | null;
  projectId?: string | null;
  error?: string | null;
}

/**
 * セッション一覧取得オプション
 */
interface ListSessionsOptions extends PaginationOptions {
  status?: SessionStatus;
  projectId?: string;
  workItemId?: string;
  includeDeleted?: boolean;
}

/**
 * DBレコードからSessionエンティティへ変換
 */
function toSession(row: Record<string, unknown>): Session {
  return rowToEntity<Session>(row, ["created_at", "updated_at", "deleted_at"]);
}

/**
 * セッションを作成
 */
export function createSession(data: CreateSessionData): Session {
  try {
    const sessionId = generateId("sess");
    const timestamp = now();

    execute(
      `INSERT INTO sessions (
        session_id, name, working_dir, task, status,
        work_item_id, project_id, continue_chat, dangerously_skip_permissions,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'idle', ?, ?, ?, ?, ?, ?)`,
      sessionId,
      data.name,
      data.workingDir,
      data.task ?? null,
      data.workItemId ?? null,
      data.projectId ?? null,
      data.continueChat ? 1 : 0,
      data.dangerouslySkipPermissions ? 1 : 0,
      timestamp,
      timestamp
    );

    return getSessionById(sessionId)!;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to create session: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションをIDで取得
 */
export function getSession(sessionId: string): Session | null {
  return getSessionById(sessionId);
}

/**
 * セッションをIDで取得（内部用）
 */
export function getSessionById(sessionId: string): Session | null {
  try {
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM sessions WHERE session_id = ?",
      sessionId
    );

    return row ? toSession(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get session: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッション一覧を取得
 */
export function listSessions(
  options: ListSessionsOptions = {}
): PaginatedResult<Session> {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      projectId,
      workItemId,
      includeDeleted = false,
    } = options;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (!includeDeleted) {
      conditions.push("deleted_at IS NULL");
    }

    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }

    if (projectId) {
      conditions.push("project_id = ?");
      params.push(projectId);
    }

    if (workItemId) {
      conditions.push("work_item_id = ?");
      params.push(workItemId);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM sessions ${whereClause}`,
      ...params
    );
    const total = countResult?.count ?? 0;

    // データ取得
    const offset = (page - 1) * limit;
    const rows = query<Record<string, unknown>>(
      `SELECT * FROM sessions ${whereClause} ORDER BY updated_at DESC LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset
    );

    return {
      items: rows.map(toSession),
      pagination: calculatePagination(total, page, limit),
    };
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to list sessions: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションを更新
 */
export function updateSession(
  sessionId: string,
  data: UpdateSessionData
): Session | null {
  try {
    const fields: string[] = [];
    const params: (string | number | null)[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      params.push(data.name);
    }

    if (data.task !== undefined) {
      fields.push("task = ?");
      params.push(data.task);
    }

    if (data.status !== undefined) {
      fields.push("status = ?");
      params.push(data.status);
    }

    if (data.claudeSessionId !== undefined) {
      fields.push("claude_session_id = ?");
      params.push(data.claudeSessionId);
    }

    if (data.workItemId !== undefined) {
      fields.push("work_item_id = ?");
      params.push(data.workItemId);
    }

    if (data.projectId !== undefined) {
      fields.push("project_id = ?");
      params.push(data.projectId);
    }

    if (data.error !== undefined) {
      fields.push("error = ?");
      params.push(data.error);
    }

    if (fields.length === 0) {
      return getSessionById(sessionId);
    }

    fields.push("updated_at = ?");
    params.push(now());
    params.push(sessionId);

    execute(
      `UPDATE sessions SET ${fields.join(", ")} WHERE session_id = ?`,
      ...params
    );

    return getSessionById(sessionId);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to update session: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションを論理削除
 */
export function deleteSession(sessionId: string): boolean {
  try {
    const result = execute(
      "UPDATE sessions SET deleted_at = ?, updated_at = ? WHERE session_id = ? AND deleted_at IS NULL",
      now(),
      now(),
      sessionId
    );

    return result.changes > 0;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to delete session: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションを物理削除（テスト用）
 */
export function hardDeleteSession(sessionId: string): boolean {
  try {
    const result = execute(
      "DELETE FROM sessions WHERE session_id = ?",
      sessionId
    );

    return result.changes > 0;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to hard delete session: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}
