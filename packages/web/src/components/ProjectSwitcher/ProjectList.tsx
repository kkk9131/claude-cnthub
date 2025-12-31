/**
 * ProjectList コンポーネント
 *
 * プロジェクト一覧を表示するリストコンポーネント。
 * ProjectSwitcher のドロップダウン内で使用される。
 */

import type { Project } from "@claude-cnthub/shared";
import type { ProjectListProps, ProjectItemProps } from "./types";
import { FolderIcon, PlusIcon, CheckCircleIcon } from "../icons";
import { truncateProjectName, formatProjectPath } from "./utils";

/**
 * プロジェクトアイテム
 */
function ProjectItem({ project, isSelected, onClick }: ProjectItemProps) {
  // ホームディレクトリを取得（ブラウザでは環境変数から）
  const homeDir =
    typeof window !== "undefined"
      ? (import.meta.env.VITE_HOME_DIR as string) || "/Users"
      : "/Users";

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-3 py-2.5 text-left
                  transition-colors focus:outline-none focus:bg-[var(--bg-elevated)]
                  ${
                    isSelected
                      ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
                  }`}
    >
      <FolderIcon
        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
          isSelected
            ? "text-[var(--accent-primary)]"
            : "text-[var(--text-muted)]"
        }`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">
            {truncateProjectName(project.name, 25)}
          </span>
          {isSelected && (
            <CheckCircleIcon className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
          {formatProjectPath(project.path, homeDir, 35)}
        </p>
        {project.description && (
          <p className="text-xs text-[var(--text-muted)] truncate mt-0.5 opacity-70">
            {project.description}
          </p>
        )}
      </div>
    </button>
  );
}

/**
 * ロード中の表示
 */
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[var(--border-subtle)] border-t-[var(--accent-primary)]" />
      <span className="ml-2 text-sm text-[var(--text-muted)]">Loading...</span>
    </div>
  );
}

/**
 * プロジェクトがない場合の表示
 */
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="px-4 py-6 text-center">
      <FolderIcon className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
      <p className="text-sm text-[var(--text-muted)] mb-3">No projects yet</p>
      <button
        type="button"
        onClick={onCreateClick}
        className="text-sm text-[var(--accent-primary)] hover:underline focus:outline-none"
      >
        Create your first project
      </button>
    </div>
  );
}

export function ProjectList({
  projects,
  currentProjectId,
  onSelect,
  onCreateClick,
  isLoading = false,
}: ProjectListProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (projects.length === 0) {
    return <EmptyState onCreateClick={onCreateClick} />;
  }

  return (
    <div className="max-h-80 overflow-y-auto">
      {/* プロジェクト一覧 */}
      <div role="listbox" aria-label="Projects">
        {projects.map((project) => (
          <ProjectItem
            key={project.projectId}
            project={project}
            isSelected={project.projectId === currentProjectId}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>

      {/* 区切り線 */}
      <div className="border-t border-[var(--border-subtle)]" />

      {/* 新規作成ボタン */}
      <button
        type="button"
        onClick={onCreateClick}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left
                   text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]
                   transition-colors focus:outline-none focus:bg-[var(--bg-elevated)]"
      >
        <PlusIcon className="w-5 h-5 text-[var(--accent-primary)]" />
        <span className="text-sm font-medium">New Project</span>
      </button>
    </div>
  );
}
