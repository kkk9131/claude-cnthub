/**
 * 最適化承認モーダル
 *
 * 最適化結果を確認し、承認/キャンセルを選択するモーダル
 */

import { useState, useCallback, useMemo } from "react";
import type { OptimizeResult, OptimizeChange } from "@claude-cnthub/shared";
import { DiffViewer } from "./DiffViewer";

interface OptimizeApprovalModalProps {
  /** 表示フラグ */
  isOpen: boolean;
  /** 閉じるハンドラ */
  onClose: () => void;
  /** 最適化結果 */
  result: OptimizeResult;
  /** 承認ハンドラ */
  onApprove: (changes: OptimizeChange[]) => Promise<void>;
  /** 適用中フラグ */
  isApplying?: boolean;
}

/**
 * ファイルパスからファイル名を取得
 */
function getFileName(filePath: string): string {
  return filePath.split("/").pop() || filePath;
}

/**
 * 参照タイプに応じたバッジクラスを取得
 */
function getReferenceTypeBadgeClass(referenceType: string): string {
  switch (referenceType) {
    case "rule":
      return "bg-blue-500/20 text-blue-400";
    case "example":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

export function OptimizeApprovalModal({
  isOpen,
  onClose,
  result,
  onApprove,
  isApplying = false,
}: OptimizeApprovalModalProps) {
  const [selectedChanges, setSelectedChanges] = useState<Set<string>>(
    () => new Set(result.changes.map((c) => c.id))
  );
  const [expandedChange, setExpandedChange] = useState<string | null>(null);

  // 選択をトグル
  const toggleSelection = useCallback((changeId: string) => {
    setSelectedChanges((prev) => {
      const next = new Set(prev);
      if (next.has(changeId)) {
        next.delete(changeId);
      } else {
        next.add(changeId);
      }
      return next;
    });
  }, []);

  // 展開をトグル
  const toggleExpand = useCallback((changeId: string) => {
    setExpandedChange((prev) => (prev === changeId ? null : changeId));
  }, []);

  // 選択された変更を取得
  const selectedChangesList = useMemo(() => {
    return result.changes.filter((c) => selectedChanges.has(c.id));
  }, [result.changes, selectedChanges]);

  // 統計情報
  const stats = useMemo(() => {
    const totalLinesBefore = result.changes.reduce(
      (sum, c) => sum + c.lineCountBefore,
      0
    );
    const totalLinesAfter = result.changes.reduce(
      (sum, c) => sum + c.lineCountAfter,
      0
    );
    const extractedFilesCount = result.changes.reduce(
      (sum, c) => sum + c.extractedFiles.length,
      0
    );
    return {
      totalLinesBefore,
      totalLinesAfter,
      linesReduced: totalLinesBefore - totalLinesAfter,
      extractedFilesCount,
    };
  }, [result.changes]);

  // 承認処理
  const handleApprove = useCallback(async () => {
    await onApprove(selectedChangesList);
  }, [onApprove, selectedChangesList]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[800px] max-h-[85vh] flex flex-col border border-[var(--border-default)]">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              最適化結果の確認
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              変更を適用する前に確認してください
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isApplying}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
          >
            <svg
              className="w-5 h-5 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 統計情報 */}
        <div className="px-6 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex gap-6 text-sm">
          <div>
            <span className="text-[var(--text-muted)]">変更ファイル: </span>
            <span className="text-[var(--text-primary)] font-medium">
              {result.changes.length}
            </span>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">行数削減: </span>
            <span className="text-green-400 font-medium">
              -{stats.linesReduced}行
            </span>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">抽出ファイル: </span>
            <span className="text-[var(--text-primary)] font-medium">
              {stats.extractedFilesCount}
            </span>
          </div>
          {result.retryCount > 0 && (
            <div>
              <span className="text-[var(--text-muted)]">リトライ: </span>
              <span className="text-yellow-400 font-medium">
                {result.retryCount}回
              </span>
            </div>
          )}
        </div>

        {/* 変更一覧 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {result.changes.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)]">
              最適化対象のファイルがありません
            </div>
          ) : (
            <div className="space-y-3">
              {result.changes.map((change) => (
                <div
                  key={change.id}
                  className={`border rounded-lg overflow-hidden transition-colors ${
                    selectedChanges.has(change.id)
                      ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/5"
                      : "border-[var(--border-default)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {/* 変更ヘッダー */}
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer"
                    onClick={() => toggleSelection(change.id)}
                  >
                    {/* チェックボックス */}
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedChanges.has(change.id)
                          ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]"
                          : "border-[var(--border-default)]"
                      }`}
                    >
                      {selectedChanges.has(change.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* ファイル情報 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--text-primary)]">
                          {getFileName(change.filePath)}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            change.type === "claude-md"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {change.type === "claude-md" ? "CLAUDE.md" : "Skill"}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {change.lineCountBefore}行 → {change.lineCountAfter}行
                        <span className="text-green-400 ml-2">
                          (-{change.lineCountBefore - change.lineCountAfter}行)
                        </span>
                      </p>
                    </div>

                    {/* 抽出ファイル数 */}
                    {change.extractedFiles.length > 0 && (
                      <div className="text-sm text-[var(--text-muted)]">
                        {change.extractedFiles.length} ファイル抽出
                      </div>
                    )}

                    {/* 展開ボタン */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(change.id);
                      }}
                      className="p-1 hover:bg-[var(--bg-surface)] rounded transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                          expandedChange === change.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Diff 表示 */}
                  {expandedChange === change.id && (
                    <div className="px-4 pb-4 pt-0">
                      <DiffViewer
                        original={change.originalContent}
                        modified={change.optimizedContent}
                        fileName={change.filePath}
                      />

                      {/* 抽出ファイル一覧 */}
                      {change.extractedFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                            抽出ファイル:
                          </h4>
                          <div className="space-y-1">
                            {change.extractedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span
                                  className={`px-1.5 py-0.5 rounded text-xs ${getReferenceTypeBadgeClass(file.referenceType)}`}
                                >
                                  {file.referenceType}
                                </span>
                                <span className="text-[var(--text-muted)] font-mono">
                                  {file.path}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* エラー表示 */}
          {result.errors.length > 0 && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-400 mb-2">
                警告・エラー:
              </h4>
              <ul className="text-sm text-red-300 list-disc list-inside">
                {result.errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="text-sm text-[var(--text-muted)]">
            {selectedChanges.size > 0 && (
              <>選択中: {selectedChanges.size} ファイル</>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isApplying}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              onClick={handleApprove}
              disabled={selectedChanges.size === 0 || isApplying}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedChanges.size === 0 || isApplying
                  ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
                  : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"
              }`}
            >
              {isApplying ? "適用中..." : "選択した変更を適用"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
