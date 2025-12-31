/**
 * MergePanel コンポーネント
 *
 * セッションをドラッグ&ドロップでマージ対象に追加し、
 * マージを実行するためのパネル。
 */

import { useState, useCallback, useMemo } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DnDProvider } from "../DnD/DnDProvider";
import { DroppableZone } from "../DnD/DroppableZone";
import type { MergePanelProps, SessionItem } from "./types";

/**
 * セッションマージパネル
 *
 * @example
 * ```tsx
 * <MergePanel
 *   initialSelectedSessions={sessions}
 *   onMergeComplete={(merge) => console.log('Merged:', merge)}
 * />
 * ```
 */
export function MergePanel({
  initialSelectedSessions = [],
  onMergeComplete,
  projectId,
  className = "",
}: MergePanelProps) {
  const [selectedSessions, setSelectedSessions] = useState<SessionItem[]>(
    initialSelectedSessions
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // マージ可能かどうか（2つ以上のセッションが選択されている）
  const canMerge = useMemo(
    () => selectedSessions.length >= 2,
    [selectedSessions.length]
  );

  // セッションを追加
  const addSession = useCallback((session: SessionItem) => {
    setSelectedSessions((prev) => {
      // 重複チェック
      if (prev.some((s) => s.sessionId === session.sessionId)) {
        return prev;
      }
      return [...prev, session];
    });
    setError(null);
  }, []);

  // セッションを削除
  const removeSession = useCallback((sessionId: string) => {
    setSelectedSessions((prev) =>
      prev.filter((s) => s.sessionId !== sessionId)
    );
  }, []);

  // ドラッグ終了時のハンドラ
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && over.id === "merge-drop-zone") {
        const draggedData = active.data.current;
        if (draggedData?.type === "session") {
          const session: SessionItem = {
            sessionId: draggedData.id,
            name: draggedData.data?.name || draggedData.id,
            status: draggedData.data?.status || "completed",
            createdAt: draggedData.data?.createdAt || new Date().toISOString(),
            updatedAt: draggedData.data?.updatedAt || new Date().toISOString(),
            workingDir: draggedData.data?.workingDir,
          };
          addSession(session);
        }
      }
    },
    [addSession]
  );

  // マージ実行
  const handleMerge = useCallback(async () => {
    if (!canMerge) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/merges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceSessionIds: selectedSessions.map((s) => s.sessionId),
          ...(projectId && { projectId }),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create merge");
      }

      const merge = await response.json();
      setSelectedSessions([]);
      onMergeComplete?.(merge);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [canMerge, selectedSessions, projectId, onMergeComplete]);

  return (
    <DnDProvider onDragEnd={handleDragEnd}>
      <div className={`merge-panel ${className}`.trim()}>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Merge Sessions
        </h2>

        {error && (
          <div
            role="alert"
            className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4"
          >
            {error}
          </div>
        )}

        <DroppableZone
          id="merge-drop-zone"
          data={{ id: "merge-drop-zone", accepts: ["session"] }}
          className="min-h-48 border-2 border-dashed border-[var(--border-default)] rounded-lg p-4 transition-colors"
          activeClassName="border-[var(--primary-500)] bg-[var(--primary-500)]/10"
          ariaLabel="Drop zone for sessions to merge"
        >
          {selectedSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[var(--text-muted)]">
              <DropIcon className="w-12 h-12 mb-3 opacity-50" />
              <p>Drag sessions here to merge</p>
              <p className="text-sm mt-1">Select at least 2 sessions</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-[var(--text-muted)] mb-3">
                {selectedSessions.length} session
                {selectedSessions.length !== 1 ? "s" : ""} selected
              </div>
              <ul className="space-y-2" aria-label="Selected sessions">
                {selectedSessions.map((session) => (
                  <SelectedSessionItem
                    key={session.sessionId}
                    session={session}
                    onRemove={removeSession}
                  />
                ))}
              </ul>
            </div>
          )}
        </DroppableZone>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleMerge}
            disabled={!canMerge || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Execute merge"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner />
                Merging...
              </span>
            ) : (
              "Execute Merge"
            )}
          </button>
        </div>
      </div>
    </DnDProvider>
  );
}

/**
 * 選択済みセッションアイテム
 */
interface SelectedSessionItemProps {
  session: SessionItem;
  onRemove: (sessionId: string) => void;
}

function SelectedSessionItem({ session, onRemove }: SelectedSessionItemProps) {
  const handleRemove = useCallback(() => {
    onRemove(session.sessionId);
  }, [onRemove, session.sessionId]);

  return (
    <li className="flex items-center justify-between bg-[var(--bg-elevated)] rounded-lg px-4 py-3">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[var(--text-primary)] truncate">
          {session.name}
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          {session.sessionId}
        </div>
      </div>
      <button
        type="button"
        onClick={handleRemove}
        className="ml-2 p-1 text-[var(--text-muted)] hover:text-red-400 transition-colors"
        aria-label={`Remove session ${session.name}`}
      >
        <CloseIcon className="w-5 h-5" />
      </button>
    </li>
  );
}

/**
 * ドロップアイコン
 */
function DropIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

/**
 * 閉じるアイコン
 */
function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/**
 * ローディングスピナー
 */
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
