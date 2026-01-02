/**
 * Smart Export モーダル (SE-02: グループ選択 UI)
 *
 * observations を AI でグルーピングし、選択したグループを Export & 削除する。
 */

import { useState, useCallback, useEffect } from "react";

interface ObservationGroup {
  category: string;
  categoryLabel: string;
  description: string;
  observationIds: string[];
  estimatedTokens: number;
}

interface AnalyzeResult {
  sessionId: string;
  groups: ObservationGroup[];
  analysisTimeMs: number;
  totalObservations: number;
  totalEstimatedTokens: number;
}

interface SmartExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  sessionName: string;
  onExportComplete: () => void;
}

// トークン数をフォーマット
function formatTokens(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}

// カテゴリのアイコン
function getCategoryIcon(category: string): string {
  switch (category) {
    case "feature":
      return "✨";
    case "bugfix":
      return "🐛";
    case "refactor":
      return "♻️";
    case "docs":
      return "📝";
    case "test":
      return "🧪";
    case "config":
      return "⚙️";
    case "exploration":
      return "🔍";
    default:
      return "📦";
  }
}

export function SmartExportModal({
  isOpen,
  onClose,
  sessionId,
  sessionName,
  onExportComplete,
}: SmartExportModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResult | null>(
    null
  );
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // 分析を実行
  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sessions/${sessionId}/analyze`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "分析に失敗しました");
      }

      const result: AnalyzeResult = await response.json();
      setAnalyzeResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  // モーダルが開いたら分析を実行
  useEffect(() => {
    if (isOpen && !analyzeResult && !isLoading) {
      runAnalysis();
    }
  }, [isOpen, analyzeResult, isLoading, runAnalysis]);

  // モーダルを閉じたらリセット
  useEffect(() => {
    if (!isOpen) {
      setAnalyzeResult(null);
      setSelectedGroups(new Set());
      setError(null);
      setExpandedGroups(new Set());
    }
  }, [isOpen]);

  // グループの選択/解除
  const toggleGroup = useCallback((category: string) => {
    setSelectedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  // グループの展開/折りたたみ
  const toggleExpand = useCallback((category: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  // 選択したグループの observation IDs を取得
  const getSelectedObservationIds = useCallback((): string[] => {
    if (!analyzeResult) return [];
    return analyzeResult.groups
      .filter((g) => selectedGroups.has(g.category))
      .flatMap((g) => g.observationIds);
  }, [analyzeResult, selectedGroups]);

  // 選択したグループのトークン数を計算
  const getSelectedTokens = useCallback((): number => {
    if (!analyzeResult) return 0;
    return analyzeResult.groups
      .filter((g) => selectedGroups.has(g.category))
      .reduce((sum, g) => sum + g.estimatedTokens, 0);
  }, [analyzeResult, selectedGroups]);

  // Smart Export 実行
  const handleExport = useCallback(async () => {
    const observationIds = getSelectedObservationIds();
    if (observationIds.length === 0) return;

    const selectedGroupNames = analyzeResult?.groups
      .filter((g) => selectedGroups.has(g.category))
      .map((g) => g.description)
      .join(", ");

    const groupName =
      window.prompt(
        `Export: ${observationIds.length} observations\n\n新しいセッション名を入力してください:`,
        `Export: ${selectedGroupNames}`
      ) || `Export from ${sessionName}`;

    if (!groupName) return;

    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch(`/api/sessions/${sessionId}/smart-export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observationIds,
          groupName,
          deleteAfterExport: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Export に失敗しました");
      }

      const result = await response.json();
      alert(
        `Export 完了!\n\n新しいセッション: ${result.session?.sessionId}\n削除した observations: ${result.deletedCount}`
      );

      onExportComplete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export に失敗しました");
    } finally {
      setIsExporting(false);
    }
  }, [
    getSelectedObservationIds,
    analyzeResult,
    selectedGroups,
    sessionId,
    sessionName,
    onExportComplete,
    onClose,
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col border border-[var(--border-default)]">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Smart Export
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {sessionName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
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

        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-[var(--color-primary-500)] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-[var(--text-muted)]">AI で分析中...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400">{error}</p>
              <button
                onClick={runAnalysis}
                className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
              >
                再試行
              </button>
            </div>
          )}

          {analyzeResult && !isLoading && (
            <>
              {/* 統計情報 */}
              <div className="flex gap-4 mb-6 text-sm">
                <div className="bg-[var(--bg-elevated)] px-3 py-2 rounded-lg">
                  <span className="text-[var(--text-muted)]">総数: </span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {analyzeResult.totalObservations} obs
                  </span>
                </div>
                <div className="bg-[var(--bg-elevated)] px-3 py-2 rounded-lg">
                  <span className="text-[var(--text-muted)]">トークン: </span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {formatTokens(analyzeResult.totalEstimatedTokens)}
                  </span>
                </div>
                <div className="bg-[var(--bg-elevated)] px-3 py-2 rounded-lg">
                  <span className="text-[var(--text-muted)]">分析時間: </span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {(analyzeResult.analysisTimeMs / 1000).toFixed(1)}s
                  </span>
                </div>
              </div>

              {/* グループ一覧 */}
              <div className="space-y-3">
                {analyzeResult.groups.map((group) => (
                  <div
                    key={group.category}
                    className={`border rounded-lg overflow-hidden transition-colors ${
                      selectedGroups.has(group.category)
                        ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)]"
                    }`}
                  >
                    {/* グループヘッダー */}
                    <div
                      className="flex items-center gap-3 p-4 cursor-pointer"
                      onClick={() => toggleGroup(group.category)}
                    >
                      {/* チェックボックス */}
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedGroups.has(group.category)
                            ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]"
                            : "border-[var(--border-default)]"
                        }`}
                      >
                        {selectedGroups.has(group.category) && (
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

                      {/* アイコン */}
                      <span className="text-xl">
                        {getCategoryIcon(group.category)}
                      </span>

                      {/* ラベル */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[var(--text-primary)]">
                            {group.categoryLabel}
                          </span>
                          <span className="text-sm text-[var(--text-muted)]">
                            ({group.observationIds.length} obs)
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mt-0.5">
                          {group.description}
                        </p>
                      </div>

                      {/* トークン数 */}
                      <div className="text-sm text-[var(--text-muted)]">
                        {formatTokens(group.estimatedTokens)} tokens
                      </div>

                      {/* 展開ボタン */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(group.category);
                        }}
                        className="p-1 hover:bg-[var(--bg-surface)] rounded transition-colors"
                      >
                        <svg
                          className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                            expandedGroups.has(group.category)
                              ? "rotate-180"
                              : ""
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

                    {/* 展開時: observation IDs */}
                    {expandedGroups.has(group.category) && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="bg-[var(--bg-base)] rounded-lg p-3 text-xs font-mono text-[var(--text-muted)] max-h-32 overflow-y-auto">
                          {group.observationIds.map((id, i) => (
                            <div key={id}>
                              {id}
                              {i < group.observationIds.length - 1 && ", "}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="text-sm text-[var(--text-muted)]">
            {selectedGroups.size > 0 && (
              <>
                選択中: {getSelectedObservationIds().length} obs (
                {formatTokens(getSelectedTokens())} tokens)
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleExport}
              disabled={selectedGroups.size === 0 || isExporting || isLoading}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedGroups.size === 0 || isExporting || isLoading
                  ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
                  : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"
              }`}
            >
              {isExporting ? "Exporting..." : "Export & 削除"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
