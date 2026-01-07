/**
 * System Context 状態管理ストア
 *
 * - Skills, Hooks, MCP Servers, Rules の取得・キャッシュ
 * - System Context API との連携
 */

import { create } from "zustand";
import type {
  SystemContextResponse,
  SystemSkill,
  SystemHook,
  SystemMcpServer,
  SystemRule,
} from "@claude-cnthub/shared";

interface SystemContextState {
  // 状態
  skills: SystemSkill[];
  hooks: SystemHook[];
  mcpServers: SystemMcpServer[];
  rules: SystemRule[];
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;

  // アクション
  fetchSystemContext: (projectPath?: string) => Promise<void>;
  fetchSkills: (projectPath?: string) => Promise<void>;
  fetchHooks: (projectPath?: string) => Promise<void>;
  fetchMcpServers: (projectPath?: string) => Promise<void>;
  fetchRules: (projectPath?: string) => Promise<void>;
  reset: () => void;
}

export const useSystemContextStore = create<SystemContextState>((set) => ({
  skills: [],
  hooks: [],
  mcpServers: [],
  rules: [],
  loading: false,
  error: null,
  lastFetched: null,

  fetchSystemContext: async (projectPath?: string) => {
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (projectPath) {
        params.set("projectPath", projectPath);
      }

      const url = `/api/system-context${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "System Context の取得に失敗しました");
      }

      const data: SystemContextResponse = await response.json();
      set({
        skills: data.skills,
        hooks: data.hooks,
        mcpServers: data.mcpServers,
        rules: data.rules,
        loading: false,
        lastFetched: new Date(),
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "System Context の取得に失敗しました";
      console.error("[SystemContextStore] Failed to fetch:", err);
      set({ error: message, loading: false });
    }
  },

  fetchSkills: async (projectPath?: string) => {
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (projectPath) {
        params.set("projectPath", projectPath);
      }

      const url = `/api/system-context/skills${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Skills の取得に失敗しました");
      }

      const data = await response.json();
      set({ skills: data.skills, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Skills の取得に失敗しました";
      set({ error: message, loading: false });
    }
  },

  fetchHooks: async (projectPath?: string) => {
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (projectPath) {
        params.set("projectPath", projectPath);
      }

      const url = `/api/system-context/hooks${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Hooks の取得に失敗しました");
      }

      const data = await response.json();
      set({ hooks: data.hooks, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Hooks の取得に失敗しました";
      set({ error: message, loading: false });
    }
  },

  fetchMcpServers: async (projectPath?: string) => {
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (projectPath) {
        params.set("projectPath", projectPath);
      }

      const url = `/api/system-context/mcp${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("MCP Servers の取得に失敗しました");
      }

      const data = await response.json();
      set({ mcpServers: data.mcpServers, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "MCP Servers の取得に失敗しました";
      set({ error: message, loading: false });
    }
  },

  fetchRules: async (projectPath?: string) => {
    set({ loading: true, error: null });

    try {
      const params = new URLSearchParams();
      if (projectPath) {
        params.set("projectPath", projectPath);
      }

      const url = `/api/system-context/rules${params.toString() ? `?${params}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Rules の取得に失敗しました");
      }

      const data = await response.json();
      set({ rules: data.rules, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Rules の取得に失敗しました";
      set({ error: message, loading: false });
    }
  },

  reset: () => {
    set({
      skills: [],
      hooks: [],
      mcpServers: [],
      rules: [],
      loading: false,
      error: null,
      lastFetched: null,
    });
  },
}));
