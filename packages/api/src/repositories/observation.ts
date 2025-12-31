/**
 * 観測記録リポジトリ
 *
 * observations テーブルへのCRUD操作を提供
 */

import { query, queryOne, execute } from "../db";
import {
  generateId,
  now,
  calculatePagination,
  type PaginationOptions,
  type PaginatedResult,
} from "./base";
import { AppError, ErrorCode } from "../middleware/error-handler";

/**
 * 観測タイプ
 */
export type ObservationType =
  | "tool_use"
  | "decision"
  | "error"
  | "learning"
  | "note"
  | "file_change";

/**
 * 観測記録エンティティ
 */
export interface Observation {
  observationId: string;
  sessionId: string;
  type: ObservationType;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

/**
 * 観測記録作成データ
 */
export interface CreateObservationData {
  sessionId: string;
  type: ObservationType;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

/**
 * 観測記録一覧取得オプション
 */
interface ListObservationsOptions extends PaginationOptions {
  sessionId?: string;
  type?: ObservationType;
}

/**
 * DBレコード型（SQLiteから取得される生データ）
 */
interface ObservationRow {
  observation_id: string;
  session_id: string;
  type: string;
  title: string;
  content: string;
  metadata: string | null;
  created_at: string;
}

/**
 * JSONを安全にパース（失敗時は undefined を返す）
 */
function safeJsonParse(
  jsonString: string | null
): Record<string, unknown> | undefined {
  if (!jsonString) return undefined;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn(
      `[Observation] Invalid JSON in metadata: ${jsonString.slice(0, 100)}`
    );
    return undefined;
  }
}

/**
 * DBレコードからObservationエンティティへ変換
 */
function toObservation(row: ObservationRow): Observation {
  return {
    observationId: row.observation_id,
    sessionId: row.session_id,
    type: row.type as ObservationType,
    title: row.title,
    content: row.content,
    metadata: safeJsonParse(row.metadata),
    createdAt: new Date(row.created_at),
  };
}

/**
 * 観測記録を作成
 */
export function createObservation(data: CreateObservationData): Observation {
  try {
    const observationId = generateId("obs");
    const timestamp = now();

    execute(
      `INSERT INTO observations (
        observation_id, session_id, type, title, content, metadata, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      observationId,
      data.sessionId,
      data.type,
      data.title,
      data.content,
      data.metadata ? JSON.stringify(data.metadata) : null,
      timestamp
    );

    return getObservationById(observationId)!;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to create observation: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * 観測記録をIDで取得
 */
export function getObservationById(observationId: string): Observation | null {
  try {
    const row = queryOne<ObservationRow>(
      "SELECT * FROM observations WHERE observation_id = ?",
      observationId
    );

    return row ? toObservation(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get observation: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * 観測記録一覧を取得
 */
export function listObservations(
  options: ListObservationsOptions = {}
): PaginatedResult<Observation> {
  try {
    const { page = 1, limit = 20, sessionId, type } = options;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (sessionId) {
      conditions.push("session_id = ?");
      params.push(sessionId);
    }

    if (type) {
      conditions.push("type = ?");
      params.push(type);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM observations ${whereClause}`,
      ...params
    );
    const total = countResult?.count ?? 0;

    // データ取得
    const offset = (page - 1) * limit;
    const rows = query<ObservationRow>(
      `SELECT * FROM observations ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset
    );

    return {
      items: rows.map(toObservation),
      pagination: calculatePagination(total, page, limit),
    };
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to list observations: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションの観測記録を検索（全文検索）
 */
export function searchObservations(
  searchQuery: string,
  options: { limit?: number; type?: ObservationType; sessionId?: string } = {}
): Observation[] {
  try {
    const { limit = 10, type, sessionId } = options;

    const conditions: string[] = ["(title LIKE ? OR content LIKE ?)"];
    const searchPattern = `%${searchQuery}%`;
    const params: (string | number)[] = [searchPattern, searchPattern];

    if (type) {
      conditions.push("type = ?");
      params.push(type);
    }

    if (sessionId) {
      conditions.push("session_id = ?");
      params.push(sessionId);
    }

    const whereClause = `WHERE ${conditions.join(" AND ")}`;

    const rows = query<ObservationRow>(
      `SELECT * FROM observations ${whereClause} ORDER BY created_at DESC LIMIT ?`,
      ...params,
      limit
    );

    return rows.map(toObservation);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to search observations: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * 観測記録を削除
 */
export function deleteObservation(observationId: string): boolean {
  try {
    const result = execute(
      "DELETE FROM observations WHERE observation_id = ?",
      observationId
    );

    return result.changes > 0;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to delete observation: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}
