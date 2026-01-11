/**
 * Skills 修正エージェント
 *
 * 各スキルファイルを30行以内に最適化する。
 * 長いセクションを references/ や examples/ に分離し、
 * 元のファイルには reference: や example: を追加する。
 */

import { mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import type { ExtractedFile } from "@claude-cnthub/shared";
import type { SkillAnalysis } from "./skills-reader";

/**
 * スキル最適化結果
 */
export interface SkillOptimizeResult {
  /** 成功フラグ */
  success: boolean;
  /** スキル名 */
  skillName: string;
  /** 最適化後のコンテンツ */
  optimizedContent: string;
  /** 抽出されたファイル */
  extractedFiles: ExtractedFile[];
  /** 最適化前の行数 */
  lineCountBefore: number;
  /** 最適化後の行数 */
  lineCountAfter: number;
  /** エラーメッセージ */
  error?: string;
}

/**
 * 複数スキルの最適化結果
 */
export type SkillsOptimizeResult = SkillOptimizeResult[];

/**
 * 複数のスキルを最適化
 *
 * @param analyses - スキル分析結果の配列
 * @param projectPath - プロジェクトのルートパス
 * @returns 最適化結果の配列
 */
export async function optimizeSkills(
  analyses: SkillAnalysis[],
  projectPath: string
): Promise<SkillsOptimizeResult> {
  const results: SkillsOptimizeResult = [];

  for (const analysis of analyses) {
    const result = await optimizeSingleSkill(analysis, projectPath);
    results.push(result);
  }

  return results;
}

/**
 * 単一のスキルを最適化
 */
async function optimizeSingleSkill(
  analysis: SkillAnalysis,
  projectPath: string
): Promise<SkillOptimizeResult> {
  const lineCountBefore = analysis.lineCount;

  // 抽出候補がない場合は元のコンテンツをそのまま返す
  if (analysis.extractionCandidates.length === 0) {
    return {
      success: true,
      skillName: analysis.skillName,
      optimizedContent: analysis.content,
      extractedFiles: [],
      lineCountBefore,
      lineCountAfter: lineCountBefore,
    };
  }

  try {
    // 抽出ファイルを作成
    const extractedFiles: ExtractedFile[] = [];
    let optimizedContent = analysis.content;

    for (const candidate of analysis.extractionCandidates) {
      // 抽出先ディレクトリを作成
      const targetPath = join(projectPath, ".claude", candidate.targetPath);
      const targetDir = dirname(targetPath);
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      // 抽出ファイルの内容を準備
      const extractedContent = formatExtractedContent(
        candidate.content,
        analysis.skillName
      );

      extractedFiles.push({
        path: candidate.targetPath,
        content: extractedContent,
        referenceType: candidate.type,
      });

      // 元のコンテンツから抽出部分を参照リンクに置換
      optimizedContent = replaceWithReference(
        optimizedContent,
        candidate.content,
        candidate.targetPath,
        candidate.type
      );
    }

    const lineCountAfter = optimizedContent.split("\n").length;

    return {
      success: true,
      skillName: analysis.skillName,
      optimizedContent,
      extractedFiles,
      lineCountBefore,
      lineCountAfter,
    };
  } catch (error) {
    return {
      success: false,
      skillName: analysis.skillName,
      optimizedContent: analysis.content,
      extractedFiles: [],
      lineCountBefore,
      lineCountAfter: lineCountBefore,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 抽出されたコンテンツをフォーマット
 */
function formatExtractedContent(content: string, skillName: string): string {
  // すでにヘッダーで始まっている場合はそのまま
  if (content.trim().startsWith("#")) {
    return content;
  }

  // ヘッダーがない場合は追加
  return `# ${skillName} 詳細\n\n${content}`;
}

/**
 * コンテンツを参照リンクに置換
 */
function replaceWithReference(
  content: string,
  extractedContent: string,
  targetPath: string,
  type: "rule" | "reference" | "example"
): string {
  // セクションヘッダーを抽出
  const headerMatch = extractedContent.match(/^(##\s+.+)$/m);
  const header = headerMatch ? headerMatch[1] : "";

  // セクションヘッダーを探して、その後の内容を置換
  if (header) {
    const lines = content.split("\n");
    const headerIndex = lines.findIndex(
      (line) => line.trim() === header.trim()
    );

    if (headerIndex !== -1) {
      // 次のセクションまでの行を特定
      let endIndex = lines.length;
      for (let i = headerIndex + 1; i < lines.length; i++) {
        if (lines[i].match(/^##\s+/)) {
          endIndex = i;
          break;
        }
      }

      // 置換テキストを作成
      const replacement = createReplacementText(header, targetPath);
      const newLines = [
        ...lines.slice(0, headerIndex),
        replacement,
        "",
        ...lines.slice(endIndex),
      ];

      return newLines.join("\n").replace(/\n{3,}/g, "\n\n");
    }
  }

  // 置換できなかった場合はメタデータとして追加
  const referenceKey = type === "example" ? "example" : "reference";
  const referenceNote = `${referenceKey}: ${targetPath}`;

  // メタデータセクション（description, trigger の後）に追加
  const lines = content.split("\n");
  const insertIndex = findMetadataInsertIndex(lines);

  lines.splice(insertIndex, 0, referenceNote);
  return lines.join("\n");
}

/**
 * メタデータ挿入位置を探す
 */
function findMetadataInsertIndex(lines: string[]): number {
  // description: や trigger: の後を探す
  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].match(/^(description|trigger):\s*/) &&
      i + 1 < lines.length &&
      !lines[i + 1].match(/^(description|trigger|reference|example):\s*/)
    ) {
      return i + 1;
    }
  }

  // 見つからない場合は最初の空行の後
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "" && i > 0) {
      return i + 1;
    }
  }

  // それでも見つからない場合は末尾
  return lines.length;
}

/**
 * 置換テキストを作成
 */
function createReplacementText(header: string, targetPath: string): string {
  const sectionName = header.replace(/^##\s+/, "");
  return `## ${sectionName}\n\n→ 詳細: ${targetPath}`;
}
