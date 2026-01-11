/**
 * マークダウンユーティリティ
 *
 * CLAUDE.md および Skills で使用される共通のマークダウン処理関数。
 */

/**
 * マークダウンからセクション（## ヘッダー）を抽出
 *
 * @param lines - マークダウンの行配列
 * @returns セクション名の配列
 */
export function extractSections(lines: string[]): string[] {
  const sections: string[] = [];
  const sectionPattern = /^##\s+(.+)$/;

  for (const line of lines) {
    const match = line.match(sectionPattern);
    if (match) {
      sections.push(match[1].trim());
    }
  }

  return sections;
}

/**
 * セクション名から参照タイプを判定
 *
 * @param sectionName - セクション名
 * @returns 参照タイプ
 */
export function determineReferenceType(
  sectionName: string
): "rule" | "reference" | "example" {
  const lowerName = sectionName.toLowerCase();

  // ルール系のキーワード
  if (
    lowerName.includes("rule") ||
    lowerName.includes("ルール") ||
    lowerName.includes("制約") ||
    lowerName.includes("規約")
  ) {
    return "rule";
  }

  // 例/サンプル系のキーワード
  if (
    lowerName.includes("example") ||
    lowerName.includes("例") ||
    lowerName.includes("サンプル") ||
    lowerName.includes("usage")
  ) {
    return "example";
  }

  return "reference";
}
