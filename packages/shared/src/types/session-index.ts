/**
 * セッションインデックス型定義
 *
 * 段階的開示システム Level 0 用の軽量インデックス型。
 * セッション一覧表示で使用し、詳細はオンデマンドで取得。
 *
 * 主な特徴:
 * - 軽量: 本文や詳細要約を含まない
 * - 高速: 一覧取得が高速
 * - タグ付き: フィルタリング/検索に対応
 */

import type { SessionStatus } from "./session";

/**
 * セッションインデックス（Level 0）
 *
 * セッション一覧で表示する最小限の情報。
 * - id: セッションID
 * - sessionName (sn): 自動生成または手動設定のセッション名
 * - status: 現在のステータス
 * - tags: 自動抽出されたタグ
 * - summaryPreview: 要約の先頭部分（プレビュー用）
 */
export interface SessionIndex {
  /** セッションID */
  id: string;
  /** セッション名（SN: Session Name）- 自動命名または手動設定 */
  sessionName: string;
  /** セッションステータス */
  status: SessionStatus;
  /** 自動抽出されたタグ */
  tags: string[];
  /** 要約プレビュー（先頭100文字程度） */
  summaryPreview: string;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * セッションインデックス一覧レスポンス
 */
export interface SessionIndexListResponse {
  /** セッションインデックス配列 */
  sessions: SessionIndex[];
  /** ページネーション情報 */
  pagination: {
    /** 総件数 */
    total: number;
    /** 現在のページ */
    page: number;
    /** 総ページ数 */
    totalPages: number;
    /** 次ページの有無 */
    hasNext: boolean;
    /** 前ページの有無 */
    hasPrev: boolean;
  };
}

/**
 * セッションインデックスのフィルタオプション
 */
export interface SessionIndexFilter {
  /** ステータスでフィルタ */
  status?: SessionStatus;
  /** タグでフィルタ（AND条件） */
  tags?: string[];
  /** プロジェクトIDでフィルタ */
  projectId?: string;
  /** 作業項目IDでフィルタ */
  workItemId?: string;
  /** 検索クエリ（セッション名、タグを検索） */
  query?: string;
}
