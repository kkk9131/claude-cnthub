/**
 * 最適化オーケストレーター
 *
 * 最適化処理の全体制御を行う。
 * - 参照エージェント（並列）で分析
 * - 修正エージェント（並列）で最適化
 * - 評価エージェント（並列）で検証
 * - 評価失敗時は最大2回リトライ
 */

import { generateId } from "../../repositories/base";
import type {
  OptimizeRequest,
  OptimizeResult,
  OptimizeChange,
  AgentProgress,
  OptimizeOptions,
} from "./types";
import {
  readClaudeMd,
  readSkills,
  optimizeClaudeMd,
  optimizeSkills,
  evaluateClaudeMd,
  evaluateSkills,
  type ClaudeMdAnalysis,
  type SkillAnalysis,
  type ClaudeMdOptimizeResult,
  type SkillOptimizeResult,
  type ClaudeMdEvaluation,
  type SkillEvaluation,
} from "./agents";

const DEFAULT_MAX_RETRIES = 2;

/**
 * 最適化を実行
 *
 * @param request - 最適化リクエスト
 * @param options - オプション
 * @returns 最適化結果
 */
export async function runOptimization(
  request: OptimizeRequest,
  options: OptimizeOptions = {}
): Promise<OptimizeResult> {
  const { maxRetries = DEFAULT_MAX_RETRIES, onProgress } = options;
  const changes: OptimizeChange[] = [];
  const errors: string[] = [];
  let retryCount = 0;

  // 空のターゲットの場合は早期リターン
  if (request.targets.length === 0) {
    return {
      success: true,
      changes: [],
      errors: [],
      retryCount: 0,
    };
  }

  const progress: AgentProgress[] = [];

  const updateProgress = (
    agentName: string,
    status: AgentProgress["status"],
    message?: string
  ) => {
    const existing = progress.find((p) => p.agentName === agentName);
    if (existing) {
      existing.status = status;
      existing.message = message;
    } else {
      progress.push({ agentName, status, message });
    }
    onProgress?.(progress);
  };

  try {
    // Phase 1: 分析（参照エージェント）
    let claudeMdAnalysis: ClaudeMdAnalysis | null = null;
    let skillsAnalyses: SkillAnalysis[] = [];

    if (request.targets.includes("claude-md")) {
      updateProgress("claude-md-reader", "running", "CLAUDE.md を分析中");
      claudeMdAnalysis = await readClaudeMd(request.projectPath);
      updateProgress("claude-md-reader", "completed", "分析完了");
    }

    if (request.targets.includes("skills")) {
      updateProgress("skills-reader", "running", "Skills を分析中");
      skillsAnalyses = await readSkills(request.projectPath);
      updateProgress("skills-reader", "completed", "分析完了");
    }

    // Phase 2: 最適化（修正エージェント）
    let claudeMdOptimizeResult: ClaudeMdOptimizeResult | null = null;
    let skillsOptimizeResults: SkillOptimizeResult[] = [];

    if (claudeMdAnalysis && claudeMdAnalysis.lineCount > 0) {
      updateProgress("claude-md-optimizer", "running", "CLAUDE.md を最適化中");
      claudeMdOptimizeResult = await optimizeClaudeMd(
        claudeMdAnalysis,
        request.projectPath
      );
      updateProgress("claude-md-optimizer", "completed", "最適化完了");
    }

    if (skillsAnalyses.length > 0) {
      updateProgress("skills-optimizer", "running", "Skills を最適化中");
      skillsOptimizeResults = await optimizeSkills(
        skillsAnalyses,
        request.projectPath
      );
      updateProgress("skills-optimizer", "completed", "最適化完了");
    }

    // Phase 3: 評価（評価エージェント）とリトライ
    let claudeMdEvaluation: ClaudeMdEvaluation | null = null;
    let skillsEvaluations: SkillEvaluation[] = [];
    let allPassed = false;

    while (!allPassed && retryCount < maxRetries) {
      allPassed = true;

      // CLAUDE.md 評価
      if (claudeMdOptimizeResult) {
        updateProgress(
          "claude-md-evaluator",
          retryCount > 0 ? "retrying" : "running",
          `評価中 (試行 ${retryCount + 1})`
        );
        claudeMdEvaluation = await evaluateClaudeMd(
          claudeMdOptimizeResult,
          request.projectPath
        );

        if (!claudeMdEvaluation.passed) {
          allPassed = false;
          if (retryCount < maxRetries) {
            // リトライ: 再最適化
            claudeMdOptimizeResult = await optimizeClaudeMd(
              claudeMdAnalysis!,
              request.projectPath
            );
          }
        }
        updateProgress(
          "claude-md-evaluator",
          claudeMdEvaluation.passed ? "completed" : "error",
          claudeMdEvaluation.passed
            ? "評価合格"
            : `評価失敗: ${claudeMdEvaluation.issues.join(", ")}`
        );
      }

      // Skills 評価
      if (skillsOptimizeResults.length > 0) {
        updateProgress(
          "skills-evaluator",
          retryCount > 0 ? "retrying" : "running",
          `評価中 (試行 ${retryCount + 1})`
        );
        skillsEvaluations = await evaluateSkills(
          skillsOptimizeResults,
          request.projectPath
        );

        const failedSkills = skillsEvaluations.filter((e) => !e.passed);
        if (failedSkills.length > 0) {
          allPassed = false;
          if (retryCount < maxRetries) {
            // リトライ: 失敗したスキルのみ再最適化
            const failedAnalyses = skillsAnalyses.filter((a) =>
              failedSkills.some((f) => f.skillName === a.skillName)
            );
            const reoptimized = await optimizeSkills(
              failedAnalyses,
              request.projectPath
            );

            // 結果をマージ
            skillsOptimizeResults = skillsOptimizeResults.map((r) => {
              const updated = reoptimized.find(
                (u) => u.skillName === r.skillName
              );
              return updated || r;
            });
          }
        }
        updateProgress(
          "skills-evaluator",
          failedSkills.length === 0 ? "completed" : "error",
          failedSkills.length === 0
            ? "評価合格"
            : `${failedSkills.length}個のスキルが評価失敗`
        );
      }

      if (!allPassed) {
        retryCount++;
      }
    }

    // 変更一覧を構築
    if (claudeMdOptimizeResult && claudeMdAnalysis) {
      const change: OptimizeChange = {
        id: generateId(),
        type: "claude-md",
        filePath: claudeMdAnalysis.path,
        originalContent: claudeMdAnalysis.content,
        optimizedContent: claudeMdOptimizeResult.optimizedContent,
        extractedFiles: claudeMdOptimizeResult.extractedFiles,
        lineCountBefore: claudeMdOptimizeResult.lineCountBefore,
        lineCountAfter: claudeMdOptimizeResult.lineCountAfter,
      };
      changes.push(change);
    }

    for (let i = 0; i < skillsOptimizeResults.length; i++) {
      const result = skillsOptimizeResults[i];
      const analysis = skillsAnalyses[i];
      if (result && analysis) {
        const change: OptimizeChange = {
          id: generateId(),
          type: "skills",
          filePath: analysis.path,
          originalContent: analysis.content,
          optimizedContent: result.optimizedContent,
          extractedFiles: result.extractedFiles,
          lineCountBefore: result.lineCountBefore,
          lineCountAfter: result.lineCountAfter,
        };
        changes.push(change);
      }
    }

    // エラー収集
    if (claudeMdEvaluation && !claudeMdEvaluation.passed) {
      errors.push(...claudeMdEvaluation.issues);
    }
    for (const evaluation of skillsEvaluations) {
      if (!evaluation.passed) {
        errors.push(...evaluation.issues);
      }
    }

    return {
      success: errors.length === 0,
      changes,
      errors,
      retryCount,
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Unknown error");
    return {
      success: false,
      changes,
      errors,
      retryCount,
    };
  }
}

/**
 * 変更を適用（dryRun: false の場合）
 *
 * @param changes - 適用する変更
 * @param projectPath - プロジェクトパス
 */
export async function applyChanges(
  changes: OptimizeChange[],
  projectPath: string
): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];

  try {
    const { writeFileSync, mkdirSync } = await import("fs");
    const { join, dirname } = await import("path");

    for (const change of changes) {
      // 最適化されたファイルを書き込み
      writeFileSync(change.filePath, change.optimizedContent);

      // 抽出されたファイルを書き込み
      for (const extracted of change.extractedFiles) {
        const extractedPath = join(projectPath, ".claude", extracted.path);
        const extractedDir = dirname(extractedPath);
        mkdirSync(extractedDir, { recursive: true });
        writeFileSync(extractedPath, extracted.content);
      }
    }

    return { success: true, errors: [] };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Unknown error");
    return { success: false, errors };
  }
}
