/**
 * 関連度スコア計算ユーティリティ
 *
 * ベクトル検索で得られる距離を、直感的な関連度スコアに変換する。
 */

/**
 * コサイン距離の最大値（完全に反対方向のベクトル）
 */
export const MAX_COSINE_DISTANCE = 2;

/**
 * コサイン距離を関連度スコアに変換
 *
 * - cosine distance: 0 = 完全一致, 2 = 完全に反対
 * - relevance score: 1 = 完全一致, 0 = 無関係
 *
 * @param distance - コサイン距離（0〜2）
 * @returns 関連度スコア（0〜1）
 */
export function distanceToRelevanceScore(distance: number): number {
  const score = 1 - distance / MAX_COSINE_DISTANCE;
  return Math.max(0, Math.min(1, score));
}
