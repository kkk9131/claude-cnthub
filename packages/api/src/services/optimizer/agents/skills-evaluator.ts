/**
 * Skills 評価エージェント
 *
 * 各スキルの最適化結果を評価する。
 * - 行数が30行以内か
 * - 参照リンクが有効か
 * - フォーマットが段階的開示ルールに準拠しているか
 */

import { existsSync } from "fs";
import { join } from "path";
import type { EvaluationResult } from "@claude-cnthub/shared";
import type { SkillOptimizeResult } from "./skills-optimizer";
import { extractReferences } from "../utils";

/**
 * スキル評価結果
 */
export interface SkillEvaluation extends EvaluationResult {
  /** スキル名 */
  skillName: string;
  /** 最適化結果への参照 */
  optimizeResult: SkillOptimizeResult;
}

const TARGET_LINE_COUNT = 30;

/**
 * 複数スキルの最適化結果を評価
 *
 * @param optimizeResults - 最適化結果の配列
 * @param projectPath - プロジェクトのルートパス
 * @returns 評価結果の配列
 */
export async function evaluateSkills(
  optimizeResults: SkillOptimizeResult[],
  projectPath: string
): Promise<SkillEvaluation[]> {
  const evaluations: SkillEvaluation[] = [];

  for (const result of optimizeResults) {
    const evaluation = await evaluateSingleSkill(result, projectPath);
    evaluations.push(evaluation);
  }

  return evaluations;
}

/**
 * 単一スキルの最適化結果を評価
 */
async function evaluateSingleSkill(
  optimizeResult: SkillOptimizeResult,
  projectPath: string
): Promise<SkillEvaluation> {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const invalidReferences: string[] = [];

  // 最適化自体が失敗した場合
  if (!optimizeResult.success) {
    issues.push(
      `最適化処理が失敗しました: ${optimizeResult.error || "不明なエラー"}`
    );
    return {
      passed: false,
      skillName: optimizeResult.skillName,
      lineCount: optimizeResult.lineCountAfter,
      targetLineCount: TARGET_LINE_COUNT,
      invalidReferences: [],
      issues,
      suggestions: ["最適化処理を再実行してください"],
      optimizeResult,
    };
  }

  const lineCount = optimizeResult.optimizedContent.split("\n").length;

  // 行数チェック
  if (lineCount > TARGET_LINE_COUNT) {
    issues.push(
      `スキル「${optimizeResult.skillName}」は${lineCount}行で、目標の${TARGET_LINE_COUNT}行を超えています`
    );
    suggestions.push(
      `さらに${lineCount - TARGET_LINE_COUNT}行削減する必要があります`
    );
    suggestions.push("詳細な説明をreferences/やexamples/に分離してください");
  }

  // 参照リンクの有効性チェック
  const references = extractReferences(optimizeResult.optimizedContent);
  for (const ref of references) {
    const refPath = join(projectPath, ".claude", ref);

    // 抽出されたファイルに含まれるかチェック
    const isExtracted = optimizeResult.extractedFiles.some(
      (f) => f.path === ref
    );

    // ファイルが存在するかチェック
    if (!isExtracted && !existsSync(refPath)) {
      invalidReferences.push(ref);
      issues.push(`参照先「${ref}」が存在しません`);
    }
  }

  // 合格判定
  const passed =
    lineCount <= TARGET_LINE_COUNT && invalidReferences.length === 0;

  return {
    passed,
    skillName: optimizeResult.skillName,
    lineCount,
    targetLineCount: TARGET_LINE_COUNT,
    invalidReferences,
    issues,
    suggestions,
    optimizeResult,
  };
}
