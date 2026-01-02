/**
 * プロジェクト状態管理ストア
 *
 * - プロジェクト一覧の取得・キャッシュ
 * - 選択中プロジェクトの管理
 * - セッションのプロジェクトフィルタリング
 */

import { create } from "zustand";

interface Project {
  projectId: string;
  name: string;
  path: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  // 状態
  projects: Project[];
  selectedProjectId: string | null;
  loading: boolean;
  error: string | null;

  // アクション
  fetchProjects: () => Promise<void>;
  selectProject: (projectId: string | null) => void;
  getSelectedProject: () => Project | null;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  selectedProjectId: null,
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/projects?limit=100");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      set({ projects: data.projects || [], loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "プロジェクトの取得に失敗しました";
      console.error("[ProjectStore] Failed to fetch projects:", err);
      set({ error: message, loading: false });
    }
  },

  selectProject: (projectId) => {
    set({ selectedProjectId: projectId });
  },

  getSelectedProject: () => {
    const { projects, selectedProjectId } = get();
    if (!selectedProjectId) return null;
    return projects.find((p) => p.projectId === selectedProjectId) || null;
  },
}));
