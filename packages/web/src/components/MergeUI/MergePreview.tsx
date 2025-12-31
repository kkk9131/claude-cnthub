/**
 * MergePreview コンポーネント
 *
 * マージ対象のセッションのプレビューを表示。
 * 選択されたセッションの一覧と、マージ後のイメージを提供。
 */

import { useMemo } from "react";
import type { MergePreviewProps, SessionItem } from "./types";

/**
 * マージプレビュー
 *
 * @example
 * ```tsx
 * <MergePreview sessions={selectedSessions} />
 * ```
 */
export function MergePreview({ sessions, className = "" }: MergePreviewProps) {
  // セッション数のテキスト
  const sessionCountText = useMemo(() => {
    const count = sessions.length;
    if (count === 0) return "No sessions";
    if (count === 1) return "1 session";
    return `${count} sessions`;
  }, [sessions.length]);

  // 日付でソートされたセッション
  const sortedSessions = useMemo(() => {
    return [...sessions].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [sessions]);

  return (
    <div className={`merge-preview ${className}`.trim()}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Merge Preview
        </h3>
        <span className="text-sm text-[var(--text-muted)]">
          {sessionCountText}
        </span>
      </div>

      {sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {/* セッション一覧 */}
          <ul className="space-y-2" role="list" aria-label="Sessions to merge">
            {sortedSessions.map((session, index) => (
              <PreviewSessionItem
                key={session.sessionId}
                session={session}
                index={index}
                isLast={index === sortedSessions.length - 1}
              />
            ))}
          </ul>

          {/* マージ結果イメージ */}
          {sessions.length >= 2 && (
            <div className="mt-6 pt-4 border-t border-[var(--border-default)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <MergeIcon className="w-5 h-5" />
                <span className="text-sm">
                  These sessions will be merged into a single summary
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * プレビューセッションアイテム
 */
interface PreviewSessionItemProps {
  session: SessionItem;
  index: number;
  isLast: boolean;
}

function PreviewSessionItem({
  session,
  index,
  isLast,
}: PreviewSessionItemProps) {
  const formattedDate = useMemo(
    () =>
      new Date(session.createdAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [session.createdAt]
  );

  const statusColors = useMemo(
    () => ({
      idle: "bg-gray-400",
      active: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
    }),
    []
  );

  return (
    <li className="relative">
      {/* タイムラインコネクタ */}
      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-[var(--border-default)]">
        {isLast && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--primary-500)]" />
        )}
      </div>

      <div className="flex items-start gap-3 pl-0">
        {/* タイムラインドット */}
        <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border-default)]">
          <span className="text-xs text-[var(--text-muted)]">{index + 1}</span>
        </div>

        {/* セッション情報 */}
        <div className="flex-1 bg-[var(--bg-elevated)] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${statusColors[session.status]}`}
              role="status"
              aria-label={`Status: ${session.status}`}
            />
            <span className="font-medium text-[var(--text-primary)]">
              {session.name}
            </span>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            <time dateTime={session.createdAt}>{formattedDate}</time>
          </div>
          {session.workingDir && (
            <div className="text-xs text-[var(--text-muted)] mt-1 truncate">
              {session.workingDir}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/**
 * 空状態の表示
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[var(--text-muted)]">
      <EmptyIcon className="w-16 h-16 mb-4 opacity-50" />
      <p className="text-center">No sessions selected</p>
      <p className="text-sm text-center mt-1">
        Drag sessions to the merge panel to preview
      </p>
    </div>
  );
}

/**
 * マージアイコン
 */
function MergeIcon({ className = "" }: { className?: string }) {
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
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

/**
 * 空状態アイコン
 */
function EmptyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  );
}
