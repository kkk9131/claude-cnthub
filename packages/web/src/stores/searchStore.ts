/**
 * 検索ストア
 *
 * セマンティック検索の状態管理を行う。
 */
import { create } from "zustand";
import { API_BASE_URL } from "../lib/config";

/** 検索結果の型 */
export interface SearchResult {
  sessionId: string;
  sessionName: string;
  shortSummary: string;
  relevanceScore: number;
}

/** 検索ステータスの型 */
export interface SearchStatus {
  available: boolean;
  indexedCount: number;
  message: string;
}

/** 検索ストアの状態 */
interface SearchState {
  /** 検索クエリ */
  query: string;
  /** 検索結果 */
  results: SearchResult[];
  /** 検索結果の総数 */
  totalResults: number;
  /** 検索中フラグ */
  isSearching: boolean;
  /** エラーメッセージ */
  error: string | null;
  /** 検索機能のステータス */
  status: SearchStatus | null;
  /** ステータス読み込み中 */
  isLoadingStatus: boolean;
}

/** 検索ストアのアクション */
interface SearchActions {
  /** クエリを設定 */
  setQuery: (query: string) => void;
  /** 検索を実行 */
  search: (query: string, limit?: number) => Promise<void>;
  /** 検索結果をクリア */
  clearResults: () => void;
  /** 検索ステータスを取得 */
  fetchStatus: () => Promise<void>;
}

/** API ベース URL */
const API_BASE = API_BASE_URL;

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  // 初期状態
  query: "",
  results: [],
  totalResults: 0,
  isSearching: false,
  error: null,
  status: null,
  isLoadingStatus: false,

  // クエリを設定
  setQuery: (query: string) => set({ query }),

  // 検索を実行
  search: async (query: string, limit = 10) => {
    if (!query.trim()) {
      set({ results: [], totalResults: 0, error: null });
      return;
    }

    set({ isSearching: true, error: null, query });

    try {
      const response = await fetch(`${API_BASE}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, limit }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Search failed");
      }

      const data = await response.json();
      set({
        results: data.results,
        totalResults: data.totalResults,
        isSearching: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Search failed",
        isSearching: false,
        results: [],
        totalResults: 0,
      });
    }
  },

  // 検索結果をクリア
  clearResults: () =>
    set({
      query: "",
      results: [],
      totalResults: 0,
      error: null,
    }),

  // 検索ステータスを取得
  fetchStatus: async () => {
    set({ isLoadingStatus: true });

    try {
      const response = await fetch(`${API_BASE}/api/search/status`);

      if (!response.ok) {
        throw new Error("Failed to fetch search status");
      }

      const data = await response.json();
      set({ status: data, isLoadingStatus: false });
    } catch (error) {
      set({
        status: {
          available: false,
          indexedCount: 0,
          message:
            error instanceof Error
              ? error.message
              : "Failed to fetch search status",
        },
        isLoadingStatus: false,
      });
    }
  },
}));
