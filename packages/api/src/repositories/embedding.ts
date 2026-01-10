/**
 * Embedding リポジトリ
 *
 * ベクトルデータの保存・検索を担当。
 * sqlite-vec を使用したセマンティック検索を提供。
 *
 * 2つのベクトルテーブルをサポート:
 * - vec_embeddings: Voyage AI 用 (1024 次元)
 * - vec_embeddings_local: ローカルモデル用 (384 次元)
 *
 * 注意: sqlite-vec が利用不可の環境（テストなど）では
 * ベクトル操作は無効化され、グレースフルに失敗する。
 */

import { getDatabase, query, queryOne, execute } from "../db";
import {
  EMBEDDING_DIMENSIONS,
  type EmbeddingProvider,
} from "../services/embeddings";

/** sqlite-vec が利用可能かどうか */
let vecAvailable: boolean | null = null;

/**
 * Embedding ソースの種類
 */
export type EmbeddingSourceType =
  | "summary"
  | "message"
  | "work_item"
  | "observation";

/**
 * Embedding インデックスのレコード
 */
export interface EmbeddingIndex {
  embeddingId: number;
  sourceType: EmbeddingSourceType;
  sourceId: string;
  sessionId: string | null;
  contentPreview: string | null;
  dimension: number;
  provider: EmbeddingProvider;
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
  createdAt?: Date;
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
 * セッション検索オプション
 */
export interface SearchSessionsOptions {
  /** 失敗セッション（has_issues=true）のみを検索 */
  hasIssuesOnly?: boolean;
}

/**
 * 次元数からテーブル名を取得
 */
function getVecTableName(dimension: number): string {
  if (dimension === EMBEDDING_DIMENSIONS.local) {
    return "vec_embeddings_local";
  }
  return "vec_embeddings";
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
 * @param provider - 使用したプロバイダー
 * @returns 保存された embedding_id（失敗時は -1）
 */
export function saveEmbedding(
  sourceType: EmbeddingSourceType,
  sourceId: string,
  embedding: number[],
  sessionId: string | null = null,
  contentPreview: string | null = null,
  provider: EmbeddingProvider = "voyage"
): number {
  if (!ensureVecLoaded()) {
    return -1; // sqlite-vec が利用不可
  }

  const db = getDatabase();
  const dimension = embedding.length;
  const tableName = getVecTableName(dimension);

  // 既存の embedding を削除（同じソースに対する更新）
  deleteEmbeddingBySource(sourceType, sourceId);

  // ベクトルテーブルに挿入
  const vecStmt = db.prepare(`INSERT INTO ${tableName} (embedding) VALUES (?)`);
  const vecResult = vecStmt.run(new Float32Array(embedding));
  const embeddingId = Number(vecResult.lastInsertRowid);

  // embedding_index に挿入
  execute(
    `INSERT INTO embedding_index
      (embedding_id, source_type, source_id, session_id, content_preview, dimension, provider)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    embeddingId,
    sourceType,
    sourceId,
    sessionId,
    contentPreview,
    dimension,
    provider
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
  // 先に embedding 情報を取得
  const row = queryOne<{ embedding_id: number; dimension: number }>(
    "SELECT embedding_id, dimension FROM embedding_index WHERE source_type = ? AND source_id = ?",
    sourceType,
    sourceId
  );

  if (!row) return false;

  const tableName = getVecTableName(
    row.dimension ?? EMBEDDING_DIMENSIONS.voyage
  );

  // 両方のテーブルから削除
  try {
    execute(`DELETE FROM ${tableName} WHERE rowid = ?`, row.embedding_id);
  } catch {
    // テーブルが存在しない場合は無視
  }
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
  const rows = query<{ embedding_id: number; dimension: number }>(
    "SELECT embedding_id, dimension FROM embedding_index WHERE session_id = ?",
    sessionId
  );

  if (rows.length === 0) {
    return 0;
  }

  // 次元ごとにグループ化して削除
  const byDimension = new Map<number, number[]>();
  for (const row of rows) {
    const dim = row.dimension ?? EMBEDDING_DIMENSIONS.voyage;
    if (!byDimension.has(dim)) {
      byDimension.set(dim, []);
    }
    byDimension.get(dim)!.push(row.embedding_id);
  }

  for (const [dimension, embeddingIds] of byDimension) {
    const tableName = getVecTableName(dimension);
    const placeholders = embeddingIds.map(() => "?").join(", ");
    try {
      execute(
        `DELETE FROM ${tableName} WHERE rowid IN (${placeholders})`,
        ...embeddingIds
      );
    } catch {
      // テーブルが存在しない場合は無視
    }
  }

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
 * 注意: クエリの次元と同じ次元の埋め込みのみ検索される
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

  const dimension = queryEmbedding.length;
  const tableName = getVecTableName(dimension);

  let sql = `
    SELECT
      ei.embedding_id,
      ei.source_type,
      ei.source_id,
      ei.session_id,
      ei.content_preview,
      ve.distance
    FROM ${tableName} ve
    INNER JOIN embedding_index ei ON ve.rowid = ei.embedding_id
    WHERE ve.embedding MATCH ?
      AND ei.dimension = ?
  `;

  const params: (Float32Array | string | number)[] = [
    new Float32Array(queryEmbedding),
    dimension,
  ];

  if (sourceTypes && sourceTypes.length > 0) {
    const placeholders = sourceTypes.map(() => "?").join(", ");
    sql += ` AND ei.source_type IN (${placeholders})`;
    params.push(...sourceTypes);
  }

  sql += ` AND k = ? ORDER BY ve.distance`;
  params.push(limit);

  try {
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
  } catch (error) {
    console.error("[Embedding] Search failed:", error);
    return [];
  }
}

/**
 * セマンティック検索（セッション詳細付き）
 *
 * 要約の Embedding を検索し、セッション情報を結合して返す
 *
 * @param queryEmbedding - クエリベクトル
 * @param limit - 取得件数
 * @param options - 検索オプション（hasIssuesOnly: 失敗セッションのみ）
 * @returns セッション検索結果
 */
export function searchSimilarSessions(
  queryEmbedding: number[],
  limit: number = 10,
  options: SearchSessionsOptions = {}
): SessionSearchResult[] {
  if (!ensureVecLoaded()) {
    return []; // sqlite-vec が利用不可
  }
  const db = getDatabase();

  const dimension = queryEmbedding.length;
  const tableName = getVecTableName(dimension);

  // has_issues フィルタを追加
  const hasIssuesFilter = options.hasIssuesOnly ? "AND s.has_issues = 1" : "";

  const sql = `
    SELECT
      s.session_id,
      s.name as session_name,
      sm.short_summary,
      ve.distance
    FROM ${tableName} ve
    INNER JOIN embedding_index ei ON ve.rowid = ei.embedding_id
    INNER JOIN sessions s ON ei.session_id = s.session_id
    LEFT JOIN summaries sm ON s.session_id = sm.session_id
    WHERE ve.embedding MATCH ?
      AND ei.source_type = 'summary'
      AND ei.dimension = ?
      AND s.deleted_at IS NULL
      ${hasIssuesFilter}
      AND k = ?
    ORDER BY ve.distance
  `;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all(
      new Float32Array(queryEmbedding),
      dimension,
      limit
    ) as {
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
  } catch (error) {
    console.error("[Embedding] Session search failed:", error);
    return [];
  }
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

/**
 * Embedding の統計情報を取得
 */
export function getEmbeddingStats(): {
  total: number;
  byProvider: Record<string, number>;
  byDimension: Record<number, number>;
} {
  const total = countEmbeddings();

  const providerRows = query<{ provider: string; count: number }>(
    "SELECT COALESCE(provider, 'voyage') as provider, COUNT(*) as count FROM embedding_index GROUP BY provider"
  );

  const dimensionRows = query<{ dimension: number; count: number }>(
    "SELECT COALESCE(dimension, 1024) as dimension, COUNT(*) as count FROM embedding_index GROUP BY dimension"
  );

  const byProvider: Record<string, number> = {};
  for (const row of providerRows) {
    byProvider[row.provider] = row.count;
  }

  const byDimension: Record<number, number> = {};
  for (const row of dimensionRows) {
    byDimension[row.dimension] = row.count;
  }

  return { total, byProvider, byDimension };
}
