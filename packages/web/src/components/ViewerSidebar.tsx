/**
 * Viewer サイドバー (R-11: セッション一覧 + プロジェクト切替)
 *
 * - プロジェクト選択ドロップダウン
 * - プロジェクト内のセッション一覧
 * - ステータスインジケータ付き
 */

import { memo, useCallback, useEffect, useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import {
  ChevronDownIcon,
  FolderIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
} from "./icons";

interface Session {
  sessionId: string;
  name: string;
  status: "idle" | "active" | "completed" | "error";
  createdAt: string;
  updatedAt: string;
  projectId?: string;
}

interface ViewerSidebarProps {
  onSessionSelect?: (session: Session) => void;
  onSessionClick?: (session: Session) => void;
  selectedSessionIds?: string[];
}

export function ViewerSidebar({
  onSessionSelect,
  onSessionClick,
  selectedSessionIds = [],
}: ViewerSidebarProps) {
  const {
    projects,
    selectedProjectId,
    loading: projectsLoading,
    fetchProjects,
    selectProject,
  } = useProjectStore();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const fetchSessions = async () => {
      setSessionsLoading(true);
      try {
        const params = new URLSearchParams({
          limit: "100",
          status: "completed",
        });
        if (selectedProjectId) {
          params.set("projectId", selectedProjectId);
        }
        const response = await fetch("/api/sessions?" + params);
        if (!response.ok) throw new Error("Failed to fetch sessions");
        const data = await response.json();
        setSessions(data.items || []);
      } catch (err) {
        console.error("[ViewerSidebar] Failed to fetch sessions:", err);
        setSessions([]);
      } finally {
        setSessionsLoading(false);
      }
    };
    fetchSessions();
  }, [selectedProjectId]);

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
                <button
                  key={project.projectId}
                  onClick={() => handleProjectSelect(project.projectId)}
                  className={
                    "w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                    (selectedProjectId === project.projectId
                      ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                      : "text-[var(--text-primary)]")
                  }
                  role="option"
                  aria-selected={selectedProjectId === project.projectId}
                >
                  <div className="truncate">{project.name}</div>
                  <div className="text-xs text-[var(--text-muted)] truncate">
                    {project.path}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          Sessions
        </div>
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
}

const statusColors = {
  idle: "bg-gray-400",
  active: "bg-blue-500",
  completed: "bg-green-500",
  error: "bg-red-500",
};

const SessionItem = memo(function SessionItem({
  session,
  isHidden,
  onToggle,
  onClick,
}: SessionItemProps) {
  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle?.(session);
    },
    [onToggle, session]
  );

  const handleClick = useCallback(() => {
    onClick?.(session);
  }, [onClick, session]);

  const formattedDate = new Date(session.updatedAt).toLocaleDateString(
    "ja-JP",
    { month: "short", day: "numeric" }
  );

  return (
    <div
      className={
        "flex items-center gap-1 px-2 py-2 rounded-lg transition-colors " +
        (isHidden ? "opacity-50" : "hover:bg-[var(--bg-elevated)]")
      }
    >
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
    </div>
  );
});
