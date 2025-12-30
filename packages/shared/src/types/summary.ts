/**
 * 要約拡張型定義
 *
 * 段階的開示システム Level 1 用の詳細要約型。
 * 既存の SessionSummary を拡張し、以下を追加:
 * - 変更差分: コード変更の概要
 * - エラー履歴: セッション中に発生したエラー
 * - 決定事項: 重要な設計・実装の決定
 */

/**
 * 変更差分情報
 *
 * ファイルへの変更内容を記録。
 */
export interface ChangeDiff {
  /** 変更されたファイルパス */
  filePath: string;
  /** 変更タイプ */
  changeType: "create" | "modify" | "delete" | "rename";
  /** 変更の概要説明 */
  summary: string;
  /** 追加行数 */
  additions?: number;
  /** 削除行数 */
  deletions?: number;
}

/**
 * エラー履歴エントリ
 *
 * セッション中に発生したエラーを記録。
 */
export interface ErrorEntry {
  /** エラーID（一意識別子） */
  errorId: string;
  /** エラータイプ */
  errorType: "build" | "test" | "runtime" | "lint" | "other";
  /** エラーメッセージ */
  message: string;
  /** 発生時刻 */
  timestamp: Date;
  /** 解決済みフラグ */
  resolved: boolean;
  /** 解決方法（解決済みの場合） */
  resolution?: string;
}

/**
 * 決定事項エントリ
 *
 * セッション中の重要な決定を記録。
 */
export interface DecisionEntry {
  /** 決定ID（一意識別子） */
  decisionId: string;
  /** 決定のタイトル */
  title: string;
  /** 決定の詳細説明 */
  description: string;
  /** 決定の理由・背景 */
  rationale?: string;
  /** 決定のカテゴリ */
  category: "architecture" | "implementation" | "library" | "design" | "other";
  /** 決定時刻 */
  timestamp: Date;
  /** 代替案（検討した他の選択肢） */
  alternatives?: string[];
}

/**
 * 拡張セッション要約（Level 1）
 *
 * 基本の SessionSummary に加えて詳細情報を含む。
 */
export interface ExtendedSessionSummary {
  /** 基本の要約ID */
  summaryId: string;
  /** セッションID */
  sessionId: string;
  /** 短い要約（1-2文） */
  shortSummary: string;
  /** 詳細な要約（3-5文） */
  detailedSummary: string;
  /** 重要な決定事項（レガシー: 文字列配列） */
  keyDecisions: string[];
  /** 変更されたファイル一覧 */
  filesModified: string[];
  /** 使用したツール一覧 */
  toolsUsed: string[];
  /** トピック・キーワード */
  topics: string[];
  /** 元のトークン数 */
  originalTokenCount: number;
  /** 要約後のトークン数 */
  summaryTokenCount: number;
  /** 圧縮率 */
  compressionRatio: number;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;

  // === 拡張フィールド（Phase 6） ===

  /** 変更差分の詳細 */
  changes: ChangeDiff[];
  /** エラー履歴 */
  errors: ErrorEntry[];
  /** 構造化された決定事項 */
  decisions: DecisionEntry[];
}

/**
 * 要約作成時の拡張入力
 */
export interface ExtendedSummaryInput {
  /** セッションID */
  sessionId: string;
  /** 短い要約 */
  shortSummary: string;
  /** 詳細な要約 */
  detailedSummary: string;
  /** 重要な決定事項（文字列配列） */
  keyDecisions: string[];
  /** 変更されたファイル一覧 */
  filesModified: string[];
  /** 使用したツール一覧 */
  toolsUsed: string[];
  /** トピック・キーワード */
  topics: string[];
  /** 元のトークン数 */
  originalTokenCount: number;
  /** 要約後のトークン数 */
  summaryTokenCount: number;
  /** 圧縮率 */
  compressionRatio: number;

  // === 拡張フィールド（Phase 6） ===

  /** 変更差分の詳細 */
  changes?: ChangeDiff[];
  /** エラー履歴 */
  errors?: ErrorEntry[];
  /** 構造化された決定事項 */
  decisions?: DecisionEntry[];
}

/**
 * 要約レベル
 *
 * 段階的開示のレベルを定義。
 */
export type SummaryLevel =
  | 0 // インデックスのみ（SessionIndex）
  | 1 // 基本要約（SessionSummary）
  | 2; // 詳細要約（ExtendedSessionSummary）
