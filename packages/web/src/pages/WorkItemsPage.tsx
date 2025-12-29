/**
 * Work Items ページ
 *
 * 作業項目の一覧と管理を行う。
 */
import { useEffect, useCallback, useState, useEffect as useEffectOnce, memo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  useWorkItemStore,
  WorkItem,
  WorkItemStatus,
} from "../stores/workItemStore";
import {
  WorkItemIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "../components/icons";

export function WorkItemsPage() {
  const {
    workItems,
    isLoading,
    error,
    filter,
    fetchWorkItems,
    setFilter,
    createWorkItem,
  } = useWorkItemStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 初回マウント時にデータ取得
  useEffect(() => {
    fetchWorkItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // フィルタ変更
  const handleFilterChange = useCallback(
    (newFilter: WorkItemStatus | "all") => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  // 新規作成モーダルを開く
  const handleOpenCreate = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  // 新規作成
  const handleCreate = useCallback(
    async (title: string, description: string) => {
      const result = await createWorkItem({ title, description });
      if (result) {
        setIsCreateModalOpen(false);
      }
    },
    [createWorkItem]
  );

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Work Items
          </h1>
          <p className="text-[var(--text-muted)] mt-1">
            Track your ongoing work across sessions
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          New Work Item
        </button>
      </header>

      {/* フィルタ */}
      <div className="flex gap-2 mb-6">
        <FilterButton
          label="All"
          active={filter === "all"}
          onClick={() => handleFilterChange("all")}
        />
        <FilterButton
          label="In Progress"
          active={filter === "in_progress"}
          onClick={() => handleFilterChange("in_progress")}
        />
        <FilterButton
          label="Completed"
          active={filter === "completed"}
          onClick={() => handleFilterChange("completed")}
        />
        <FilterButton
          label="Blocked"
          active={filter === "blocked"}
          onClick={() => handleFilterChange("blocked")}
        />
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="card bg-red-50 border-red-200 mb-6">
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleIcon className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* ローディング */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <WorkItemSkeleton key={i} />
          ))}
        </div>
      ) : workItems.length === 0 ? (
        <EmptyState onCreateClick={handleOpenCreate} />
      ) : (
        <div className="space-y-4">
          {workItems.map((item) => (
            <WorkItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* 作成モーダル */}
      {isCreateModalOpen && (
        <CreateWorkItemModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

/** フィルタボタン */
const FilterButton = memo(function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
        active
          ? "bg-[var(--color-primary-500)] text-white"
          : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
      }`}
    >
      {label}
    </button>
  );
});

/** Work Item カード */
const WorkItemCard = memo(function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <Link to={`/work-items/${item.id}`} className="block">
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          <StatusIcon status={item.status} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium text-[var(--text-primary)] truncate">
                {item.title}
              </h3>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
              {item.description}
            </p>

            {/* プログレスバー */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1">
                <span>Progress</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden" role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress: ${item.progress} percent`}>
                <div
                  className="h-full bg-[var(--color-primary-500)] rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            {/* メタ情報 */}
            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
              <span>{item.sessionCount} sessions</span>
              <span>{item.milestoneCount} milestones</span>
              {item.blockerCount > 0 && (
                <span className="text-red-500">
                  {item.blockerCount} blockers
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

/** ステータスアイコン */
function StatusIcon({ status }: { status: WorkItemStatus }) {
  switch (status) {
    case "completed":
      return (
        <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
      );
    case "blocked":
      return (
        <ExclamationCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
      );
    case "in_progress":
      return (
        <ClockIcon className="w-6 h-6 text-[var(--color-primary-500)] flex-shrink-0" />
      );
    default:
      return (
        <WorkItemIcon className="w-6 h-6 text-[var(--text-muted)] flex-shrink-0" />
      );
  }
}

/** ステータスバッジ */
const StatusBadge = memo(function StatusBadge({ status }: { status: WorkItemStatus }) {
  const config: Record<WorkItemStatus, { label: string; className: string }> = {
    not_started: {
      label: "Not Started",
      className: "bg-gray-100 text-gray-800",
    },
    planning: {
      label: "Planning",
      className: "bg-purple-100 text-purple-800",
    },
    in_progress: {
      label: "In Progress",
      className: "bg-blue-100 text-blue-800",
    },
    review: {
      label: "Review",
      className: "bg-yellow-100 text-yellow-800",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800",
    },
    blocked: {
      label: "Blocked",
      className: "bg-red-100 text-red-800",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
});

/** 空状態 */
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-12">
      <WorkItemIcon className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
      <h3 className="text-lg font-medium text-[var(--text-primary)]">
        No work items yet
      </h3>
      <p className="text-[var(--text-muted)] mt-1">
        Create a work item to track your ongoing tasks
      </p>
      <button
        onClick={onCreateClick}
        className="btn-primary mt-4 inline-flex items-center gap-2"
      >
        <PlusIcon className="w-4 h-4" />
        Create Work Item
      </button>
    </div>
  );
}

/** スケルトン */
function WorkItemSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-6 h-6 bg-[var(--bg-elevated)] rounded-full" />
        <div className="flex-1">
          <div className="h-5 bg-[var(--bg-elevated)] rounded w-1/3 mb-2" />
          <div className="h-4 bg-[var(--bg-elevated)] rounded w-full mb-3" />
          <div className="h-2 bg-[var(--bg-elevated)] rounded w-full" />
        </div>
      </div>
    </div>
  );
}

/** 作成モーダル */
function CreateWorkItemModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // モーダルが開いたら最初のフィールドにフォーカス
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // Escキーでクローズ
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onCreate(title, description);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[var(--bg-surface)] rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="p-4 border-b border-[var(--border-subtle)]">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-[var(--text-primary)]"
          >
            Create Work Item
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
              >
                Title
              </label>
              <input
                ref={titleInputRef}
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Enter work item title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input resize-none"
                rows={3}
                placeholder="Describe the work item..."
              />
            </div>
          </div>
          <div className="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
