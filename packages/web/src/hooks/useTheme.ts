/**
 * テーマ管理フック
 *
 * ダークモード/ライトモードの切り替えを管理
 */

import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light";

const THEME_KEY = "claude-cnthub-theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // LocalStorageから取得、デフォルトはdark
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    }
    return "dark";
  });

  useEffect(() => {
    // DOMにテーマクラスを適用
    const root = document.documentElement;
    root.dataset.theme = theme;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  return { theme, toggleTheme, setTheme };
}
