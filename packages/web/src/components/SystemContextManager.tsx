/**
 * System Context Manager (SYS-07 改良版)
 *
 * 2ペイン形式の System Context 管理UI
 * - カテゴリタブ（Skills/Hooks/MCP/Rules）
 * - ソース/ターゲットプロジェクト選択
 * - 選択してコピー機能
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useProjectStore } from "../stores/projectStore";
import { useSystemContextStore } from "../stores/systemContextStore";
import {
  ChevronDownIcon,
  FolderIcon,
  SearchIcon,
  CommandLineIcon,
  BoltIcon,
  ServerStackIcon,
  BookOpenIcon,
  CheckIcon,
} from "./icons";
import type {
  SystemSkill,
  SystemHook,
  SystemMcpServer,
  SystemRule,
  SystemContextSource,
} from "@claude-cnthub/shared";

// カテゴリタブの型
type Category = "skills" | "hooks" | "mcp" | "rules";

// ソースバッジの色
const sourceBadgeColors: Record<SystemContextSource, string> = {
  global: "bg-blue-500/20 text-blue-400",
  project: "bg-green-500/20 text-green-400",
  plugin: "bg-purple-500/20 text-purple-400",
};

// カテゴリアイコン
const categoryIcons: Record<Category, typeof CommandLineIcon> = {
  skills: CommandLineIcon,
  hooks: BoltIcon,
  mcp: ServerStackIcon,
  rules: BookOpenIcon,
};

// カテゴリ色
const categoryColors: Record<Category, string> = {
  skills: "bg-[var(--color-primary-500)]",
  hooks: "bg-amber-500",
  mcp: "bg-cyan-500",
  rules: "bg-emerald-500",
};

interface SystemContextManagerProps {
  onOptimize?: (category: Category, items: string[]) => void;
}

export function SystemContextManager({
  onOptimize,
}: SystemContextManagerProps) {
  const { projects, fetchProjects } = useProjectStore();
  const { skills, hooks, mcpServers, rules, loading, fetchSystemContext } =
    useSystemContextStore();

  // 状態
  const [activeCategory, setActiveCategory] = useState<Category>("skills");
  const [sourceProjectId, setSourceProjectId] = useState<string | null>(null);
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [targetDropdownOpen, setTargetDropdownOpen] = useState(false);
  const [copying, setCopying] = useState(false);
  const [copyResult, setCopyResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 初期化
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ソースプロジェクト変更時に System Context を再取得
  useEffect(() => {
    const project = projects.find((p) => p.projectId === sourceProjectId);
    fetchSystemContext(project?.path);
  }, [sourceProjectId, projects, fetchSystemContext]);

  // ソースプロジェクトのパス
  const sourceProjectPath = useMemo(() => {
    if (!sourceProjectId) return undefined;
    return projects.find((p) => p.projectId === sourceProjectId)?.path;
  }, [sourceProjectId, projects]);

  // ターゲットプロジェクトのパス
  const targetProjectPath = useMemo(() => {
    if (!targetProjectId) return undefined;
    return projects.find((p) => p.projectId === targetProjectId)?.path;
  }, [targetProjectId, projects]);

  // カテゴリ別のアイテム
  const currentItems = useMemo(() => {
    switch (activeCategory) {
      case "skills":
        return skills;
      case "hooks":
        return hooks;
      case "mcp":
        return mcpServers;
      case "rules":
        return rules;
      default:
        return [];
    }
  }, [activeCategory, skills, hooks, mcpServers, rules]);

  // 検索フィルタ
  const filteredItems = useMemo(() => {
    if (!searchQuery) return currentItems;
    const query = searchQuery.toLowerCase();
    return currentItems.filter((item) => {
      const name =
        "name" in item ? item.name : "event" in item ? item.event : "";
      const desc = "description" in item ? item.description : "";
      return (
        name.toLowerCase().includes(query) ||
        desc?.toLowerCase().includes(query)
      );
    });
  }, [currentItems, searchQuery]);

  // アイテムのID取得
  const getItemId = useCallback(
    (item: SystemSkill | SystemHook | SystemMcpServer | SystemRule): string => {
      if ("name" in item && "path" in item) {
        return `${item.source}:${item.name}`;
      }
      if ("event" in item) {
        return `${item.source}:${item.event}:${item.command}`;
      }
      return `${item.source}:${JSON.stringify(item)}`;
    },
    []
  );

  // アイテム名取得
  const getItemName = useCallback(
    (item: SystemSkill | SystemHook | SystemMcpServer | SystemRule): string => {
      if ("name" in item) return item.name;
      if ("event" in item) return item.event;
      return "Unknown";
    },
    []
  );

  // 選択切り替え
  const toggleSelection = useCallback(
    (item: SystemSkill | SystemHook | SystemMcpServer | SystemRule) => {
      const id = getItemId(item);
      setSelectedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [getItemId]
  );

  // 全選択/全解除
  const toggleSelectAll = useCallback(() => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(getItemId)));
    }
  }, [filteredItems, selectedItems.size, getItemId]);

  // コピー実行
  const handleCopy = useCallback(async () => {
    if (!targetProjectPath || selectedItems.size === 0) return;

    setCopying(true);
    setCopyResult(null);

    try {
      // 選択されたアイテムのパスを収集
      const itemsToCopy = filteredItems
        .filter((item) => selectedItems.has(getItemId(item)))
        .filter((item) => "path" in item)
        .map((item) => ({
          type: activeCategory,
          sourcePath: (item as SystemSkill | SystemRule).path,
          name: getItemName(item),
        }));

      const response = await fetch("/api/system-context/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsToCopy,
          targetProjectPath,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "コピーに失敗しました");
      }

      const result = await response.json();
      setCopyResult({
        success: true,
        message: `${result.copied}件をコピーしました`,
      });
      setSelectedItems(new Set());
    } catch (err) {
      setCopyResult({
        success: false,
        message: err instanceof Error ? err.message : "コピーに失敗しました",
      });
    } finally {
      setCopying(false);
    }
  }, [
    targetProjectPath,
    selectedItems,
    filteredItems,
    activeCategory,
    getItemId,
    getItemName,
  ]);

  // カテゴリ変更時に選択をリセット
  useEffect(() => {
    setSelectedItems(new Set());
  }, [activeCategory]);

  return (
    <div className="h-full flex flex-col bg-[var(--bg-base)]">
      {/* ヘッダー: カテゴリタブ */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        {(["skills", "hooks", "mcp", "rules"] as Category[]).map((cat) => {
          const Icon = categoryIcons[cat];
          const count =
            cat === "skills"
              ? skills.length
              : cat === "hooks"
                ? hooks.length
                : cat === "mcp"
                  ? mcpServers.length
                  : rules.length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? `${categoryColors[cat]} text-white`
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="capitalize">{cat}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-xs ${
                  activeCategory === cat
                    ? "bg-white/20"
                    : "bg-[var(--bg-elevated)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        <div className="flex-1" />

        {/* 最適化ボタン（将来用） */}
        {onOptimize && (
          <button
            onClick={() =>
              onOptimize(activeCategory, Array.from(selectedItems))
            }
            disabled={selectedItems.size === 0}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            最適化
          </button>
        )}
      </div>

      {/* メインエリア: 2ペイン */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左ペイン: ソース */}
        <div className="w-1/2 flex flex-col border-r border-[var(--border-subtle)]">
          {/* ソースプロジェクト選択 */}
          <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="relative">
              <button
                onClick={() => setSourceDropdownOpen(!sourceDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-sm text-[var(--text-primary)]">
                    {sourceProjectId
                      ? projects.find((p) => p.projectId === sourceProjectId)
                          ?.name
                      : "グローバル設定"}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                    sourceDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {sourceDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSourceProjectId(null);
                      setSourceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${
                      !sourceProjectId
                        ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    グローバル設定
                  </button>
                  {projects.map((project) => (
                    <button
                      key={project.projectId}
                      onClick={() => {
                        setSourceProjectId(project.projectId);
                        setSourceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${
                        sourceProjectId === project.projectId
                          ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                          : "text-[var(--text-primary)]"
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 検索 */}
            <div className="mt-2 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="検索..."
                className="w-full pl-9 pr-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              />
            </div>
          </div>

          {/* アイテムリスト */}
          <div className="flex-1 overflow-y-auto p-2">
            {loading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-[var(--bg-elevated)] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-4 text-center text-[var(--text-muted)]">
                {searchQuery ? "検索結果がありません" : "アイテムがありません"}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => {
                  const id = getItemId(item);
                  const isSelected = selectedItems.has(id);
                  const name = getItemName(item);
                  const source = item.source;
                  const desc =
                    "description" in item ? item.description : undefined;

                  return (
                    <div
                      key={id}
                      onClick={() => toggleSelection(item)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[var(--color-primary-500)]/20 border border-[var(--color-primary-500)]"
                          : "bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]"
                              : "border-[var(--border-default)]"
                          }`}
                        >
                          {isSelected && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="flex-1 text-sm font-medium text-[var(--text-primary)] truncate">
                          {name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-xs ${sourceBadgeColors[source]}`}
                        >
                          {source[0].toUpperCase()}
                        </span>
                      </div>
                      {desc && (
                        <div className="mt-1 ml-7 text-xs text-[var(--text-muted)] line-clamp-2">
                          {desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* フッター: 選択アクション */}
          <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2">
            <button
              onClick={toggleSelectAll}
              className="px-3 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              {selectedItems.size === filteredItems.length
                ? "全解除"
                : "全選択"}
            </button>
            <span className="text-sm text-[var(--text-muted)]">
              {selectedItems.size}件選択中
            </span>
          </div>
        </div>

        {/* 右ペイン: ターゲット */}
        <div className="w-1/2 flex flex-col">
          {/* ターゲットプロジェクト選択 */}
          <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="relative">
              <button
                onClick={() => setTargetDropdownOpen(!targetDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-sm text-[var(--text-primary)]">
                    {targetProjectId
                      ? projects.find((p) => p.projectId === targetProjectId)
                          ?.name
                      : "コピー先を選択..."}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                    targetDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {targetDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {projects
                    .filter((p) => p.projectId !== sourceProjectId)
                    .map((project) => (
                      <button
                        key={project.projectId}
                        onClick={() => {
                          setTargetProjectId(project.projectId);
                          setTargetDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${
                          targetProjectId === project.projectId
                            ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        <div>{project.name}</div>
                        <div className="text-xs text-[var(--text-muted)] truncate">
                          {project.path}
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* コピー先プレビュー */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            {!targetProjectId ? (
              <div className="text-[var(--text-muted)]">
                <FolderIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>コピー先プロジェクトを選択してください</p>
              </div>
            ) : selectedItems.size === 0 ? (
              <div className="text-[var(--text-muted)]">
                <CheckIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>左のリストからコピーするアイテムを選択してください</p>
              </div>
            ) : (
              <div className="w-full max-w-sm">
                <div className="text-lg font-medium text-[var(--text-primary)] mb-4">
                  {selectedItems.size}件を
                  <br />
                  <span className="text-[var(--color-primary-400)]">
                    {
                      projects.find((p) => p.projectId === targetProjectId)
                        ?.name
                    }
                  </span>
                  <br />
                  にコピー
                </div>
                <button
                  onClick={handleCopy}
                  disabled={copying}
                  className="w-full px-6 py-3 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {copying ? "コピー中..." : "コピーを実行"}
                </button>
                {copyResult && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm ${
                      copyResult.success
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {copyResult.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
