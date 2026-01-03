/**
 * 削除確認モーダル
 *
 * セッション、ノード、エッジの削除確認に使用
 */

import { useState, useCallback } from "react";
import { XMarkIcon, TrashIcon } from "./icons";

export type DeleteTargetType = "session" | "node" | "edge";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  targetType: DeleteTargetType;
  targetName: string;
  targetId?: string;
}

const targetLabels: Record<DeleteTargetType, string> = {
  session: "セッション",
  node: "ノード",
  edge: "接続",
};

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  targetType,
  targetName,
  targetId,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = useCallback(async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  }, [onConfirm, onClose]);

  const handleClose = useCallback(() => {
    if (!isDeleting) {
      setError(null);
      onClose();
    }
  }, [isDeleting, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[400px] border border-[var(--border-default)]">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <TrashIcon className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {targetLabels[targetType]}を削除
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-6">
          <p className="text-[var(--text-secondary)]">
            以下の{targetLabels[targetType]}を削除しますか？
          </p>

          <div className="mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg">
            <p className="font-medium text-[var(--text-primary)] truncate">
              {targetName}
            </p>
            {targetId && (
              <p className="text-xs text-[var(--text-muted)] font-mono mt-1 truncate">
                {targetId}
              </p>
            )}
          </div>

          <p className="mt-4 text-sm text-[var(--text-muted)]">
            この操作は取り消せません。
          </p>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                削除中...
              </>
            ) : (
              <>
                <TrashIcon className="w-4 h-4" />
                削除する
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
