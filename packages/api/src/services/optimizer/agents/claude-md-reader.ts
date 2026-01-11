/**
 * CLAUDE.md 参照エージェント
 *
 * CLAUDE.md の構造を分析し、最適化のための情報を抽出する。
 * 読み取り専用操作のみを行い、ファイルの変更は行わない。
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type {
  AnalysisResult,
  ExtractionCandidate,
} from "@claude-cnthub/shared";
import {
  extractReferences,
  extractSections,
  determineReferenceType,
} from "../utils";

/**
 * CLAUDE.md 分析結果の型
 */
export interface ClaudeMdAnalysis extends AnalysisResult {
  /** 元のコンテンツ */
  content: string;
}

/**
 * CLAUDE.md を読み取り、分析結果を返す
 *
 * @param projectPath - プロジェクトのルートパス
 * @returns 分析結果
 */
export async function readClaudeMd(
  projectPath: string
): Promise<ClaudeMdAnalysis> {
  const claudeMdPath = join(projectPath, ".claude", "CLAUDE.md");

  // ファイルが存在しない場合は空の分析結果を返す
  if (!existsSync(claudeMdPath)) {
    return createEmptyAnalysis(claudeMdPath);
  }

  const content = readFileSync(claudeMdPath, "utf-8");
  const lines = content.split("\n");
  const lineCount = lines.length;

  // セクションを抽出
  const sections = extractSections(lines);

  // 参照リンクを抽出
  const existingReferences = extractReferences(content);

  // 問題点を特定
  const issues = identifyIssues(lineCount, sections, content);

  // 抽出候補を特定
  const extractionCandidates = identifyExtractionCandidates(lines, sections);

  return {
    path: claudeMdPath,
    content,
    lineCount,
    sections,
    existingReferences,
    issues,
    extractionCandidates,
  };
}

/**
 * 空の分析結果を作成
 */
function createEmptyAnalysis(path: string): ClaudeMdAnalysis {
  return {
    path,
    content: "",
    lineCount: 0,
    sections: [],
    existingReferences: [],
    issues: [],
    extractionCandidates: [],
  };
}

/**
 * 問題点を特定
 */
function identifyIssues(
  lineCount: number,
  sections: string[],
  content: string
): string[] {
  const issues: string[] = [];
  const MAX_LINES = 100; // OPTIMIZE_LIMITS.CLAUDE_MD_MAX_LINES

  // 行数超過
  if (lineCount > MAX_LINES) {
    issues.push(`行数が${lineCount}行で、目標の${MAX_LINES}行を超えています`);
  }

  // セクションが多すぎる
  if (sections.length > 10) {
    issues.push(
      `セクションが${sections.length}個あります。統合または分離を検討してください`
    );
  }

  // コードブロックが多い
  const codeBlockCount = (content.match(/```/g) || []).length / 2;
  if (codeBlockCount > 5) {
    issues.push(
      `コードブロックが${codeBlockCount}個あります。examples/ への分離を検討してください`
    );
  }

  return issues;
}

/**
 * 抽出候補を特定
 */
function identifyExtractionCandidates(
  lines: string[],
  sections: string[]
): ExtractionCandidate[] {
  const candidates: ExtractionCandidate[] = [];
  const sectionPattern = /^##\s+(.+)$/;

  // 各セクションの開始位置と行数を計算
  const sectionPositions: { name: string; start: number; end: number }[] = [];
  let currentSection: { name: string; start: number } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(sectionPattern);
    if (match) {
      if (currentSection) {
        sectionPositions.push({
          ...currentSection,
          end: i - 1,
        });
      }
      currentSection = { name: match[1].trim(), start: i };
    }
  }

  // 最後のセクションを追加
  if (currentSection) {
    sectionPositions.push({
      ...currentSection,
      end: lines.length - 1,
    });
  }

  // 長いセクションを抽出候補として追加
  const SECTION_THRESHOLD = 20; // 20行以上のセクションは抽出候補

  for (const section of sectionPositions) {
    const sectionLength = section.end - section.start + 1;
    if (sectionLength > SECTION_THRESHOLD) {
      const sectionContent = lines
        .slice(section.start, section.end + 1)
        .join("\n");
      const targetType = determineReferenceType(section.name);
      const targetPath = generateTargetPath(section.name, targetType);

      candidates.push({
        content: sectionContent,
        targetPath,
        type: targetType,
        reason: `セクション「${section.name}」は${sectionLength}行あり、分離を推奨します`,
      });
    }
  }

  return candidates;
}

/**
 * 抽出先パスを生成
 */
function generateTargetPath(
  sectionName: string,
  type: "rule" | "reference" | "example"
): string {
  // セクション名をファイル名に変換（kebab-case）
  const fileName = sectionName
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const dirMap = {
    rule: "rules",
    reference: "references",
    example: "examples",
  };

  return `${dirMap[type]}/${fileName}.md`;
}
