/**
 * ProjectSwitcher コンポーネント
 *
 * プロジェクト切替用のドロップダウンメニュー。
 * ヘッダーに配置してプロジェクトを素早く切り替える。
 */

import { useState, useEffect, useRef, useCallback } from "react";
import type { Project } from "@claude-cnthub/shared";
import type { ProjectSwitcherProps } from "./types";
import { ProjectList } from "./ProjectList";
import { ProjectCreateModal } from "./ProjectCreateModal";
import { ChevronDownIcon, FolderIcon } from "../icons";
import { truncateProjectName } from "./utils";

// API Base URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3048";

export function ProjectSwitcher({
  currentProjectId,
  onProjectSelect,
  className = "",
}: ProjectSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 現在選択中のプロジェクトを取得
  const currentProject = projects.find((p) => p.projectId === currentProjectId);

  // プロジェクト一覧を取得
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        // API レスポンスの日付を Date オブジェクトに変換
        const projectsWithDates = data.projects.map((p: Project) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
        setProjects(projectsWithDates);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初回マウント時にプロジェクト一覧を取得
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 外部クリックでドロップダウンを閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ESCキーでドロップダウンを閉じる
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // プロジェクト選択ハンドラ
  const handleProjectSelect = (project: Project) => {
    onProjectSelect(project);
    setIsOpen(false);
  };

  // 新規作成モーダルを開く
  const handleCreateClick = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  // プロジェクト作成ハンドラ
  const handleCreate = async (data: {
    name: string;
    path: string;
    description?: string;
  }) => {
    setIsCreating(true);
    try {
      const response = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newProject = await response.json();
        // 日付を変換
        const projectWithDates: Project = {
          ...newProject,
          createdAt: new Date(newProject.createdAt),
          updatedAt: new Date(newProject.updatedAt),
        };
        setProjects((prev) => [...prev, projectWithDates]);
        setIsModalOpen(false);
        // 作成したプロジェクトを選択
        onProjectSelect(projectWithDates);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* トリガーボタン */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                   bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)]
                   border border-[var(--border-subtle)]
                   text-[var(--text-primary)] text-sm font-medium
                   transition-colors focus:outline-none focus:ring-2
                   focus:ring-[var(--accent-primary)] focus:ring-offset-1
                   focus:ring-offset-[var(--bg-surface)]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <FolderIcon className="w-4 h-4 text-[var(--accent-primary)]" />
        <span className="max-w-[150px] truncate">
          {currentProject
            ? truncateProjectName(currentProject.name, 20)
            : "Select Project"}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-72 z-50
                     bg-[var(--bg-surface)] rounded-lg shadow-lg
                     border border-[var(--border-subtle)]
                     overflow-hidden"
        >
          <ProjectList
            projects={projects}
            currentProjectId={currentProjectId}
            onSelect={handleProjectSelect}
            onCreateClick={handleCreateClick}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* 新規作成モーダル */}
      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        isCreating={isCreating}
      />
    </div>
  );
}
