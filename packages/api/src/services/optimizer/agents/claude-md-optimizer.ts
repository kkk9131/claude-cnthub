/**
 * CLAUDE.md 修正エージェント
 *
 * CLAUDE.md を100行以内に最適化する。
 * 長いセクションを rules/ や references/ に分離し、
 * 元のファイルには参照リンクを追加する。
 */

import { mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import type { ExtractedFile } from "@claude-cnthub/shared";
import type { ClaudeMdAnalysis } from "./claude-md-reader";

/**
 * CLAUDE.md 最適化結果
 */
export interface ClaudeMdOptimizeResult {
  /** 成功フラグ */
  success: boolean;
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
 * CLAUDE.md を最適化
 *
 * @param analysis - 分析結果
 * @param projectPath - プロジェクトのルートパス
 * @returns 最適化結果
 */
export async function optimizeClaudeMd(
  analysis: ClaudeMdAnalysis,
  projectPath: string
): Promise<ClaudeMdOptimizeResult> {
  const lineCountBefore = analysis.lineCount;

  // 抽出候補がない場合は元のコンテンツをそのまま返す
  if (analysis.extractionCandidates.length === 0) {
    return {
      success: true,
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
      const extractedContent = formatExtractedContent(candidate.content);

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
      optimizedContent,
      extractedFiles,
      lineCountBefore,
      lineCountAfter,
    };
  } catch (error) {
    return {
      success: false,
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
function formatExtractedContent(content: string): string {
  // すでにヘッダーで始まっている場合はそのまま
  if (content.trim().startsWith("#")) {
    return content;
  }

  // ヘッダーがない場合は追加
  return `# 詳細\n\n${content}`;
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

  // 元のコンテンツを参照リンクで置換
  // セクション全体を置換（ヘッダー + 内容）
  const sectionPattern = createSectionPattern(header);

  if (sectionPattern && content.includes(extractedContent.trim())) {
    // 完全一致で置換を試みる
    const replacement = createReplacementText(header, targetPath);
    return content.replace(extractedContent.trim(), replacement);
  }

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

  // 置換できなかった場合は末尾に参照を追加
  const referenceNote = `\n→ 詳細: ${targetPath}\n`;
  return content + referenceNote;
}

/**
 * セクションのパターンを作成
 */
function createSectionPattern(header: string): RegExp | null {
  if (!header) return null;

  const escapedHeader = header.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escapedHeader}[\\s\\S]*?(?=\\n##\\s|$)`, "m");
}

/**
 * 置換テキストを作成
 */
function createReplacementText(header: string, targetPath: string): string {
  if (header) {
    // セクション名を保持し、参照リンクを追加
    const sectionName = header.replace(/^##\s+/, "");
    return `## ${sectionName}\n\n→ 詳細: ${targetPath}`;
  }

  return `→ 詳細: ${targetPath}`;
}
