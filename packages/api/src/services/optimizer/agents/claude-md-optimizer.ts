/**
 * CLAUDE.md 修正エージェント
 *
 * CLAUDE.md を100行以内に最適化する。
 * 長いセクションを Agent-docs/ に分離し、
 * 元のファイルには参照テーブルを追加する。
 */

import { mkdirSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
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
 * 抽出情報（参照テーブル生成用）
 */
interface ExtractionInfo {
  targetPath: string;
  sectionName: string;
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
    const extractionInfos: ExtractionInfo[] = [];
    let optimizedContent = analysis.content;

    for (const candidate of analysis.extractionCandidates) {
      // 抽出先ディレクトリを作成（Agent-docs/ はプロジェクトルート直下）
      const targetPath = join(projectPath, candidate.targetPath);
      const targetDir = dirname(targetPath);
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      // 抽出ファイルの内容を準備
      const extractedContent = formatExtractedContent(candidate.content);

      // セクション名を抽出
      const sectionName = extractSectionName(candidate.content);

      extractedFiles.push({
        path: candidate.targetPath,
        content: extractedContent,
        referenceType: candidate.type,
      });

      extractionInfos.push({
        targetPath: candidate.targetPath,
        sectionName,
      });

      // 元のコンテンツから抽出部分を削除
      optimizedContent = removeSection(optimizedContent, candidate.content);
    }

    // 参照テーブルを追加
    optimizedContent = addReferenceTable(optimizedContent, extractionInfos);

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
 * セクション名を抽出
 */
function extractSectionName(content: string): string {
  const headerMatch = content.match(/^##\s+(.+)$/m);
  return headerMatch ? headerMatch[1].trim() : "詳細";
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
 * セクションを削除
 */
function removeSection(content: string, sectionContent: string): string {
  // セクションヘッダーを抽出
  const headerMatch = sectionContent.match(/^(##\s+.+)$/m);
  const header = headerMatch ? headerMatch[1] : "";

  // 完全一致で削除を試みる
  if (content.includes(sectionContent.trim())) {
    return content
      .replace(sectionContent.trim(), "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  // セクションヘッダーを探して削除
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

      // セクションを削除
      const newLines = [
        ...lines.slice(0, headerIndex),
        ...lines.slice(endIndex),
      ];
      return newLines
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }
  }

  return content;
}

/**
 * 参照テーブルを追加
 */
function addReferenceTable(
  content: string,
  extractionInfos: ExtractionInfo[]
): string {
  if (extractionInfos.length === 0) {
    return content;
  }

  // 既存の参照セクションがあれば削除
  const existingRefPattern = /\n## 参照先[\s\S]*$/;
  let cleanedContent = content.replace(existingRefPattern, "").trim();

  // 参照テーブルを生成
  const tableRows = extractionInfos
    .map((info) => {
      const fileName = basename(info.targetPath);
      return `| [${fileName}](${info.targetPath}) | ${info.sectionName} |`;
    })
    .join("\n");

  const referenceSection = `

## 参照先

### 詳細仕様: \`Agent-docs/\`

| ドキュメント | 内容 |
|-------------|------|
${tableRows}
`;

  return cleanedContent + referenceSection;
}
