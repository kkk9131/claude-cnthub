/**
 * Work Item ストア
 *
 * Work Item（作業項目）の状態管理を行う。
 * Work Item は複数のセッションをまたがる作業をトラッキングする単位。
 */
import { create } from "zustand";
import { API_BASE_URL } from "../lib/config";

export type { WorkItemStatus } from "@claude-cnthub/shared";
import type { WorkItemStatus } from "@claude-cnthub/shared";

/** Work Item の型 */
export interface WorkItem {
  id: string;
  title: string;
  description: string;
  status: WorkItemStatus;
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
  sessionCount: number;
  milestoneCount: number;
  blockerCount: number;
}

/** Work Item 詳細 */
export interface WorkItemDetail extends WorkItem {
  sessions: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    completedAt: string | null;
  }[];
  blockers: {
    id: string;
    description: string;
    resolved: boolean;
    createdAt: string;
  }[];
  timeline: {
    type: "milestone" | "progress" | "blocker";
    title: string;
    timestamp: string;
    completed?: boolean;
  }[];
}

/** Work Item ストアの状態 */
interface WorkItemState {
  /** Work Item 一覧 */
  workItems: WorkItem[];
  /** 選択中の Work Item */
  currentWorkItem: WorkItemDetail | null;
  /** 一覧読み込み中 */
  isLoading: boolean;
  /** 詳細読み込み中 */
  isLoadingDetail: boolean;
  /** エラーメッセージ */
  error: string | null;
  /** フィルタ */
  filter: WorkItemStatus | "all";
}

/** Work Item ストアのアクション */
interface WorkItemActions {
  /** Work Item 一覧を取得 */
  fetchWorkItems: () => Promise<void>;
  /** Work Item 詳細を取得 */
  fetchWorkItemDetail: (id: string) => Promise<void>;
  /** Work Item を作成 */
  createWorkItem: (data: {
    title: string;
    description: string;
  }) => Promise<WorkItem | null>;
  /** Work Item を更新 */
  updateWorkItem: (
    id: string,
    data: Partial<Pick<WorkItem, "title" | "description" | "status">>
  ) => Promise<void>;
  /** Work Item を削除 */
  deleteWorkItem: (id: string) => Promise<void>;
  /** フィルタを設定 */
  setFilter: (filter: WorkItemStatus | "all") => void;
  /** 現在の Work Item をクリア */
  clearCurrentWorkItem: () => void;
}

/** API ベース URL */
const API_BASE = API_BASE_URL;

export const useWorkItemStore = create<WorkItemState & WorkItemActions>(
  (set, get) => ({
    // 初期状態
    workItems: [],
    currentWorkItem: null,
    isLoading: false,
    isLoadingDetail: false,
    error: null,
    filter: "all",

    // Work Item 一覧を取得
    fetchWorkItems: async () => {
      set({ isLoading: true, error: null });

      try {
        const { filter } = get();
        const params = filter !== "all" ? `?status=${filter}` : "";
        const response = await fetch(`${API_BASE}/api/work-items${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch work items");
        }

        const data = await response.json();
        set({ workItems: data.workItems, isLoading: false });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch work items",
          isLoading: false,
          workItems: [],
        });
      }
    },

    // Work Item 詳細を取得
    fetchWorkItemDetail: async (id: string) => {
      set({ isLoadingDetail: true, error: null });

      try {
        const response = await fetch(`${API_BASE}/api/work-items/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch work item detail");
        }

        const data = await response.json();
        set({ currentWorkItem: data, isLoadingDetail: false });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch work item detail",
          isLoadingDetail: false,
          currentWorkItem: null,
        });
      }
    },

    // Work Item を作成
    createWorkItem: async (data) => {
      set({ error: null });

      try {
        const response = await fetch(`${API_BASE}/api/work-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create work item");
        }

        const workItem = await response.json();
        set((state) => ({
          workItems: [workItem, ...state.workItems],
        }));
        return workItem;
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to create work item",
        });
        return null;
      }
    },

    // Work Item を更新
    updateWorkItem: async (id, data) => {
      set({ error: null });

      try {
        const response = await fetch(`${API_BASE}/api/work-items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to update work item");
        }

        const updated = await response.json();
        set((state) => ({
          workItems: state.workItems.map((item) =>
            item.id === id ? { ...item, ...updated } : item
          ),
          currentWorkItem:
            state.currentWorkItem?.id === id
              ? { ...state.currentWorkItem, ...updated }
              : state.currentWorkItem,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to update work item",
        });
      }
    },

    // Work Item を削除
    deleteWorkItem: async (id) => {
      set({ error: null });

      try {
        const response = await fetch(`${API_BASE}/api/work-items/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete work item");
        }

        set((state) => ({
          workItems: state.workItems.filter((item) => item.id !== id),
          currentWorkItem:
            state.currentWorkItem?.id === id ? null : state.currentWorkItem,
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete work item",
        });
      }
    },

    // フィルタを設定
    setFilter: (filter) => {
      set({ filter });
      get().fetchWorkItems();
    },

    // 現在の Work Item をクリア
    clearCurrentWorkItem: () => set({ currentWorkItem: null }),
  })
);
