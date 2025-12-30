/**
 * Merge 型定義
 *
 * 複数セッションの要約をマージした結果を表す型。
 */

/**
 * マージのステータス
 */
export type MergeStatus = "pending" | "processing" | "completed" | "error";

/**
 * マージエントリ
 */
export interface Merge {
  /** マージID（プライマリキー） */
  mergeId: string;
  /** 元セッションIDリスト（JSON配列） */
  sourceSessionIds: string[];
  /** マージ後の統合要約 */
  resultSummary: string;
  /** 統合された詳細要約 */
  resultDetailedSummary?: string;
  /** マージステータス */
  status: MergeStatus;
  /** 関連プロジェクトID */
  projectId?: string;
  /** エラーメッセージ（失敗時） */
  error?: string;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * マージ作成リクエスト
 */
export interface CreateMergeRequest {
  /** マージ対象のセッションIDリスト（2件以上必須） */
  sourceSessionIds: string[];
  /** 関連プロジェクトID */
  projectId?: string;
}

/**
 * マージ一覧レスポンス
 */
export interface MergeListResponse {
  items: Merge[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
