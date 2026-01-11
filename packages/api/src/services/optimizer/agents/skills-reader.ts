/**
 * Skills 参照エージェント
 *
 * .claude/skills/ 内の各スキルファイルを分析し、
 * 最適化のための情報を抽出する。
 * 読み取り専用操作のみを行い、ファイルの変更は行わない。
 */

import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, basename, dirname } from "path";
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
 * スキル分析結果の型
 */
export interface SkillAnalysis extends AnalysisResult {
  /** スキル名 */
  skillName: string;
  /** 元のコンテンツ */
  content: string;
  /** トリガー */
  trigger?: string;
  /** 説明 */
  description?: string;
}

/**
 * 全スキルファイルを読み取り、分析結果を返す
 *
 * 対応するディレクトリ構造:
 * 1. skills/{skill-name}/SKILL.md (推奨)
 * 2. skills/{skill-name}.md (直接配置)
 *
 * @param projectPath - プロジェクトのルートパス
 * @returns スキル分析結果の配列
 */
export async function readSkills(
  projectPath: string
): Promise<SkillAnalysis[]> {
  const skillsDir = join(projectPath, ".claude", "skills");

  // ディレクトリが存在しない場合は空配列を返す
  if (!existsSync(skillsDir)) {
    return [];
  }

  const entries = readdirSync(skillsDir);
  const analyses: SkillAnalysis[] = [];

  for (const entry of entries) {
    const entryPath = join(skillsDir, entry);
    const stat = statSync(entryPath);

    // パターン1: サブディレクトリ内の SKILL.md
    if (stat.isDirectory()) {
      const skillMdPath = join(entryPath, "SKILL.md");
      if (existsSync(skillMdPath)) {
        const analysis = analyzeSkillFile(skillMdPath, entry);
        analyses.push(analysis);
      }
      continue;
    }

    // パターン2: 直接配置された .md ファイル
    if (stat.isFile() && entry.endsWith(".md") && !entry.startsWith(".")) {
      const analysis = analyzeSkillFile(entryPath);
      analyses.push(analysis);
    }
  }

  return analyses;
}

/**
 * 単一スキルファイルを分析
 *
 * @param filePath - スキルファイルのパス
 * @param overrideSkillName - スキル名を上書きする場合に指定（サブディレクトリ名など）
 */
function analyzeSkillFile(
  filePath: string,
  overrideSkillName?: string
): SkillAnalysis {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const lineCount = lines.length;
  // サブディレクトリ構造の場合はディレクトリ名、直接配置の場合はファイル名
  const skillName = overrideSkillName || basename(filePath, ".md");

  // メタデータを抽出
  const trigger = extractMetadata(content, "trigger");
  const description = extractMetadata(content, "description");

  // セクションを抽出
  const sections = extractSections(lines);

  // 参照リンクを抽出
  const existingReferences = extractReferences(content);

  // 問題点を特定
  const issues = identifyIssues(lineCount, skillName);

  // 抽出候補を特定
  const extractionCandidates = identifyExtractionCandidates(
    lines,
    skillName,
    lineCount
  );

  return {
    path: filePath,
    skillName,
    content,
    lineCount,
    sections,
    existingReferences,
    issues,
    extractionCandidates,
    trigger,
    description,
  };
}

/**
 * メタデータを抽出（description:, trigger: など）
 */
function extractMetadata(content: string, key: string): string | undefined {
  const pattern = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const match = content.match(pattern);
  return match?.[1]?.trim();
}

/**
 * 問題点を特定
 */
function identifyIssues(lineCount: number, skillName: string): string[] {
  const issues: string[] = [];
  const MAX_LINES = 30; // OPTIMIZE_LIMITS.SKILL_MAX_LINES

  // 行数超過
  if (lineCount > MAX_LINES) {
    issues.push(
      `スキル「${skillName}」は${lineCount}行で、目標の${MAX_LINES}行を超えています`
    );
  }

  return issues;
}

/**
 * 抽出候補を特定
 */
function identifyExtractionCandidates(
  lines: string[],
  skillName: string,
  lineCount: number
): ExtractionCandidate[] {
  const candidates: ExtractionCandidate[] = [];
  const MAX_LINES = 30;

  // 30行を超える場合、詳細部分を抽出候補とする
  if (lineCount > MAX_LINES) {
    // セクションごとに分析
    const sectionPattern = /^##\s+(.+)$/;
    let currentSection: { name: string; start: number } | null = null;
    const sectionPositions: { name: string; start: number; end: number }[] = [];

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

    if (currentSection) {
      sectionPositions.push({
        ...currentSection,
        end: lines.length - 1,
      });
    }

    // 長いセクションを抽出候補に追加
    for (const section of sectionPositions) {
      const sectionLength = section.end - section.start + 1;
      if (sectionLength > 10) {
        const sectionContent = lines
          .slice(section.start, section.end + 1)
          .join("\n");
        const targetType = determineReferenceType(section.name);
        const targetPath = generateTargetPath(
          skillName,
          section.name,
          targetType
        );

        candidates.push({
          content: sectionContent,
          targetPath,
          type: targetType,
          reason: `セクション「${section.name}」は${sectionLength}行あり、分離を推奨します`,
        });
      }
    }

    // セクションがない場合はファイル全体を対象
    if (sectionPositions.length === 0 && lineCount > MAX_LINES) {
      candidates.push({
        content: lines.slice(5).join("\n"), // 最初の5行（タイトル+メタデータ）を除く
        targetPath: `references/${skillName}-detail.md`,
        type: "reference",
        reason: `スキル全体が${lineCount}行あり、詳細をreferencesに分離を推奨します`,
      });
    }
  }

  return candidates;
}

/**
 * 抽出先パスを生成
 */
function generateTargetPath(
  skillName: string,
  sectionName: string,
  type: "rule" | "reference" | "example"
): string {
  const dirMap = {
    rule: "rules",
    reference: "references",
    example: "examples",
  };

  return `${dirMap[type]}/${skillName}-${sectionName
    .toLowerCase()
    .replace(/\s+/g, "-")}.md`;
}
