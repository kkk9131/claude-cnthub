/**
 * Merge リポジトリ
 *
 * マージデータのCRUD操作を提供
 */

import { query, queryOne, execute, getDatabase } from "../db";
import type { Merge, MergeStatus } from "@claude-cnthub/shared";

// DB行の型（snake_case）
interface MergeRow {
  merge_id: string;
  source_session_ids: string;
  result_summary: string;
  result_detailed_summary: string | null;
  status: MergeStatus;
  project_id: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
}

// DB行をドメインオブジェクトに変換
function toMerge(row: MergeRow): Merge {
  return {
    mergeId: row.merge_id,
    sourceSessionIds: JSON.parse(row.source_session_ids),
    resultSummary: row.result_summary,
    resultDetailedSummary: row.result_detailed_summary ?? undefined,
    status: row.status,
    projectId: row.project_id ?? undefined,
    error: row.error ?? undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

// ID生成
function generateMergeId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `merge_${timestamp}${random}`;
}

/**
 * マージを作成
 */
export function createMerge(data: {
  sourceSessionIds: string[];
  projectId?: string;
}): Merge {
  const mergeId = generateMergeId();
  const now = new Date().toISOString();
  const sourceSessionIdsJson = JSON.stringify(data.sourceSessionIds);

  execute(
    `INSERT INTO merges (merge_id, source_session_ids, status, project_id, created_at, updated_at)
     VALUES (?, ?, 'pending', ?, ?, ?)`,
    mergeId,
    sourceSessionIdsJson,
    data.projectId ?? null,
    now,
    now
  );

  // merge_sessions テーブルにも関連を追加
  const db = getDatabase();
  const stmt = db.prepare(
    `INSERT INTO merge_sessions (merge_id, session_id, display_order)
     VALUES (?, ?, ?)`
  );

  data.sourceSessionIds.forEach((sessionId, index) => {
    stmt.run(mergeId, sessionId, index);
  });

  return getMergeById(mergeId)!;
}

/**
 * マージをIDで取得
 */
export function getMergeById(mergeId: string): Merge | null {
  const row = queryOne<MergeRow>(
    `SELECT * FROM merges WHERE merge_id = ?`,
    mergeId
  );

  return row ? toMerge(row) : null;
}

/**
 * マージ一覧を取得
 */
export function listMerges(options: {
  page?: number;
  limit?: number;
  status?: MergeStatus;
  projectId?: string;
}): {
  items: Merge[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const offset = (page - 1) * limit;

  // WHERE句を構築
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.status) {
    conditions.push("status = ?");
    params.push(options.status);
  }

  if (options.projectId) {
    conditions.push("project_id = ?");
    params.push(options.projectId);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // 総件数を取得
  const countResult = queryOne<{ count: number }>(
    `SELECT COUNT(*) as count FROM merges ${whereClause}`,
    ...params
  );
  const total = countResult?.count ?? 0;
  const totalPages = Math.ceil(total / limit);

  // データを取得
  const rows = query<MergeRow>(
    `SELECT * FROM merges ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ...params,
    limit,
    offset
  );

  return {
    items: rows.map(toMerge),
    pagination: {
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * マージステータスを更新
 */
export function updateMergeStatus(
  mergeId: string,
  status: MergeStatus,
  data?: {
    resultSummary?: string;
    resultDetailedSummary?: string;
    error?: string;
  }
): Merge | null {
  const now = new Date().toISOString();

  const updates: string[] = ["status = ?", "updated_at = ?"];
  const params: (string | null)[] = [status, now];

  if (data?.resultSummary !== undefined) {
    updates.push("result_summary = ?");
    params.push(data.resultSummary);
  }

  if (data?.resultDetailedSummary !== undefined) {
    updates.push("result_detailed_summary = ?");
    params.push(data.resultDetailedSummary);
  }

  if (data?.error !== undefined) {
    updates.push("error = ?");
    params.push(data.error);
  }

  params.push(mergeId);

  const result = execute(
    `UPDATE merges SET ${updates.join(", ")} WHERE merge_id = ?`,
    ...params
  );

  if (result.changes === 0) {
    return null;
  }

  return getMergeById(mergeId);
}

/**
 * マージを削除
 */
export function deleteMerge(mergeId: string): boolean {
  const result = execute(`DELETE FROM merges WHERE merge_id = ?`, mergeId);
  return result.changes > 0;
}

/**
 * セッションIDでマージを検索
 */
export function findMergesBySessionId(sessionId: string): Merge[] {
  const rows = query<MergeRow>(
    `SELECT m.* FROM merges m
     INNER JOIN merge_sessions ms ON m.merge_id = ms.merge_id
     WHERE ms.session_id = ?
     ORDER BY m.created_at DESC`,
    sessionId
  );

  return rows.map(toMerge);
}

/**
 * マージに含まれるセッションIDを取得
 */
export function getSessionIdsForMerge(mergeId: string): string[] {
  const rows = query<{ session_id: string }>(
    `SELECT session_id FROM merge_sessions
     WHERE merge_id = ?
     ORDER BY display_order`,
    mergeId
  );

  return rows.map((r) => r.session_id);
}
