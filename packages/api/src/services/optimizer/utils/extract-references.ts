/**
 * 参照リンク抽出ユーティリティ
 *
 * CLAUDE.md および Skills で使用される参照リンクを抽出する共通関数。
 */

/**
 * 参照リンクのパターン
 *
 * 以下のパターンを検出:
 * - → 詳細: path/to/file.md
 * - reference: path/to/file.md
 * - example: path/to/file.md
 */
const REFERENCE_PATTERNS = {
  arrow: /→\s*詳細:\s*([^\s\n]+)/g,
  reference: /reference:\s*([^\s\n]+)/g,
  example: /example:\s*([^\s\n]+)/g,
} as const;

/**
 * コンテンツから参照リンクを抽出
 *
 * @param content - 抽出元のコンテンツ
 * @returns 参照リンクの配列
 */
export function extractReferences(content: string): string[] {
  const references: string[] = [];

  for (const pattern of Object.values(REFERENCE_PATTERNS)) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
      references.push(match[1]);
    }
  }

  return references;
}
