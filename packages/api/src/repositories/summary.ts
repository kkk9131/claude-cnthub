/**
 * 要約リポジトリ
 *
 * セッション要約のCRUD操作を提供。
 *
 * 要約とは？
 * - セッションのメッセージをAIで圧縮した情報
 * - 1セッション1要約（上書き更新）
 * - 検索や振り返りに使用
 */

import type { SessionSummary } from "@claude-cnthub/shared";
import { query, queryOne, execute, type SQLQueryBindings } from "../db";
import {
  type PaginationOptions,
  type PaginatedResult,
  rowToEntity,
  calculatePagination,
  generateId,
  now,
} from "./base";

/**
 * 要約のDBレコード型（snake_case）
 * JSON配列フィールドは文字列で保存
 */
interface SummaryRow {
  summary_id: string;
  session_id: string;
  short_summary: string;
  detailed_summary: string;
  key_decisions: string; // JSON配列
  files_modified: string; // JSON配列
  tools_used: string; // JSON配列
  topics: string; // JSON配列
  original_token_count: number;
  summary_token_count: number;
  compression_ratio: number;
  created_at: string;
  updated_at: string;
}

/**
 * 要約作成入力
 */
export interface CreateSummaryInput {
  sessionId: string;
  shortSummary: string;
  detailedSummary: string;
  keyDecisions: string[];
  filesModified: string[];
  toolsUsed: string[];
  topics: string[];
  originalTokenCount: number;
  summaryTokenCount: number;
  compressionRatio: number;
}

/**
 * DBレコードを SessionSummary に変換
 * JSON配列フィールドをパース
 */
function rowToSummary(row: SummaryRow): SessionSummary {
  return {
    summaryId: row.summary_id,
    sessionId: row.session_id,
    shortSummary: row.short_summary,
    detailedSummary: row.detailed_summary,
    keyDecisions: JSON.parse(row.key_decisions),
    filesModified: JSON.parse(row.files_modified),
    toolsUsed: JSON.parse(row.tools_used),
    topics: JSON.parse(row.topics),
    originalTokenCount: row.original_token_count,
    summaryTokenCount: row.summary_token_count,
    compressionRatio: row.compression_ratio,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

/**
 * 新規要約を作成
 *
 * 既存の要約がある場合は上書き（upsert）
 */
export function createSummary(data: CreateSummaryInput): SessionSummary {
  const summaryId = generateId();
  const timestamp = now();

  // 既存の要約を削除（upsert動作）
  execute("DELETE FROM summaries WHERE session_id = ?", data.sessionId);

  execute(
    `INSERT INTO summaries (
      summary_id, session_id, short_summary, detailed_summary,
      key_decisions, files_modified, tools_used, topics,
      original_token_count, summary_token_count, compression_ratio,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    summaryId,
    data.sessionId,
    data.shortSummary,
    data.detailedSummary,
    JSON.stringify(data.keyDecisions),
    JSON.stringify(data.filesModified),
    JSON.stringify(data.toolsUsed),
    JSON.stringify(data.topics),
    data.originalTokenCount,
    data.summaryTokenCount,
    data.compressionRatio,
    timestamp,
    timestamp
  );

  return {
    summaryId,
    sessionId: data.sessionId,
    shortSummary: data.shortSummary,
    detailedSummary: data.detailedSummary,
    keyDecisions: data.keyDecisions,
    filesModified: data.filesModified,
    toolsUsed: data.toolsUsed,
    topics: data.topics,
    originalTokenCount: data.originalTokenCount,
    summaryTokenCount: data.summaryTokenCount,
    compressionRatio: data.compressionRatio,
    createdAt: new Date(timestamp),
    updatedAt: new Date(timestamp),
  };
}

/**
 * セッションIDで要約を取得
 */
export function getSummaryBySessionId(
  sessionId: string
): SessionSummary | null {
  const row = queryOne<SummaryRow>(
    "SELECT * FROM summaries WHERE session_id = ?",
    sessionId
  );

  if (!row) return null;

  return rowToSummary(row);
}

/**
 * 要約IDで取得
 */
export function getSummary(summaryId: string): SessionSummary | null {
  const row = queryOne<SummaryRow>(
    "SELECT * FROM summaries WHERE summary_id = ?",
    summaryId
  );

  if (!row) return null;

  return rowToSummary(row);
}

/**
 * 要約一覧を取得（ページネーション対応）
 *
 * 作成日時の降順（新しい順）でソート
 */
export function listSummaries(
  pagination?: PaginationOptions
): PaginatedResult<SessionSummary> {
  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 20;
  const offset = (page - 1) * limit;

  // 総件数を取得
  const countResult = queryOne<{ count: number }>(
    "SELECT COUNT(*) as count FROM summaries"
  );
  const total = countResult?.count ?? 0;

  // ページネーション結果を取得
  const rows = query<SummaryRow>(
    `SELECT * FROM summaries ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    limit,
    offset
  );

  const summaries = rows.map(rowToSummary);

  return {
    items: summaries,
    pagination: calculatePagination(total, page, limit),
  };
}

/**
 * 要約を削除
 */
export function deleteSummary(summaryId: string): boolean {
  const result = execute(
    "DELETE FROM summaries WHERE summary_id = ?",
    summaryId
  );
  return result.changes > 0;
}

/**
 * セッションIDで要約を削除
 */
export function deleteSummaryBySessionId(sessionId: string): boolean {
  const result = execute(
    "DELETE FROM summaries WHERE session_id = ?",
    sessionId
  );
  return result.changes > 0;
}
