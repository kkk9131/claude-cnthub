/**
 * ProjectSwitcher コンポーネントの型定義
 */

import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@claude-cnthub/shared";

/**
 * プロジェクト一覧の状態
 */
export type ProjectListState = "loading" | "idle" | "error";

/**
 * ProjectSwitcher の Props
 */
export interface ProjectSwitcherProps {
  /** 現在選択されているプロジェクトID */
  currentProjectId?: string;
  /** プロジェクト選択時のコールバック */
  onProjectSelect: (project: Project) => void;
  /** カスタムクラス名 */
  className?: string;
}

/**
 * ProjectList の Props
 */
export interface ProjectListProps {
  /** プロジェクト一覧 */
  projects: Project[];
  /** 現在選択されているプロジェクトID */
  currentProjectId?: string;
  /** プロジェクト選択時のコールバック */
  onSelect: (project: Project) => void;
  /** 新規作成ボタンクリック時のコールバック */
  onCreateClick: () => void;
  /** ロード中かどうか */
  isLoading?: boolean;
}

/**
 * ProjectCreateModal の Props
 */
export interface ProjectCreateModalProps {
  /** モーダルが開いているかどうか */
  isOpen: boolean;
  /** モーダルを閉じる */
  onClose: () => void;
  /** プロジェクト作成時のコールバック */
  onCreate: (data: CreateProjectRequest) => void;
  /** 作成中かどうか */
  isCreating?: boolean;
}

/**
 * プロジェクト作成フォームのエラー
 */
export interface ProjectFormErrors {
  name?: string;
  path?: string;
}

/**
 * フォームバリデーション結果
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ProjectFormErrors;
}

/**
 * プロジェクトアイテムの Props
 */
export interface ProjectItemProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}
