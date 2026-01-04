/**
 * プロジェクト状態管理ストア
 *
 * - プロジェクト一覧の取得・キャッシュ
 * - 選択中プロジェクトの管理
 * - セッションのプロジェクトフィルタリング
 * - プロジェクトCRUD操作 (UI-ADD-02)
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

interface CreateProjectData {
  name: string;
  path: string;
  description?: string;
}

interface UpdateProjectData {
  name?: string;
  description?: string;
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
  createProject: (data: CreateProjectData) => Promise<Project | null>;
  updateProject: (
    projectId: string,
    data: UpdateProjectData
  ) => Promise<Project | null>;
  deleteProject: (projectId: string) => Promise<boolean>;
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

  createProject: async (data) => {
    set({ error: null });

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        const errorMessage =
          typeof errData.error === "string"
            ? errData.error
            : errData.error?.message || "プロジェクトの作成に失敗しました";
        throw new Error(errorMessage);
      }

      const project = await response.json();
      set((state) => ({
        projects: [...state.projects, project],
      }));
      return project;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "プロジェクトの作成に失敗しました";
      set({ error: message });
      return null;
    }
  },

  updateProject: async (projectId, data) => {
    set({ error: null });

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        const errorMessage =
          typeof errData.error === "string"
            ? errData.error
            : errData.error?.message || "プロジェクトの更新に失敗しました";
        throw new Error(errorMessage);
      }

      const updated = await response.json();
      set((state) => ({
        projects: state.projects.map((p) =>
          p.projectId === projectId ? updated : p
        ),
      }));
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "プロジェクトの更新に失敗しました";
      set({ error: message });
      return null;
    }
  },

  deleteProject: async (projectId) => {
    set({ error: null });

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        const errData = await response.json();
        const errorMessage =
          typeof errData.error === "string"
            ? errData.error
            : errData.error?.message || "プロジェクトの削除に失敗しました";
        throw new Error(errorMessage);
      }

      set((state) => ({
        projects: state.projects.filter((p) => p.projectId !== projectId),
        selectedProjectId:
          state.selectedProjectId === projectId
            ? null
            : state.selectedProjectId,
      }));
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "プロジェクトの削除に失敗しました";
      set({ error: message });
      return false;
    }
  },
}));
