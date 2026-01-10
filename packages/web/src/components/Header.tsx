import { useState } from "react";
import {
  SearchIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  QuestionMarkCircleIcon,
} from "./icons";
import { useTheme } from "../hooks/useTheme";
import { HelpModal } from "./HelpModal";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <header className="h-14 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label="Toggle menu"
        >
          <MenuIcon className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">
          Claude CNT Hub
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <label htmlFor="search-sessions" className="sr-only">
            Search sessions
          </label>
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            id="search-sessions"
            type="search"
            placeholder="Search sessions..."
            className="input pl-10 w-64"
          />
        </div>
        <button
          onClick={() => setIsHelpOpen(true)}
          className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label="操作ガイドを表示"
        >
          <QuestionMarkCircleIcon className="w-5 h-5 text-[var(--text-secondary)]" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5 text-[var(--text-secondary)]" />
          ) : (
            <MoonIcon className="w-5 h-5 text-[var(--text-secondary)]" />
          )}
        </button>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
}
