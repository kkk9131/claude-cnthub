/**
 * 最適化エージェント関連の型定義
 *
 * CLAUDE.md（100行以内）と Skills（30行以内）を
 * 段階的開示ルールに従って最適化するための型定義。
 */

/**
 * 最適化対象の種類
 */
export type OptimizeTarget = "claude-md" | "skills";

/**
 * 最適化リクエスト
 */
export interface OptimizeRequest {
  /** プロジェクトパス */
  projectPath: string;
  /** グローバルパス（~/.claude） */
  globalPath?: string;
  /** 最適化対象 */
  targets: OptimizeTarget[];
  /** ドライラン（変更を適用しない） */
  dryRun?: boolean;
}

/**
 * 最適化結果
 */
export interface OptimizeResult {
  /** 成功フラグ */
  success: boolean;
  /** 変更一覧 */
  changes: OptimizeChange[];
  /** エラー一覧 */
  errors: string[];
  /** リトライ回数 */
  retryCount: number;
}

/**
 * 最適化による変更
 */
export interface OptimizeChange {
  /** 変更ID */
  id: string;
  /** 変更種別 */
  type: OptimizeTarget;
  /** ファイルパス */
  filePath: string;
  /** 元のコンテンツ */
  originalContent: string;
  /** 最適化後のコンテンツ */
  optimizedContent: string;
  /** 抽出されたファイル */
  extractedFiles: ExtractedFile[];
  /** 最適化前の行数 */
  lineCountBefore: number;
  /** 最適化後の行数 */
  lineCountAfter: number;
}

/**
 * 抽出されたファイル
 */
export interface ExtractedFile {
  /** ファイルパス */
  path: string;
  /** コンテンツ */
  content: string;
  /** 参照タイプ */
  referenceType: "rule" | "reference" | "example";
}

/**
 * エージェントの状態
 */
export type AgentStatus =
  | "pending"
  | "running"
  | "completed"
  | "error"
  | "retrying";

/**
 * エージェントの進捗
 */
export interface AgentProgress {
  /** エージェント名 */
  agentName: string;
  /** 状態 */
  status: AgentStatus;
  /** メッセージ */
  message?: string;
  /** 進捗（0-100） */
  progress?: number;
}

/**
 * 参照エージェントの分析結果
 */
export interface AnalysisResult {
  /** ファイルパス */
  path: string;
  /** 行数 */
  lineCount: number;
  /** セクション一覧 */
  sections: string[];
  /** 既存の参照リンク */
  existingReferences: string[];
  /** 問題点 */
  issues: string[];
  /** 抽出候補 */
  extractionCandidates: ExtractionCandidate[];
}

/**
 * 抽出候補
 */
export interface ExtractionCandidate {
  /** 抽出対象のコンテンツ */
  content: string;
  /** 抽出先パス */
  targetPath: string;
  /** 参照タイプ */
  type: "rule" | "reference" | "example";
  /** 抽出理由 */
  reason: string;
}

/**
 * 評価エージェントの評価結果
 */
export interface EvaluationResult {
  /** 合格フラグ */
  passed: boolean;
  /** 行数 */
  lineCount: number;
  /** 目標行数 */
  targetLineCount: number;
  /** 無効な参照リンク */
  invalidReferences: string[];
  /** 問題点 */
  issues: string[];
  /** 改善案 */
  suggestions: string[];
}

/**
 * バックアップ情報
 */
export interface BackupInfo {
  /** バックアップID */
  id: string;
  /** 元のファイルパス */
  originalPath: string;
  /** バックアップファイルパス */
  backupPath: string;
  /** 作成日時 */
  createdAt: Date;
}

/**
 * 最適化設定（行数制限）
 */
export const OPTIMIZE_LIMITS = {
  /** CLAUDE.md の目標行数 */
  CLAUDE_MD_MAX_LINES: 100,
  /** SKILL.md の目標行数 */
  SKILL_MAX_LINES: 30,
  /** 最大リトライ回数 */
  MAX_RETRY_COUNT: 2,
} as const;
