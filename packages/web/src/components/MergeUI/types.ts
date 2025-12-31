/**
 * MergeUI コンポーネントの型定義
 */

import type { Merge } from "@claude-cnthub/shared";

/**
 * セッションの簡易型（UI表示用）
 */
export interface SessionItem {
  sessionId: string;
  name: string;
  status: "idle" | "active" | "completed" | "error";
  createdAt: string;
  updatedAt: string;
  workingDir?: string;
}

/**
 * MergePanel のProps
 */
export interface MergePanelProps {
  /** 初期選択されたセッション */
  initialSelectedSessions?: SessionItem[];
  /** マージ完了時のコールバック */
  onMergeComplete?: (merge: Merge) => void;
  /** プロジェクトID（マージ時に関連付け） */
  projectId?: string;
  /** カスタムクラス名 */
  className?: string;
}

/**
 * MergePreview のProps
 */
export interface MergePreviewProps {
  /** プレビュー対象のセッション */
  sessions: SessionItem[];
  /** カスタムクラス名 */
  className?: string;
}

/**
 * MergeHistory のProps
 */
export interface MergeHistoryProps {
  /** プロジェクトIDでフィルタ */
  projectId?: string;
  /** 1ページあたりの件数 */
  limit?: number;
  /** カスタムクラス名 */
  className?: string;
  /** 履歴アイテムクリック時のコールバック */
  onItemClick?: (merge: Merge) => void;
}

/**
 * マージ履歴アイテムのProps
 */
export interface MergeHistoryItemProps {
  merge: Merge;
  onClick?: (merge: Merge) => void;
}
