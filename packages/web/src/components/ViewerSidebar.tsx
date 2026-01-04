/**
 * Viewer サイドバー (R-11: セッション一覧 + プロジェクト切替)
 *
 * - プロジェクト選択ドロップダウン
 * - プロジェクト内のセッション一覧
 * - ステータスインジケータ付き
 * - セッション一括削除 (UI-ADD-01)
 */

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import {
  ChevronDownIcon,
  FolderIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  CheckIcon,
  PencilIcon,
} from "./icons";

interface Session {
  sessionId: string;
  name: string;
  status: "idle" | "active" | "completed" | "error" | "processing";
  createdAt: string;
  updatedAt: string;
  projectId?: string;
}

interface ViewerSidebarProps {
  sessions: Session[];
  sessionsLoading?: boolean;
  onSessionSelect?: (session: Session) => void;
  onSessionClick?: (session: Session) => void;
  onSessionDelete?: (session: Session) => void;
  onBulkDelete?: (sessionIds: string[]) => Promise<void>;
  selectedSessionIds?: string[];
}

export function ViewerSidebar({
  sessions: allSessions,
  sessionsLoading = false,
  onSessionSelect,
  onSessionClick,
  onSessionDelete,
  onBulkDelete,
  selectedSessionIds = [],
}: ViewerSidebarProps) {
  const {
    projects,
    selectedProjectId,
    loading: projectsLoading,
    fetchProjects,
    selectProject,
    updateProject,
    deleteProject,
  } = useProjectStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [bulkSelectedIds, setBulkSelectedIds] = useState<Set<string>>(
    new Set()
  );
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // プロジェクトでフィルタ（親から受け取ったセッションを使用）
  const sessions = useMemo(
    () =>
      selectedProjectId
        ? allSessions.filter((s) => s.projectId === selectedProjectId)
        : allSessions,
    [allSessions, selectedProjectId]
  );

  const handleProjectSelect = useCallback(
    (projectId: string | null) => {
      selectProject(projectId);
      setDropdownOpen(false);
    },
    [selectProject]
  );

  const selectedProject = projects.find(
    (p) => p.projectId === selectedProjectId
  );

  // プロジェクト名の編集開始
  const handleStartEditProject = useCallback(
    (projectId: string, currentName: string) => {
      setEditingProjectId(projectId);
      setEditingName(currentName);
      setDropdownOpen(false);
    },
    []
  );

  // プロジェクト名の編集確定
  const handleSaveProjectName = useCallback(async () => {
    if (!editingProjectId || !editingName.trim()) return;

    await updateProject(editingProjectId, { name: editingName.trim() });
    setEditingProjectId(null);
    setEditingName("");
  }, [editingProjectId, editingName, updateProject]);

  // プロジェクト名編集のキャンセル
  const handleCancelEditProject = useCallback(() => {
    setEditingProjectId(null);
    setEditingName("");
  }, []);

  // プロジェクト削除
  const handleDeleteProject = useCallback(
    async (projectId: string) => {
      if (!confirm("このプロジェクトを削除しますか？")) return;

      await deleteProject(projectId);
      setDropdownOpen(false);
    },
    [deleteProject]
  );

  // 一括選択モードの切り替え
  const handleToggleBulkMode = useCallback(() => {
    setBulkSelectMode((prev) => !prev);
    setBulkSelectedIds(new Set());
  }, []);

  // 一括選択の切り替え
  const handleBulkToggle = useCallback((sessionId: string) => {
    setBulkSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      return next;
    });
  }, []);

  // 全選択/全解除
  const handleSelectAll = useCallback(() => {
    if (bulkSelectedIds.size === sessions.length) {
      setBulkSelectedIds(new Set());
    } else {
      setBulkSelectedIds(new Set(sessions.map((s) => s.sessionId)));
    }
  }, [sessions, bulkSelectedIds.size]);

  // 一括削除の実行
  const handleBulkDelete = useCallback(async () => {
    if (bulkSelectedIds.size === 0 || !onBulkDelete) return;

    setIsBulkDeleting(true);
    try {
      await onBulkDelete(Array.from(bulkSelectedIds));
      setBulkSelectedIds(new Set());
      setBulkSelectMode(false);
    } finally {
      setIsBulkDeleting(false);
    }
  }, [bulkSelectedIds, onBulkDelete]);

  return (
    <aside className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full">
      <div className="p-3 border-b border-[var(--border-subtle)]">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <div className="flex items-center gap-2 min-w-0">
              <FolderIcon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <span className="text-sm text-[var(--text-primary)] truncate">
                {projectsLoading
                  ? "読み込み中..."
                  : selectedProject?.name || "すべてのプロジェクト"}
              </span>
            </div>
            <ChevronDownIcon
              className={
                "w-4 h-4 text-[var(--text-muted)] transition-transform " +
                (dropdownOpen ? "rotate-180" : "")
              }
            />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleProjectSelect(null)}
                className={
                  "w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                  (!selectedProjectId
                    ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                    : "text-[var(--text-primary)]")
                }
                role="option"
                aria-selected={!selectedProjectId}
              >
                すべてのプロジェクト
              </button>
              {projects.map((project) => (
                <div
                  key={project.projectId}
                  className={
                    "group flex items-center gap-1 px-2 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                    (selectedProjectId === project.projectId
                      ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                      : "text-[var(--text-primary)]")
                  }
                >
                  {editingProjectId === project.projectId ? (
                    <div className="flex-1 flex items-center gap-1">
                      <label
                        htmlFor={`edit-project-${project.projectId}`}
                        className="sr-only"
                      >
                        プロジェクト名を編集
                      </label>
                      <input
                        id={`edit-project-${project.projectId}`}
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveProjectName();
                          if (e.key === "Escape") handleCancelEditProject();
                        }}
                        className="flex-1 px-2 py-1 text-sm bg-[var(--bg-base)] border border-[var(--border-default)] rounded text-[var(--text-primary)]"
                        autoFocus
                        aria-label="プロジェクト名"
                      />
                      <button
                        onClick={handleSaveProjectName}
                        className="p-1 rounded hover:bg-[var(--color-primary-500)] text-[var(--text-muted)] hover:text-white transition-colors"
                        aria-label="保存"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleProjectSelect(project.projectId)}
                        className="flex-1 text-left min-w-0"
                        role="option"
                        aria-selected={selectedProjectId === project.projectId}
                      >
                        <div className="truncate">{project.name}</div>
                        <div className="text-xs text-[var(--text-muted)] truncate">
                          {project.path}
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEditProject(
                            project.projectId,
                            project.name
                          );
                        }}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[var(--bg-base)] transition-all"
                        title="名前を変更"
                        aria-label={`${project.name}の名前を変更`}
                      >
                        <PencilIcon className="w-3 h-3 text-[var(--text-muted)]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.projectId);
                        }}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/20 transition-all"
                        title="削除"
                        aria-label={`${project.name}を削除`}
                      >
                        <TrashIcon className="w-3 h-3 text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
            Sessions
          </span>
          {onBulkDelete && sessions.length > 0 && (
            <button
              onClick={handleToggleBulkMode}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                bulkSelectMode
                  ? "bg-[var(--color-primary-500)] text-white"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              {bulkSelectMode ? "完了" : "選択"}
            </button>
          )}
        </div>
        {bulkSelectMode && sessions.length > 0 && (
          <div className="px-3 pb-2 flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              {bulkSelectedIds.size === sessions.length ? "全解除" : "全選択"}
            </button>
            {bulkSelectedIds.size > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                <TrashIcon className="w-3 h-3" />
                {isBulkDeleting
                  ? "削除中..."
                  : `${bulkSelectedIds.size}件を削除`}
              </button>
            )}
          </div>
        )}
        {sessionsLoading ? (
          <div className="px-3 space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-[var(--bg-elevated)] rounded animate-pulse"
              />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-3 py-4 text-sm text-[var(--text-muted)] text-center">
            セッションがありません
          </div>
        ) : (
          <div className="px-2 space-y-1">
            {sessions.map((session) => (
              <SessionItem
                key={session.sessionId}
                session={session}
                isHidden={selectedSessionIds.includes(session.sessionId)}
                onToggle={onSessionSelect}
                onClick={onSessionClick}
                onDelete={onSessionDelete}
                bulkSelectMode={bulkSelectMode}
                isBulkSelected={bulkSelectedIds.has(session.sessionId)}
                onBulkToggle={handleBulkToggle}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-[var(--border-subtle)]">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors">
          <PlusIcon className="w-4 h-4" />
          <span>New Session</span>
        </button>
      </div>
    </aside>
  );
}

interface SessionItemProps {
  session: Session;
  isHidden: boolean;
  onToggle?: (session: Session) => void;
  onClick?: (session: Session) => void;
  onDelete?: (session: Session) => void;
  bulkSelectMode?: boolean;
  isBulkSelected?: boolean;
  onBulkToggle?: (sessionId: string) => void;
}

const statusColors = {
  idle: "bg-gray-400",
  active: "bg-blue-500",
  completed: "bg-green-500",
  error: "bg-red-500",
  processing: "bg-yellow-500",
};

const SessionItem = memo(function SessionItem({
  session,
  isHidden,
  onToggle,
  onClick,
  onDelete,
  bulkSelectMode = false,
  isBulkSelected = false,
  onBulkToggle,
}: SessionItemProps) {
  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle?.(session);
    },
    [onToggle, session]
  );

  const handleClick = useCallback(() => {
    if (bulkSelectMode) {
      onBulkToggle?.(session.sessionId);
    } else {
      onClick?.(session);
    }
  }, [bulkSelectMode, onClick, onBulkToggle, session]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.(session);
    },
    [onDelete, session]
  );

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onBulkToggle?.(session.sessionId);
    },
    [onBulkToggle, session.sessionId]
  );

  const formattedDate = new Date(session.updatedAt).toLocaleDateString(
    "ja-JP",
    { month: "short", day: "numeric" }
  );

  return (
    <div
      className={
        "group flex items-center gap-1 px-2 py-2 rounded-lg transition-colors " +
        (isBulkSelected
          ? "bg-[var(--color-primary-500)]/20"
          : isHidden
            ? "opacity-50"
            : "hover:bg-[var(--bg-elevated)]")
      }
    >
      {bulkSelectMode ? (
        <button
          onClick={handleCheckboxClick}
          className={`p-1 rounded transition-colors flex-shrink-0 ${
            isBulkSelected
              ? "bg-[var(--color-primary-500)] text-white"
              : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)]"
          }`}
        >
          {isBulkSelected ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="p-1 rounded hover:bg-[var(--bg-surface)] transition-colors flex-shrink-0"
          title={isHidden ? "エディタに表示" : "エディタから非表示"}
        >
          {isHidden ? (
            <EyeSlashIcon className="w-4 h-4 text-[var(--text-muted)]" />
          ) : (
            <EyeIcon className="w-4 h-4 text-[var(--text-secondary)]" />
          )}
        </button>
      )}
      <button
        onClick={handleClick}
        className="flex-1 text-left flex items-center gap-2 min-w-0"
      >
        <span
          className={
            "w-2 h-2 rounded-full flex-shrink-0 " +
            (isHidden ? "bg-gray-500" : statusColors[session.status])
          }
        />
        <div className="flex-1 min-w-0">
          <div
            className={
              "text-sm truncate " +
              (isHidden
                ? "text-[var(--text-muted)] line-through"
                : "text-[var(--text-primary)]")
            }
          >
            {session.name}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            {formattedDate}
          </div>
        </div>
      </button>
      {!bulkSelectMode && (
        <button
          onClick={handleDelete}
          className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all flex-shrink-0"
          title="セッションを削除"
        >
          <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-300" />
        </button>
      )}
    </div>
  );
});
