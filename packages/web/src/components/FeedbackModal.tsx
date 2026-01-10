/**
 * フィードバックモーダル
 *
 * バグ報告・機能要望・改善提案などを送信
 */

import { useState, useCallback } from "react";
import {
  XMarkIcon,
  BugIcon,
  LightBulbIcon,
  WrenchIcon,
  ChatIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "./icons";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = "bug" | "feature_request" | "improvement" | "other";

interface FeedbackCategory {
  type: FeedbackType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const feedbackCategories: FeedbackCategory[] = [
  {
    type: "bug",
    label: "バグ報告",
    icon: <BugIcon className="w-4 h-4" />,
    description: "問題や不具合を報告",
  },
  {
    type: "feature_request",
    label: "機能要望",
    icon: <LightBulbIcon className="w-4 h-4" />,
    description: "新機能のリクエスト",
  },
  {
    type: "improvement",
    label: "改善提案",
    icon: <WrenchIcon className="w-4 h-4" />,
    description: "既存機能の改善",
  },
  {
    type: "other",
    label: "その他",
    icon: <ChatIcon className="w-4 h-4" />,
    description: "その他のフィードバック",
  },
];

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charCount = content.length;
  const minChars = 10;
  const maxChars = 1000;
  const isValidLength = charCount >= minChars && charCount <= maxChars;

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setSelectedType(null);
      setContent("");
      setError(null);
      setIsSuccess(false);
      onClose();
    }
  }, [isSubmitting, onClose]);

  const handleSubmit = useCallback(async () => {
    if (!selectedType) {
      setError("カテゴリを選択してください");
      return;
    }

    if (!isValidLength) {
      setError(`内容は${minChars}〜${maxChars}文字で入力してください`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "送信に失敗しました");
      }

      setIsSuccess(true);
      setSelectedType(null);
      setContent("");

      // 3秒後に自動で閉じる
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedType, content, isValidLength, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[480px] max-h-[85vh] overflow-hidden border border-[var(--border-default)]">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <BugIcon className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              フィードバック
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          {isSuccess ? (
            // 成功表示
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                送信完了!
              </h3>
              <p className="text-[var(--text-muted)] text-sm text-center">
                フィードバックをお送りいただきありがとうございます。
                <br />
                いただいたご意見は今後の改善に活かします。
              </p>
            </div>
          ) : (
            <>
              {/* カテゴリ選択 */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                  カテゴリを選択
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackCategories.map((category) => (
                    <button
                      key={category.type}
                      type="button"
                      onClick={() => setSelectedType(category.type)}
                      className={`
                        flex flex-col items-start p-3 rounded-lg border transition-all duration-200
                        ${
                          selectedType === category.type
                            ? "border-orange-500 bg-orange-500/10 text-orange-500"
                            : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {category.icon}
                        <span className="text-xs font-medium">
                          {category.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {category.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 内容入力 */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">
                  内容
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="詳しく教えてください..."
                  className={`
                    w-full h-32 p-3 rounded-lg border bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)]
                    text-sm resize-none focus:outline-none transition-colors
                    ${
                      error && !isValidLength
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border-default)] focus:border-orange-500"
                    }
                  `}
                />
                <div className="flex justify-between items-center mt-1">
                  <span
                    className={`text-xs ${
                      charCount < minChars
                        ? "text-[var(--text-muted)]"
                        : charCount > maxChars
                          ? "text-red-500"
                          : "text-[var(--text-muted)]"
                    }`}
                  >
                    {charCount < minChars
                      ? `あと${minChars - charCount}文字以上`
                      : charCount > maxChars
                        ? `${charCount - maxChars}文字超過`
                        : ""}
                  </span>
                  <span
                    className={`text-xs ${
                      charCount > maxChars
                        ? "text-red-500"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {charCount}/{maxChars}
                  </span>
                </div>
              </div>

              {/* エラー表示 */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* フッター */}
        {!isSuccess && (
          <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedType || !isValidLength}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2
                ${
                  isSubmitting || !selectedType || !isValidLength
                    ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4" />
                  送信する
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
