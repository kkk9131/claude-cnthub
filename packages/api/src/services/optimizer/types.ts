/**
 * 最適化オーケストレーター型定義
 */

import type {
  OptimizeRequest,
  OptimizeResult,
  OptimizeChange,
  AgentProgress,
  ExtractedFile,
} from "@claude-cnthub/shared";

export type {
  OptimizeRequest,
  OptimizeResult,
  OptimizeChange,
  AgentProgress,
  ExtractedFile,
};

/**
 * 最適化実行オプション
 */
export interface OptimizeOptions {
  /** 最大リトライ回数 */
  maxRetries?: number;
  /** 進捗コールバック */
  onProgress?: (progress: AgentProgress[]) => void;
}

/**
 * バックアップ管理
 */
export interface BackupManager {
  /** バックアップを作成 */
  create(filePath: string, content: string): Promise<string>;
  /** バックアップから復元 */
  restore(backupId: string): Promise<void>;
  /** バックアップを削除 */
  remove(backupId: string): Promise<void>;
  /** 全バックアップを削除 */
  clear(): Promise<void>;
}

/**
 * 最適化ステージ
 */
export type OptimizeStage =
  | "analyze"
  | "optimize"
  | "evaluate"
  | "retry"
  | "complete"
  | "error";

/**
 * オーケストレーター状態
 */
export interface OrchestratorState {
  /** 現在のステージ */
  stage: OptimizeStage;
  /** リトライ回数 */
  retryCount: number;
  /** エラー */
  errors: string[];
  /** 変更一覧 */
  changes: OptimizeChange[];
}
