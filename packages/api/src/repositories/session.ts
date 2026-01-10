/**
 * セッションリポジトリ
 *
 * sessions テーブルへのCRUD操作を提供
 */

import type {
  Session,
  SessionStatus,
  SessionImportance,
  SessionCategory,
  SessionIssueType,
  SessionIndex,
  SessionIndexListResponse,
  ExtendedSessionSummary,
} from "@claude-cnthub/shared";
import { generateSequentialId, parseId } from "@claude-cnthub/shared";
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
  const entity = rowToEntity<Session>(row, [
    "created_at",
    "updated_at",
    "deleted_at",
  ]);
  // has_issues は INTEGER として保存されているので boolean に変換
  return {
    ...entity,
    hasIssues: (row.has_issues as number) === 1,
  };
}

/**
 * 次のセッション連番を取得
 *
 * 新ID体系(ch_ss_XXXX)と旧ID体系(sess-UUID)の両方をサポート
 * 新体系のIDから最大連番を取得し、次の連番を返す
 */
function getNextSessionSequence(): number {
  // 新ID体系のセッションのみを対象に最大連番を取得
  // ch_ss_XXXX = 10文字 (ch_ss_ = 6文字 + XXXX = 4文字)
  const result = queryOne<{ max_seq: number | null }>(
    `SELECT MAX(
      CAST(SUBSTR(session_id, 7) AS INTEGER)
    ) as max_seq
    FROM sessions
    WHERE session_id LIKE 'ch_ss_%'
      AND LENGTH(session_id) = 10`
  );

  const maxSeq = result?.max_seq ?? 0;
  return maxSeq + 1;
}

/**
 * セッションを作成
 */
export function createSession(data: CreateSessionData): Session {
  try {
    const nextSeq = getNextSessionSequence();
    const sessionId = generateSequentialId("SESSION", nextSeq);
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
 *
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で検索可能。
 * - ch_ss_ で始まる場合: session_id カラムで検索
 * - それ以外（UUID）: claude_session_id カラムで検索
 */
export function getSessionById(sessionId: string): Session | null {
  try {
    // ch_ss_ で始まる場合は session_id で検索
    if (sessionId.startsWith("ch_ss_")) {
      const row = queryOne<Record<string, unknown>>(
        "SELECT * FROM sessions WHERE session_id = ?",
        sessionId
      );
      return row ? toSession(row) : null;
    }

    // それ以外は claude_session_id として検索（UUID形式）
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM sessions WHERE claude_session_id = ?",
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
 * Claude Code セッション ID でセッションを取得
 *
 * Claude Code が提供する外部セッション ID で検索する
 */
export function getSessionByClaudeId(claudeSessionId: string): Session | null {
  try {
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM sessions WHERE claude_session_id = ?",
      claudeSessionId
    );

    return row ? toSession(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get session by Claude ID: ${error instanceof Error ? error.message : "Unknown error"}`,
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
 *
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で更新可能。
 */
export function updateSession(
  sessionId: string,
  data: UpdateSessionData
): Session | null {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return null;
    }
    const actualSessionId = existingSession.sessionId;

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
      return existingSession;
    }

    fields.push("updated_at = ?");
    params.push(now());
    params.push(actualSessionId);

    execute(
      `UPDATE sessions SET ${fields.join(", ")} WHERE session_id = ?`,
      ...params
    );

    return getSessionById(actualSessionId);
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
 *
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で削除可能。
 */
export function deleteSession(sessionId: string): boolean {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return false;
    }
    const actualSessionId = existingSession.sessionId;

    const result = execute(
      "UPDATE sessions SET deleted_at = ?, updated_at = ? WHERE session_id = ? AND deleted_at IS NULL",
      now(),
      now(),
      actualSessionId
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
 *
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で削除可能。
 */
export function hardDeleteSession(sessionId: string): boolean {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return false;
    }
    const actualSessionId = existingSession.sessionId;

    const result = execute(
      "DELETE FROM sessions WHERE session_id = ?",
      actualSessionId
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

/**
 * セッションインデックス取得オプション
 */
interface ListSessionIndexOptions extends PaginationOptions {
  status?: SessionStatus;
  projectId?: string;
  workItemId?: string;
  tags?: string[];
  query?: string;
}

/**
 * DBレコードからSessionIndexエンティティへ変換
 */
function toSessionIndex(row: Record<string, unknown>): SessionIndex {
  return {
    id: row.session_id as string,
    sessionName: row.name as string,
    status: row.status as SessionStatus,
    tags: [], // TODO: タグ自動抽出サービス実装後に対応
    summaryPreview: (row.summary_preview as string) || "",
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  };
}

/**
 * セッションインデックス一覧を取得（Level 0）
 */
export function listSessionIndex(
  options: ListSessionIndexOptions = {}
): SessionIndexListResponse {
  try {
    const { page = 1, limit = 20, status, projectId, workItemId } = options;

    const conditions: string[] = ["s.deleted_at IS NULL"];
    const params: (string | number)[] = [];

    if (status) {
      conditions.push("s.status = ?");
      params.push(status);
    }

    if (projectId) {
      conditions.push("s.project_id = ?");
      params.push(projectId);
    }

    if (workItemId) {
      conditions.push("s.work_item_id = ?");
      params.push(workItemId);
    }

    const whereClause = `WHERE ${conditions.join(" AND ")}`;

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM sessions s ${whereClause}`,
      ...params
    );
    const total = countResult?.count ?? 0;

    // データ取得（LEFT JOINで要約のプレビューも取得）
    const offset = (page - 1) * limit;
    const rows = query<Record<string, unknown>>(
      `SELECT
        s.session_id,
        s.name,
        s.status,
        s.created_at,
        s.updated_at,
        COALESCE(SUBSTR(sum.short_summary, 1, 100), '') as summary_preview
      FROM sessions s
      LEFT JOIN summaries sum ON s.session_id = sum.session_id
      ${whereClause}
      ORDER BY s.updated_at DESC
      LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset
    );

    const pagination = calculatePagination(total, page, limit);

    return {
      sessions: rows.map(toSessionIndex),
      pagination: {
        total: pagination.total,
        page: pagination.page,
        totalPages: pagination.totalPages,
        hasNext: pagination.hasNext,
        hasPrev: pagination.hasPrev,
      },
    };
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to list session index: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * DBレコードからExtendedSessionSummaryエンティティへ変換
 */
function toExtendedSessionSummary(
  row: Record<string, unknown>
): ExtendedSessionSummary {
  return {
    summaryId: row.summary_id as string,
    sessionId: row.session_id as string,
    shortSummary: row.short_summary as string,
    detailedSummary: row.detailed_summary as string,
    keyDecisions: JSON.parse((row.key_decisions as string) || "[]"),
    filesModified: JSON.parse((row.files_modified as string) || "[]"),
    toolsUsed: JSON.parse((row.tools_used as string) || "[]"),
    topics: JSON.parse((row.topics as string) || "[]"),
    originalTokenCount: row.original_token_count as number,
    summaryTokenCount: row.summary_token_count as number,
    compressionRatio: row.compression_ratio as number,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
    // 拡張フィールド（Phase 6）
    changes: JSON.parse((row.changes as string) || "[]"),
    errors: JSON.parse((row.errors as string) || "[]"),
    decisions: JSON.parse((row.decisions as string) || "[]"),
  };
}

/**
 * 古いprocessingセッションをcompletedに更新（起動時クリーンアップ）
 *
 * 同じプロジェクトの現在のセッション以外で、一定時間以上更新がない
 * processingセッションをcompletedに更新。
 * 最近アクティブなセッションは除外される。
 *
 * @param projectId - 対象プロジェクトID（指定しない場合は全プロジェクト）
 * @param excludeSessionId - 除外するセッションID（現在のセッション）
 * @param staleThresholdMinutes - この分数以上更新がないセッションのみ対象（デフォルト30分）
 * @returns 更新されたセッション数
 */
export function cleanupStaleProcessingSessions(
  projectId?: string,
  excludeSessionId?: string,
  staleThresholdMinutes: number = 30
): number {
  try {
    const conditions: string[] = [
      "status = 'processing'",
      "deleted_at IS NULL",
      // 指定分数以上更新がないセッションのみ対象
      "datetime(updated_at) < datetime('now', '-' || ? || ' minutes')",
    ];
    const params: (string | number)[] = [staleThresholdMinutes];

    if (projectId) {
      conditions.push("project_id = ?");
      params.push(projectId);
    }

    if (excludeSessionId) {
      conditions.push("session_id != ?");
      params.push(excludeSessionId);
    }

    const whereClause = conditions.join(" AND ");
    const timestamp = now();

    const result = execute(
      `UPDATE sessions SET status = 'completed', updated_at = ? WHERE ${whereClause}`,
      timestamp,
      ...params
    );

    return result.changes;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to cleanup stale sessions: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * タイムアウトしたprocessingセッションをcompletedに更新
 *
 * 指定時間以上経過したprocessingセッションを自動的にcompletedに更新
 *
 * @param timeoutHours - タイムアウト時間（時間単位、デフォルト1時間）
 * @returns 更新されたセッション数
 */
export function cleanupTimedOutSessions(timeoutHours: number = 1): number {
  try {
    const timestamp = now();
    // SQLiteの datetime 関数を使用して、指定時間前の時刻を計算
    const result = execute(
      `UPDATE sessions
       SET status = 'completed', updated_at = ?
       WHERE status = 'processing'
         AND deleted_at IS NULL
         AND datetime(updated_at) < datetime('now', '-' || ? || ' hours')`,
      timestamp,
      timeoutHours
    );

    return result.changes;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to cleanup timed out sessions: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションの要約詳細を取得（Level 1）
 *
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で取得可能。
 */
export function getSessionSummary(
  sessionId: string
): ExtendedSessionSummary | null {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return null;
    }
    const actualSessionId = existingSession.sessionId;

    const row = queryOne<Record<string, unknown>>(
      `SELECT * FROM summaries WHERE session_id = ?`,
      actualSessionId
    );

    return row ? toExtendedSessionSummary(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get session summary: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションのupdated_atを現在時刻に更新（タッチ）
 *
 * ツール使用時などにセッションがアクティブであることを示すために呼び出す。
 * タイムアウトクリーンアップの対象から除外するために使用。
 *
 * @param sessionId - セッションID（ch_ss_xxxx形式）
 * @returns 更新成功したかどうか
 */
export function touchSession(sessionId: string): boolean {
  try {
    const timestamp = now();
    const result = execute(
      "UPDATE sessions SET updated_at = ? WHERE session_id = ? AND deleted_at IS NULL",
      timestamp,
      sessionId
    );
    return result.changes > 0;
  } catch (error) {
    // タッチ失敗は致命的ではないのでログのみ
    console.warn(
      `[Session] Failed to touch session ${sessionId}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return false;
  }
}

/**
 * トークン数更新データ
 */
interface UpdateTokensData {
  inputTokens: number;
  outputTokens: number;
}

/**
 * セッションのトークン数を累積更新
 *
 * input_tokens と output_tokens を現在の値に加算する。
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で更新可能。
 *
 * @param sessionId - セッションID
 * @param data - トークン数（累積加算される）
 * @returns 更新後のセッション、存在しない場合は null
 */
export function updateSessionTokens(
  sessionId: string,
  data: UpdateTokensData
): Session | null {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return null;
    }
    const actualSessionId = existingSession.sessionId;

    const timestamp = now();
    execute(
      `UPDATE sessions
       SET input_tokens = COALESCE(input_tokens, 0) + ?,
           output_tokens = COALESCE(output_tokens, 0) + ?,
           updated_at = ?
       WHERE session_id = ?`,
      data.inputTokens,
      data.outputTokens,
      timestamp,
      actualSessionId
    );

    return getSessionById(actualSessionId);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to update session tokens: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションのトークン数を直接設定
 *
 * session-end で使用。累積ではなく直接値を設定。
 */
export function setSessionTokens(
  sessionId: string,
  data: UpdateTokensData
): Session | null {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return null;
    }
    const actualSessionId = existingSession.sessionId;

    const timestamp = now();
    execute(
      `UPDATE sessions
       SET input_tokens = ?,
           output_tokens = ?,
           updated_at = ?
       WHERE session_id = ?`,
      data.inputTokens,
      data.outputTokens,
      timestamp,
      actualSessionId
    );

    return getSessionById(actualSessionId);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to set session tokens: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッション分類更新データ
 */
export interface UpdateSessionClassificationData {
  importance?: SessionImportance;
  category?: SessionCategory;
  hasIssues?: boolean;
  issueType?: SessionIssueType;
}

/**
 * セッションの分類情報を更新
 *
 * 重要度、カテゴリ、問題フラグを更新する。
 * ch_ss_xxxx 形式の cnthub session ID と、UUID 形式の Claude Code session ID の両方で更新可能。
 *
 * @param sessionId - セッションID
 * @param data - 分類データ
 * @returns 更新後のセッション、存在しない場合は null
 */
export function updateSessionClassification(
  sessionId: string,
  data: UpdateSessionClassificationData
): Session | null {
  try {
    // まずセッションを取得して、実際の session_id を解決
    const existingSession = getSessionById(sessionId);
    if (!existingSession) {
      return null;
    }
    const actualSessionId = existingSession.sessionId;

    const fields: string[] = [];
    const params: (string | number | null)[] = [];

    if (data.importance !== undefined) {
      fields.push("importance = ?");
      params.push(data.importance);
    }

    if (data.category !== undefined) {
      fields.push("category = ?");
      params.push(data.category);
    }

    if (data.hasIssues !== undefined) {
      fields.push("has_issues = ?");
      params.push(data.hasIssues ? 1 : 0);
    }

    if (data.issueType !== undefined) {
      fields.push("issue_type = ?");
      params.push(data.issueType);
    }

    if (fields.length === 0) {
      return existingSession;
    }

    fields.push("updated_at = ?");
    params.push(now());
    params.push(actualSessionId);

    execute(
      `UPDATE sessions SET ${fields.join(", ")} WHERE session_id = ?`,
      ...params
    );

    return getSessionById(actualSessionId);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to update session classification: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * 問題のあるセッションを取得
 *
 * has_issues = true のセッション一覧を取得する。
 *
 * @param options - ページネーションオプション
 * @returns 問題のあるセッション一覧
 */
export function listSessionsWithIssues(
  options: PaginationOptions = {}
): PaginatedResult<Session> {
  try {
    const { page = 1, limit = 20 } = options;

    const conditions: string[] = ["has_issues = 1", "deleted_at IS NULL"];
    const whereClause = `WHERE ${conditions.join(" AND ")}`;

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM sessions ${whereClause}`
    );
    const total = countResult?.count ?? 0;

    // データ取得
    const offset = (page - 1) * limit;
    const rows = query<Record<string, unknown>>(
      `SELECT * FROM sessions ${whereClause} ORDER BY updated_at DESC LIMIT ? OFFSET ?`,
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
      `Failed to list sessions with issues: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}
