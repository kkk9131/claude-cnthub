/**
 * Embedding リポジトリ
 *
 * ベクトルデータの保存・検索を担当。
 * sqlite-vec を使用したセマンティック検索を提供。
 *
 * 注意: sqlite-vec が利用不可の環境（テストなど）では
 * ベクトル操作は無効化され、グレースフルに失敗する。
 */

import { getDatabase, query, queryOne, execute } from "../db";
import { EMBEDDING_DIMENSION } from "../services/embeddings";

/** sqlite-vec が利用可能かどうか */
let vecAvailable: boolean | null = null;

/**
 * Embedding ソースの種類
 */
export type EmbeddingSourceType = "summary" | "message" | "work_item";

/**
 * Embedding インデックスのレコード
 */
export interface EmbeddingIndex {
  embeddingId: number;
  sourceType: EmbeddingSourceType;
  sourceId: string;
  sessionId: string | null;
  contentPreview: string | null;
  createdAt: string;
}

/**
 * 検索結果
 */
export interface SearchResult {
  embeddingId: number;
  sourceType: EmbeddingSourceType;
  sourceId: string;
  sessionId: string | null;
  contentPreview: string | null;
  distance: number;
}

/**
 * セッション検索結果（詳細付き）
 */
export interface SessionSearchResult {
  sessionId: string;
  sessionName: string;
  shortSummary: string;
  distance: number;
}

/**
 * sqlite-vec 拡張を確実にロード
 * @returns true if vec is available, false otherwise
 */
function ensureVecLoaded(): boolean {
  if (vecAvailable !== null) return vecAvailable;

  const db = getDatabase();
  try {
    const sqliteVec = require("sqlite-vec");
    sqliteVec.load(db);
    vecAvailable = true;
    return true;
  } catch {
    vecAvailable = false;
    console.warn(
      "[Embedding] sqlite-vec not available. Vector operations disabled."
    );
    return false;
  }
}

/**
 * Embedding を保存
 *
 * @param sourceType - ソースの種類
 * @param sourceId - ソースID（summary_id, message_id など）
 * @param embedding - ベクトルデータ
 * @param sessionId - 関連セッションID（オプション）
 * @param contentPreview - コンテンツプレビュー（検索結果表示用）
 * @returns 保存された embedding_id（失敗時は -1）
 */
export function saveEmbedding(
  sourceType: EmbeddingSourceType,
  sourceId: string,
  embedding: number[],
  sessionId: string | null = null,
  contentPreview: string | null = null
): number {
  if (!ensureVecLoaded()) {
    return -1; // sqlite-vec が利用不可
  }

  const db = getDatabase();

  // 既存の embedding を削除（同じソースに対する更新）
  deleteEmbeddingBySource(sourceType, sourceId);

  // vec_embeddings に挿入
  const vecStmt = db.prepare(
    "INSERT INTO vec_embeddings (embedding) VALUES (?)"
  );
  const vecResult = vecStmt.run(new Float32Array(embedding));
  const embeddingId = Number(vecResult.lastInsertRowid);

  // embedding_index に挿入
  execute(
    `INSERT INTO embedding_index
      (embedding_id, source_type, source_id, session_id, content_preview)
     VALUES (?, ?, ?, ?, ?)`,
    embeddingId,
    sourceType,
    sourceId,
    sessionId,
    contentPreview
  );

  return embeddingId;
}

/**
 * ソース情報で Embedding を削除
 */
export function deleteEmbeddingBySource(
  sourceType: EmbeddingSourceType,
  sourceId: string
): boolean {
  // 先に embedding_id を取得
  const row = queryOne<{ embedding_id: number }>(
    "SELECT embedding_id FROM embedding_index WHERE source_type = ? AND source_id = ?",
    sourceType,
    sourceId
  );

  if (!row) return false;

  // 両方のテーブルから削除
  execute("DELETE FROM vec_embeddings WHERE rowid = ?", row.embedding_id);
  execute(
    "DELETE FROM embedding_index WHERE source_type = ? AND source_id = ?",
    sourceType,
    sourceId
  );

  return true;
}

/**
 * セッションIDで全ての Embedding を削除
 *
 * バッチ削除で効率化
 */
export function deleteEmbeddingsBySessionId(sessionId: string): number {
  const rows = query<{ embedding_id: number }>(
    "SELECT embedding_id FROM embedding_index WHERE session_id = ?",
    sessionId
  );

  if (rows.length === 0) {
    return 0;
  }

  // バッチ削除で効率化
  const embeddingIds = rows.map((row) => row.embedding_id);
  const placeholders = embeddingIds.map(() => "?").join(", ");
  execute(
    `DELETE FROM vec_embeddings WHERE rowid IN (${placeholders})`,
    ...embeddingIds
  );

  const result = execute(
    "DELETE FROM embedding_index WHERE session_id = ?",
    sessionId
  );
  return result.changes;
}

/**
 * セマンティック検索を実行
 *
 * クエリベクトルに類似した Embedding を検索
 *
 * @param queryEmbedding - クエリベクトル
 * @param limit - 取得件数（デフォルト: 10）
 * @param sourceTypes - フィルタするソースタイプ（オプション）
 * @returns 検索結果（距離昇順）
 */
export function searchSimilar(
  queryEmbedding: number[],
  limit: number = 10,
  sourceTypes?: EmbeddingSourceType[]
): SearchResult[] {
  if (!ensureVecLoaded()) {
    return []; // sqlite-vec が利用不可
  }
  const db = getDatabase();

  let sql = `
    SELECT
      ei.embedding_id,
      ei.source_type,
      ei.source_id,
      ei.session_id,
      ei.content_preview,
      ve.distance
    FROM vec_embeddings ve
    INNER JOIN embedding_index ei ON ve.rowid = ei.embedding_id
    WHERE ve.embedding MATCH ?
  `;

  const params: (Float32Array | string | number)[] = [
    new Float32Array(queryEmbedding),
  ];

  if (sourceTypes && sourceTypes.length > 0) {
    const placeholders = sourceTypes.map(() => "?").join(", ");
    sql += ` AND ei.source_type IN (${placeholders})`;
    params.push(...sourceTypes);
  }

  sql += ` AND k = ? ORDER BY ve.distance`;
  params.push(limit);

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as {
    embedding_id: number;
    source_type: string;
    source_id: string;
    session_id: string | null;
    content_preview: string | null;
    distance: number;
  }[];

  return rows.map((row) => ({
    embeddingId: row.embedding_id,
    sourceType: row.source_type as EmbeddingSourceType,
    sourceId: row.source_id,
    sessionId: row.session_id,
    contentPreview: row.content_preview,
    distance: row.distance,
  }));
}

/**
 * セマンティック検索（セッション詳細付き）
 *
 * 要約の Embedding を検索し、セッション情報を結合して返す
 *
 * @param queryEmbedding - クエリベクトル
 * @param limit - 取得件数
 * @returns セッション検索結果
 */
export function searchSimilarSessions(
  queryEmbedding: number[],
  limit: number = 10
): SessionSearchResult[] {
  if (!ensureVecLoaded()) {
    return []; // sqlite-vec が利用不可
  }
  const db = getDatabase();

  const sql = `
    SELECT
      s.session_id,
      s.name as session_name,
      sm.short_summary,
      ve.distance
    FROM vec_embeddings ve
    INNER JOIN embedding_index ei ON ve.rowid = ei.embedding_id
    INNER JOIN sessions s ON ei.session_id = s.session_id
    LEFT JOIN summaries sm ON s.session_id = sm.session_id
    WHERE ve.embedding MATCH ?
      AND ei.source_type = 'summary'
      AND s.deleted_at IS NULL
      AND k = ?
    ORDER BY ve.distance
  `;

  const stmt = db.prepare(sql);
  const rows = stmt.all(new Float32Array(queryEmbedding), limit) as {
    session_id: string;
    session_name: string;
    short_summary: string | null;
    distance: number;
  }[];

  return rows.map((row) => ({
    sessionId: row.session_id,
    sessionName: row.session_name,
    shortSummary: row.short_summary ?? "",
    distance: row.distance,
  }));
}

/**
 * Embedding インデックスの件数を取得
 */
export function countEmbeddings(): number {
  const row = queryOne<{ count: number }>(
    "SELECT COUNT(*) as count FROM embedding_index"
  );
  return row?.count ?? 0;
}

/**
 * セッションの Embedding が存在するか確認
 */
export function hasEmbedding(sessionId: string): boolean {
  const row = queryOne<{ count: number }>(
    "SELECT COUNT(*) as count FROM embedding_index WHERE session_id = ? AND source_type = 'summary'",
    sessionId
  );
  return (row?.count ?? 0) > 0;
}
