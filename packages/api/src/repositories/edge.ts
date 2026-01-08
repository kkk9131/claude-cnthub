/**
 * Edge リポジトリ
 *
 * セッション間のエッジ（接続）データのCRUD操作を提供
 */

import { generateSequentialId } from "@claude-cnthub/shared";
import { query, queryOne, execute } from "../db";

// DB行の型（snake_case）
interface EdgeRow {
  edge_id: string;
  source_session_id: string;
  target_claude_session_id: string;
  created_at: string;
}

// ドメインオブジェクト（camelCase）
export interface Edge {
  edgeId: string;
  sourceSessionId: string;
  targetClaudeSessionId: string;
  createdAt: Date;
}

// DB行をドメインオブジェクトに変換
function toEdge(row: EdgeRow): Edge {
  return {
    edgeId: row.edge_id,
    sourceSessionId: row.source_session_id,
    targetClaudeSessionId: row.target_claude_session_id,
    createdAt: new Date(row.created_at),
  };
}

/**
 * 次のエッジ連番を取得
 */
function getNextEdgeSequence(): number {
  // ch_ed_XXXX = 10文字 (ch_ed_ = 6文字 + XXXX = 4文字)
  const result = queryOne<{ max_seq: number | null }>(
    `SELECT MAX(
      CAST(SUBSTR(edge_id, 7) AS INTEGER)
    ) as max_seq
    FROM session_edges
    WHERE edge_id LIKE 'ch_ed_%'
      AND LENGTH(edge_id) = 10`
  );

  const maxSeq = result?.max_seq ?? 0;
  return maxSeq + 1;
}

// ID生成（新ID体系）
function generateEdgeId(): string {
  const nextSeq = getNextEdgeSequence();
  return generateSequentialId("EDGE", nextSeq);
}

/**
 * エッジを作成
 */
export function createEdge(data: {
  sourceSessionId: string;
  targetClaudeSessionId: string;
}): Edge {
  const edgeId = generateEdgeId();
  const now = new Date().toISOString();

  execute(
    `INSERT INTO session_edges (edge_id, source_session_id, target_claude_session_id, created_at)
     VALUES (?, ?, ?, ?)`,
    edgeId,
    data.sourceSessionId,
    data.targetClaudeSessionId,
    now
  );

  return getEdgeById(edgeId)!;
}

/**
 * エッジをIDで取得
 */
export function getEdgeById(edgeId: string): Edge | null {
  const row = queryOne<EdgeRow>(
    `SELECT * FROM session_edges WHERE edge_id = ?`,
    edgeId
  );

  return row ? toEdge(row) : null;
}

/**
 * エッジを削除
 */
export function deleteEdge(edgeId: string): boolean {
  const result = execute(`DELETE FROM session_edges WHERE edge_id = ?`, edgeId);
  return result.changes > 0;
}

/**
 * ターゲット（Claude Session ID）で接続されたソースセッションを取得
 *
 * UIで接続されたセッション一覧を返す
 */
export function findEdgesByTarget(targetClaudeSessionId: string): Edge[] {
  const rows = query<EdgeRow>(
    `SELECT * FROM session_edges
     WHERE target_claude_session_id = ?
     ORDER BY created_at DESC`,
    targetClaudeSessionId
  );

  return rows.map(toEdge);
}

/**
 * ターゲット（Claude Session ID）で接続されたソースセッションIDのみを取得
 */
export function findSourceSessionIdsByTarget(
  targetClaudeSessionId: string
): string[] {
  const rows = query<{ source_session_id: string }>(
    `SELECT source_session_id FROM session_edges
     WHERE target_claude_session_id = ?
     ORDER BY created_at DESC`,
    targetClaudeSessionId
  );

  return rows.map((r) => r.source_session_id);
}

/**
 * ソースセッションIDで接続先を取得
 */
export function findEdgesBySource(sourceSessionId: string): Edge[] {
  const rows = query<EdgeRow>(
    `SELECT * FROM session_edges
     WHERE source_session_id = ?
     ORDER BY created_at DESC`,
    sourceSessionId
  );

  return rows.map(toEdge);
}

/**
 * 特定のソース・ターゲットの組み合わせでエッジが存在するか確認
 */
export function edgeExists(
  sourceSessionId: string,
  targetClaudeSessionId: string
): boolean {
  const result = queryOne<{ count: number }>(
    `SELECT COUNT(*) as count FROM session_edges
     WHERE source_session_id = ? AND target_claude_session_id = ?`,
    sourceSessionId,
    targetClaudeSessionId
  );

  return (result?.count ?? 0) > 0;
}

/**
 * 全エッジを取得（デバッグ用）
 */
export function listAllEdges(): Edge[] {
  const rows = query<EdgeRow>(
    `SELECT * FROM session_edges ORDER BY created_at DESC`
  );

  return rows.map(toEdge);
}
