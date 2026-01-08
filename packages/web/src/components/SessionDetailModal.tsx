/**
 * セッション詳細モーダル (UI-FIX-01)
 *
 * セッションの詳細情報を表示するモーダル
 */

import { useState, useCallback, useEffect } from "react";
import {
  XMarkIcon,
  DocumentIcon,
  ClockIcon,
  PencilIcon,
  CheckIcon,
} from "./icons";

interface SessionDetail {
  sessionId: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  summary?: string;
  observationCount?: number;
  messageCount?: number;
  tokenCount?: number;
}

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string | null;
  onDelete?: (sessionId: string) => void;
  onNameChange?: (sessionId: string, newName: string) => void;
}

export function SessionDetailModal({
  isOpen,
  onClose,
  sessionId,
  onDelete,
  onNameChange,
}: SessionDetailModalProps) {
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !sessionId) return;

    const fetchSessionDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        // セッション基本情報を取得
        const [sessionRes, summaryRes, observationsRes] = await Promise.all([
          fetch(`/api/sessions/${sessionId}`),
          fetch(`/api/sessions/${sessionId}/summary`),
          fetch(`/api/sessions/${sessionId}/observations?limit=1`),
        ]);

        if (!sessionRes.ok) {
          throw new Error("セッション情報の取得に失敗しました");
        }

        const sessionData = await sessionRes.json();
        const summaryData = summaryRes.ok ? await summaryRes.json() : null;
        const observationsData = observationsRes.ok
          ? await observationsRes.json()
          : null;

        setSession({
          ...sessionData,
          summary: summaryData?.summary,
          observationCount:
            observationsData?.pagination?.total || sessionData.observationCount,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "セッション情報の取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetail();
  }, [isOpen, sessionId]);

  const handleClose = useCallback(() => {
    setSession(null);
    setError(null);
    setIsEditing(false);
    setEditName("");
    onClose();
  }, [onClose]);

  // 名前編集を開始
  const handleStartEdit = useCallback(() => {
    if (session) {
      setEditName(session.name);
      setIsEditing(true);
    }
  }, [session]);

  // 名前編集をキャンセル
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditName("");
  }, []);

  // 名前を保存
  const handleSaveName = useCallback(async () => {
    if (!session || !editName.trim()) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/sessions/${session.sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });

      if (!response.ok) {
        throw new Error("名前の更新に失敗しました");
      }

      const newName = editName.trim();
      // ローカル状態を更新
      setSession({ ...session, name: newName });
      setIsEditing(false);
      setEditName("");
      // 親コンポーネントに通知
      onNameChange?.(session.sessionId, newName);
    } catch (err) {
      alert(err instanceof Error ? err.message : "名前の更新に失敗しました");
    } finally {
      setSaving(false);
    }
  }, [session, editName, onNameChange]);

  // Escキーでモーダルを閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: Record<string, string> = {
    idle: "bg-gray-500",
    active: "bg-blue-500",
    completed: "bg-green-500",
    error: "bg-red-500",
    processing: "bg-yellow-500",
    merged: "bg-purple-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[500px] max-h-[80vh] border border-[var(--border-default)] flex flex-col">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--color-primary-500)]/10 rounded-lg">
              <DocumentIcon className="w-5 h-5 text-[var(--color-primary-500)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              セッション詳細
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-[var(--bg-elevated)] rounded animate-pulse" />
              <div className="h-4 bg-[var(--bg-elevated)] rounded animate-pulse w-3/4" />
              <div className="h-20 bg-[var(--bg-elevated)] rounded animate-pulse" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          ) : session ? (
            <div className="space-y-4">
              {/* セッション名 */}
              <div>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-2 text-lg font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={saving || !editName.trim()}
                      className="p-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] disabled:opacity-50 transition-colors"
                      title="保存"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
                      title="キャンセル"
                    >
                      <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group">
                    <h3 className="text-xl font-medium text-[var(--text-primary)]">
                      {session.name}
                    </h3>
                    <button
                      onClick={handleStartEdit}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] rounded-lg transition-all"
                      title="名前を編集"
                    >
                      <PencilIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[session.status] || "bg-gray-500"}`}
                  />
                  <span className="text-sm text-[var(--text-secondary)] capitalize">
                    {session.status}
                  </span>
                </div>
              </div>

              {/* メタ情報 */}
              <div className="bg-[var(--bg-elevated)] rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)]">作成日時:</span>
                  <span className="text-[var(--text-primary)]">
                    {formatDate(session.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)]">更新日時:</span>
                  <span className="text-[var(--text-primary)]">
                    {formatDate(session.updatedAt)}
                  </span>
                </div>
                {session.observationCount !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <DocumentIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-[var(--text-muted)]">観測記録:</span>
                    <span className="text-[var(--text-primary)]">
                      {session.observationCount}件
                    </span>
                  </div>
                )}
                {session.tokenCount !== undefined && session.tokenCount > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 text-center text-[var(--text-muted)]">
                      #
                    </span>
                    <span className="text-[var(--text-muted)]">トークン:</span>
                    <span className="text-[var(--text-primary)]">
                      {session.tokenCount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* 要約 */}
              {session.summary && (
                <div>
                  <h4 className="text-sm font-medium text-[var(--text-muted)] mb-2">
                    要約
                  </h4>
                  <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
                    <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                      {session.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* セッションID */}
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  ID: {session.sessionId}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-between flex-shrink-0">
          {onDelete && sessionId ? (
            <button
              onClick={() => {
                onDelete(sessionId);
                handleClose();
              }}
              className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              削除
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
