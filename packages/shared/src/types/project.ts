/**
 * プロジェクト型定義
 *
 * プロジェクト管理機能の基盤となる型定義。
 * セッションやワークアイテムの親エンティティとして機能。
 */

/**
 * プロジェクト
 */
export interface Project {
  projectId: string; // ch_pj_XXXX 形式
  name: string;
  path: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * プロジェクト作成リクエスト
 */
export interface CreateProjectRequest {
  name: string;
  path: string;
  description?: string;
}

/**
 * プロジェクト更新リクエスト
 */
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

/**
 * プロジェクト一覧レスポンス
 */
export interface ProjectListResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
