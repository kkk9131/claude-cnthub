/**
 * System サイドバー (SYS-08)
 *
 * System Context ビュー用のサイドバー
 * - プロジェクト選択
 * - System Context の概要表示
 */

import { useEffect, useMemo, useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useSystemContextStore } from "../stores/systemContextStore";
import {
  ChevronDownIcon,
  FolderIcon,
  CommandLineIcon,
  BoltIcon,
  ServerStackIcon,
  BookOpenIcon,
} from "./icons";

export function SystemSidebar() {
  const {
    projects,
    selectedProjectId,
    loading: projectsLoading,
    fetchProjects,
    selectProject,
  } = useProjectStore();

  const {
    skills,
    hooks,
    mcpServers,
    rules,
    loading: contextLoading,
  } = useSystemContextStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const selectedProject = useMemo(
    () => projects.find((p) => p.projectId === selectedProjectId),
    [projects, selectedProjectId]
  );

  // ソース別の統計
  const stats = useMemo(() => {
    const skillsBySource = {
      global: skills.filter((s) => s.source === "global").length,
      project: skills.filter((s) => s.source === "project").length,
      plugin: skills.filter((s) => s.source === "plugin").length,
    };
    const hooksBySource = {
      global: hooks.filter((h) => h.source === "global").length,
      project: hooks.filter((h) => h.source === "project").length,
      plugin: hooks.filter((h) => h.source === "plugin").length,
    };
    const mcpBySource = {
      global: mcpServers.filter((m) => m.source === "global").length,
      plugin: mcpServers.filter((m) => m.source === "plugin").length,
    };
    const rulesBySource = {
      global: rules.filter((r) => r.source === "global").length,
      project: rules.filter((r) => r.source === "project").length,
    };

    return {
      skills: skillsBySource,
      hooks: hooksBySource,
      mcp: mcpBySource,
      rules: rulesBySource,
    };
  }, [skills, hooks, mcpServers, rules]);

  return (
    <aside className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full">
      {/* プロジェクト選択 */}
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
                  : selectedProject?.name || "グローバル設定"}
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
                onClick={() => {
                  selectProject(null);
                  setDropdownOpen(false);
                }}
                className={
                  "w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                  (!selectedProjectId
                    ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                    : "text-[var(--text-primary)]")
                }
                role="option"
                aria-selected={!selectedProjectId}
              >
                <div>グローバル設定</div>
                <div className="text-xs text-[var(--text-muted)]">
                  ~/.claude のみ
                </div>
              </button>
              {projects.map((project) => (
                <button
                  key={project.projectId}
                  onClick={() => {
                    selectProject(project.projectId);
                    setDropdownOpen(false);
                  }}
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

      {/* System Context 概要 */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
          System Context
        </div>

        {contextLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 bg-[var(--bg-elevated)] rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Skills */}
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[var(--color-primary-500)] rounded flex items-center justify-center">
                  <CommandLineIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Skills
                </span>
                <span className="ml-auto text-sm text-[var(--text-muted)]">
                  {skills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {stats.skills.global > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                    global: {stats.skills.global}
                  </span>
                )}
                {stats.skills.project > 0 && (
                  <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                    project: {stats.skills.project}
                  </span>
                )}
                {stats.skills.plugin > 0 && (
                  <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded">
                    plugin: {stats.skills.plugin}
                  </span>
                )}
              </div>
            </div>

            {/* Hooks */}
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                  <BoltIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Hooks
                </span>
                <span className="ml-auto text-sm text-[var(--text-muted)]">
                  {hooks.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {stats.hooks.global > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                    global: {stats.hooks.global}
                  </span>
                )}
                {stats.hooks.project > 0 && (
                  <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                    project: {stats.hooks.project}
                  </span>
                )}
                {stats.hooks.plugin > 0 && (
                  <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded">
                    plugin: {stats.hooks.plugin}
                  </span>
                )}
              </div>
            </div>

            {/* MCP Servers */}
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
                  <ServerStackIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  MCP Servers
                </span>
                <span className="ml-auto text-sm text-[var(--text-muted)]">
                  {mcpServers.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {stats.mcp.global > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                    global: {stats.mcp.global}
                  </span>
                )}
                {stats.mcp.plugin > 0 && (
                  <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded">
                    plugin: {stats.mcp.plugin}
                  </span>
                )}
              </div>
            </div>

            {/* Rules */}
            <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                  <BookOpenIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Rules
                </span>
                <span className="ml-auto text-sm text-[var(--text-muted)]">
                  {rules.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {stats.rules.global > 0 && (
                  <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                    global: {stats.rules.global}
                  </span>
                )}
                {stats.rules.project > 0 && (
                  <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                    project: {stats.rules.project}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="p-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
        {selectedProject ? (
          <div className="truncate" title={selectedProject.path}>
            {selectedProject.path}
          </div>
        ) : (
          <div>~/.claude</div>
        )}
      </div>
    </aside>
  );
}
