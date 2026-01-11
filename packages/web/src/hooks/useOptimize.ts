/**
 * 最適化フック
 *
 * 最適化APIとの連携を管理するカスタムフック
 */

import { useState, useCallback } from "react";
import type {
  OptimizeResult,
  OptimizeChange,
  AgentProgress,
} from "@claude-cnthub/shared";

/**
 * 最適化リクエスト
 */
interface OptimizeRequest {
  projectPath: string;
  globalPath?: string;
  targets?: ("claude-md" | "skills")[];
}

/**
 * 最適化フックの戻り値
 */
interface UseOptimizeReturn {
  /** 実行中フラグ */
  isRunning: boolean;
  /** 適用中フラグ */
  isApplying: boolean;
  /** 進捗情報 */
  progress: AgentProgress[];
  /** 最適化結果 */
  result: OptimizeResult | null;
  /** エラー */
  error: string | null;
  /** 最適化を開始 */
  startOptimize: (request: OptimizeRequest) => Promise<OptimizeResult | null>;
  /** 変更を適用 */
  applyChanges: (changes: OptimizeChange[]) => Promise<boolean>;
  /** リセット */
  reset: () => void;
}

/**
 * 最適化フック
 */
export function useOptimize(): UseOptimizeReturn {
  const [isRunning, setIsRunning] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [progress, setProgress] = useState<AgentProgress[]>([]);
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [projectPath, setProjectPath] = useState<string>("");

  /**
   * 最適化を開始
   */
  const startOptimize = useCallback(
    async (request: OptimizeRequest): Promise<OptimizeResult | null> => {
      setIsRunning(true);
      setError(null);
      setResult(null);
      setProgress([]);
      setProjectPath(request.projectPath);

      try {
        const response = await fetch("/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectPath: request.projectPath,
            globalPath: request.globalPath,
            targets: request.targets ?? ["claude-md", "skills"],
            dryRun: true,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.message || "最適化に失敗しました");
        }

        const optimizeResult: OptimizeResult = await response.json();
        setResult(optimizeResult);
        return optimizeResult;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "最適化に失敗しました";
        setError(message);
        return null;
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  /**
   * 変更を適用
   */
  const applyChanges = useCallback(
    async (changes: OptimizeChange[]): Promise<boolean> => {
      if (changes.length === 0) {
        setError("適用する変更がありません");
        return false;
      }

      setIsApplying(true);
      setError(null);

      try {
        const response = await fetch("/api/optimize/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            changes,
            projectPath,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.message || "変更の適用に失敗しました");
        }

        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "変更の適用に失敗しました";
        setError(message);
        return false;
      } finally {
        setIsApplying(false);
      }
    },
    [projectPath]
  );

  /**
   * リセット
   */
  const reset = useCallback(() => {
    setIsRunning(false);
    setIsApplying(false);
    setProgress([]);
    setResult(null);
    setError(null);
    setProjectPath("");
  }, []);

  return {
    isRunning,
    isApplying,
    progress,
    result,
    error,
    startOptimize,
    applyChanges,
    reset,
  };
}
