/**
 * MergeHistory コンポーネント
 *
 * マージ履歴を一覧表示。ステータス、日時、要約を表示。
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Merge, MergeStatus } from "@claude-cnthub/shared";
import type { MergeHistoryProps, MergeHistoryItemProps } from "./types";

/**
 * マージ履歴一覧
 *
 * @example
 * ```tsx
 * <MergeHistory
 *   projectId="ch_pj_0001"
 *   onItemClick={(merge) => console.log('Selected:', merge)}
 * />
 * ```
 */
export function MergeHistory({
  projectId,
  limit = 20,
  className = "",
  onItemClick,
}: MergeHistoryProps) {
  const [merges, setMerges] = useState<Merge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  // データ取得
  const fetchMerges = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (projectId) {
        params.set("projectId", projectId);
      }

      const response = await fetch(`/api/merges?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch merge history");
      }

      const data = await response.json();

      // APIレスポンスのマージデータを正しい型に変換
      const items = (data.items || []).map((item: Record<string, unknown>) => ({
        ...item,
        createdAt: new Date(item.createdAt as string),
        updatedAt: new Date(item.updatedAt as string),
      })) as Merge[];

      setMerges(items);
      setPagination({
        total: data.pagination?.total || 0,
        totalPages: data.pagination?.totalPages || 0,
        hasNext: data.pagination?.hasNext || false,
        hasPrev: data.pagination?.hasPrev || false,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, projectId]);

  // 初回およびページ変更時にデータ取得
  useEffect(() => {
    fetchMerges();
  }, [fetchMerges]);

  // リトライ
  const handleRetry = useCallback(() => {
    fetchMerges();
  }, [fetchMerges]);

  if (loading) {
    return <MergeHistorySkeleton />;
  }

  if (error) {
    return (
      <div className={`merge-history ${className}`.trim()}>
        <div
          role="alert"
          className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-6 rounded-lg text-center"
        >
          <p className="mb-4">{error}</p>
          <button onClick={handleRetry} className="btn-secondary" type="button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (merges.length === 0) {
    return (
      <div className={`merge-history ${className}`.trim()}>
        <EmptyHistory />
      </div>
    );
  }

  return (
    <div className={`merge-history ${className}`.trim()}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Merge History
        </h3>
        <span className="text-sm text-[var(--text-muted)]">
          {pagination.total} total
        </span>
      </div>

      <ul className="space-y-3" role="list" aria-label="Merge history">
        {merges.map((merge) => (
          <MergeHistoryItem
            key={merge.mergeId}
            merge={merge}
            onClick={onItemClick}
          />
        ))}
      </ul>

      {/* ページネーション */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={!pagination.hasPrev}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-[var(--text-muted)]">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={!pagination.hasNext}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * マージ履歴アイテム
 */
function MergeHistoryItem({ merge, onClick }: MergeHistoryItemProps) {
  const handleClick = useCallback(() => {
    onClick?.(merge);
  }, [onClick, merge]);

  const formattedDate = useMemo(
    () =>
      merge.createdAt.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [merge.createdAt]
  );

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="w-full text-left bg-[var(--bg-elevated)] hover:bg-[var(--bg-elevated)]/80 rounded-lg p-4 transition-colors"
        aria-label={`View merge ${merge.mergeId}`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <StatusBadge status={merge.status} />
            <span className="text-xs text-[var(--text-muted)]">
              {merge.mergeId}
            </span>
          </div>
          <time
            className="text-xs text-[var(--text-muted)]"
            dateTime={merge.createdAt.toISOString()}
          >
            {formattedDate}
          </time>
        </div>

        <p className="text-sm text-[var(--text-primary)] line-clamp-2">
          {merge.resultSummary || "No summary available"}
        </p>

        <div className="flex items-center gap-1 mt-2 text-xs text-[var(--text-muted)]">
          <SessionsIcon className="w-4 h-4" />
          <span>
            {merge.sourceSessionIds.length} session
            {merge.sourceSessionIds.length !== 1 ? "s" : ""} merged
          </span>
        </div>

        {merge.error && (
          <div className="mt-2 text-xs text-red-400 truncate">
            Error: {merge.error}
          </div>
        )}
      </button>
    </li>
  );
}

/**
 * ステータスバッジ
 */
interface StatusBadgeProps {
  status: MergeStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = useMemo(
    () => ({
      pending: { color: "bg-gray-400", label: "pending" },
      processing: { color: "bg-blue-500", label: "processing" },
      completed: { color: "bg-green-500", label: "completed" },
      error: { color: "bg-red-500", label: "error" },
    }),
    []
  );

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${config.color}`}
      role="status"
    >
      {config.label}
    </span>
  );
}

/**
 * 空状態
 */
function EmptyHistory() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[var(--text-muted)]">
      <HistoryIcon className="w-16 h-16 mb-4 opacity-50" />
      <p className="text-center">No merge history</p>
      <p className="text-sm text-center mt-1">
        Merged sessions will appear here
      </p>
    </div>
  );
}

/**
 * スケルトンローダー
 */
function MergeHistorySkeleton() {
  return (
    <div
      className="merge-history"
      aria-busy="true"
      aria-label="Loading merge history"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-[var(--bg-elevated)] rounded animate-pulse" />
        <div className="h-4 w-16 bg-[var(--bg-elevated)] rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[var(--bg-elevated)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 bg-[var(--border-default)] rounded animate-pulse" />
                <div className="h-4 w-24 bg-[var(--border-default)] rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-[var(--border-default)] rounded animate-pulse" />
            </div>
            <div className="h-4 w-full bg-[var(--border-default)] rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-[var(--border-default)] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * セッションアイコン
 */
function SessionsIcon({ className = "" }: { className?: string }) {
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
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

/**
 * 履歴アイコン
 */
function HistoryIcon({ className = "" }: { className?: string }) {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
