/**
 * Viewer ページ (R-10: Plugin Viewer UI)
 *
 * - 左サイドバー: プロジェクト切替 + セッション一覧
 * - メイン: React Flow ノードエディタ
 */

import { useCallback, useEffect, useState, useRef } from "react";
import { ViewerSidebar } from "../components/ViewerSidebar";
import { NodeEditor } from "../components/NodeEditor";
import { SmartExportModal } from "../components/SmartExportModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { useTheme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "../components/icons";

interface Session {
  sessionId: string;
  name: string;
  status: "idle" | "active" | "completed" | "error" | "processing";
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  tokenCount?: number;
}

interface Observation {
  observationId: string;
  sessionId: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CurrentSessionData {
  session: Session | null;
  observations: Observation[];
  observationCount: number;
  tokenCount: number;
}

interface MergedSummary {
  shortSummary: string;
  detailedSummary: string;
  keyDecisions?: string[];
  topics?: string[];
  sessionCount: number;
  totalOriginalTokens: number;
  mergedTokens: number;
  compressionRatio: number;
}

type MergeStatus = "idle" | "merging" | "completed" | "error";

export function ViewerPage() {
  const { theme, toggleTheme } = useTheme();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [hiddenSessionIds, setHiddenSessionIds] = useState<string[]>([]);
  const [currentSessionsData, setCurrentSessionsData] = useState<
    CurrentSessionData[]
  >([]);
  const [smartExportOpen, setSmartExportOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Session | null>(null);
  const [editorDeleteTarget, setEditorDeleteTarget] = useState<{
    type: "node" | "edge";
    id: string;
    name: string;
  } | null>(null);
  const [pendingEditorDelete, setPendingEditorDelete] = useState<{
    type: "node" | "edge";
    id: string;
  } | null>(null);
  const deleteResolverRef = useRef<(() => void) | null>(null);

  // マージ関連の状態
  const [mergeStatus, setMergeStatus] = useState<MergeStatus>("idle");
  const [mergedSummary, setMergedSummary] = useState<MergedSummary | null>(
    null
  );

  // エディタに表示するセッション（非表示を除外）
  const visibleSessions = sessions.filter(
    (s) => !hiddenSessionIds.includes(s.sessionId)
  );

  // 完了済みセッションを取得
  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch("/api/sessions?limit=100&status=completed");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setSessions(data.items || []);
    } catch (err) {
      console.error("[ViewerPage] Failed to fetch sessions:", err);
      setSessions([]);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // 現在の進行中セッション（processing または idle）を複数取得 + ポーリング
  useEffect(() => {
    const fetchCurrentSessions = async () => {
      try {
        const allSessions: Session[] = [];

        // processing 状態のセッションを取得（複数対応）
        const processingRes = await fetch(
          "/api/sessions?limit=10&status=processing"
        );
        if (processingRes.ok) {
          const data = await processingRes.json();
          allSessions.push(...(data.items || []));
        }

        // idle 状態のセッションも取得（複数対応）
        const idleRes = await fetch("/api/sessions?limit=10&status=idle");
        if (idleRes.ok) {
          const data = await idleRes.json();
          allSessions.push(...(data.items || []));
        }

        if (allSessions.length === 0) {
          setCurrentSessionsData([]);
          return;
        }

        // 各セッションのobservationsを並列取得
        const sessionsData = await Promise.all(
          allSessions.map(async (session) => {
            try {
              const obsRes = await fetch(
                `/api/sessions/${session.sessionId}/observations?limit=100`
              );
              if (obsRes.ok) {
                const obsData = await obsRes.json();
                return {
                  session,
                  observations: obsData.items || [],
                  observationCount: obsData.items?.length || 0,
                  tokenCount: session.tokenCount || 0,
                };
              }
            } catch {
              // 個別セッションの取得失敗は無視
            }
            return {
              session,
              observations: [],
              observationCount: 0,
              tokenCount: session.tokenCount || 0,
            };
          })
        );

        setCurrentSessionsData(sessionsData);
      } catch (err) {
        console.error("[ViewerPage] Failed to fetch current sessions:", err);
      }
    };

    fetchCurrentSessions();
    // 5秒ごとにポーリング
    const interval = setInterval(fetchCurrentSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  // サイドバーからセッション表示/非表示を切り替え
  const handleSessionToggle = useCallback((session: Session) => {
    setHiddenSessionIds((prev) => {
      if (prev.includes(session.sessionId)) {
        // 非表示リストから削除 → 表示する
        return prev.filter((id) => id !== session.sessionId);
      }
      // 非表示リストに追加 → 隠す
      return [...prev, session.sessionId];
    });
  }, []);

  // セッションクリックで詳細表示
  const handleSessionClick = useCallback((session: Session) => {
    console.log("[Viewer] Session clicked:", session.sessionId);
    // TODO: 詳細画面への遷移を実装
    alert("セッション詳細: " + session.name + "\n\nID: " + session.sessionId);
  }, []);

  // get 操作（セッションコンテキスト注入）
  const handleGetSession = useCallback((sessionId: string) => {
    console.log("[Viewer] Get session:", sessionId);
    // TODO: MCP 経由で inject_context を呼び出し
  }, []);

  // セッション削除ダイアログを開く
  const handleSessionDeleteRequest = useCallback((session: Session) => {
    setDeleteTarget(session);
  }, []);

  // セッション削除を実行
  const handleSessionDelete = useCallback(async () => {
    if (!deleteTarget) return;

    const targetId = deleteTarget.sessionId;

    const response = await fetch(`/api/sessions/${targetId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error?.message || "削除に失敗しました");
    }

    // ローカル状態を即座に更新（リアルタイム反映）
    setSessions((prev) => prev.filter((s) => s.sessionId !== targetId));
    // 非表示リストからも削除
    setHiddenSessionIds((prev) => prev.filter((id) => id !== targetId));
  }, [deleteTarget]);

  // エディタからの削除リクエスト
  const handleEditorDeleteRequest = useCallback(
    (target: { type: "node" | "edge"; id: string; name: string }) => {
      setEditorDeleteTarget(target);
    },
    []
  );

  // エディタ削除を実行
  const handleEditorDelete = useCallback(async () => {
    if (!editorDeleteTarget) return;

    return new Promise<void>((resolve) => {
      deleteResolverRef.current = resolve;
      setPendingEditorDelete({
        type: editorDeleteTarget.type,
        id: editorDeleteTarget.id,
      });
    });
  }, [editorDeleteTarget]);

  // エディタ削除完了
  const handleEditorDeleteComplete = useCallback(() => {
    setPendingEditorDelete(null);
    setEditorDeleteTarget(null);
    if (deleteResolverRef.current) {
      deleteResolverRef.current();
      deleteResolverRef.current = null;
    }
  }, []);

  // export用に選択されたセッション
  const [exportTargetSession, setExportTargetSession] =
    useState<CurrentSessionData | null>(null);

  // export 操作（Smart Export モーダルを開く）
  const handleExportSession = useCallback(
    (sessionId: string) => {
      const targetData = currentSessionsData.find(
        (d) => d.session?.sessionId === sessionId
      );

      if (!targetData?.session || targetData.observationCount === 0) {
        alert("エクスポートするobservationsがありません");
        return;
      }

      console.log("[Viewer] Opening Smart Export modal:", sessionId);
      setExportTargetSession(targetData);
      setSmartExportOpen(true);
    },
    [currentSessionsData]
  );

  // Smart Export 完了時のコールバック
  const handleSmartExportComplete = useCallback(async () => {
    console.log("[Viewer] Smart Export completed");
    await fetchSessions();
  }, [fetchSessions]);

  // マージ処理（セッション接続時に呼び出し）
  const handleMerge = useCallback(
    async (sessionIds: string[]): Promise<MergedSummary | null> => {
      if (sessionIds.length < 2) return null;

      console.log("[Viewer] Starting merge:", sessionIds);
      setMergeStatus("merging");
      setMergedSummary(null);

      try {
        const response = await fetch("/api/merges/with-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceSessionIds: sessionIds }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("[Viewer] Merge failed:", errorData);
          setMergeStatus("error");
          return null;
        }

        const data = await response.json();
        const summary: MergedSummary = {
          shortSummary: data.summary?.shortSummary || "",
          detailedSummary: data.summary?.detailedSummary || "",
          keyDecisions: data.summary?.keyDecisions || [],
          topics: data.summary?.topics || [],
          sessionCount: data.summary?.sessionCount || sessionIds.length,
          totalOriginalTokens: data.summary?.totalOriginalTokens || 0,
          mergedTokens: data.summary?.mergedTokens || 0,
          compressionRatio: data.summary?.compressionRatio || 0,
        };

        setMergedSummary(summary);
        setMergeStatus("completed");
        console.log("[Viewer] Merge completed:", summary);
        return summary;
      } catch (err) {
        console.error("[Viewer] Merge error:", err);
        setMergeStatus("error");
        return null;
      }
    },
    []
  );

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-base)]">
      {/* ヘッダー */}
      <header className="h-12 flex items-center justify-between px-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[var(--color-primary-500)]">
            cnthub
          </span>
          <span className="text-sm text-[var(--text-muted)]">Viewer</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label={
            theme === "dark" ? "ライトモードに切替" : "ダークモードに切替"
          }
        >
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5 text-[var(--text-secondary)]" />
          ) : (
            <MoonIcon className="w-5 h-5 text-[var(--text-secondary)]" />
          )}
        </button>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左サイドバー */}
        <ViewerSidebar
          sessions={sessions}
          onSessionSelect={handleSessionToggle}
          onSessionClick={handleSessionClick}
          onSessionDelete={handleSessionDeleteRequest}
          selectedSessionIds={hiddenSessionIds}
        />

        {/* メインエリア: ノードエディタ */}
        <main className="flex-1 overflow-hidden">
          <NodeEditor
            sessions={visibleSessions}
            currentSessionsData={currentSessionsData}
            onGetSession={handleGetSession}
            onExportSession={handleExportSession}
            onDeleteRequest={handleEditorDeleteRequest}
            pendingDelete={pendingEditorDelete}
            onDeleteComplete={handleEditorDeleteComplete}
            onMerge={handleMerge}
            mergeStatus={mergeStatus}
            mergedSummary={mergedSummary}
          />
        </main>
      </div>

      {/* Smart Export モーダル */}
      {exportTargetSession?.session && (
        <SmartExportModal
          isOpen={smartExportOpen}
          onClose={() => {
            setSmartExportOpen(false);
            setExportTargetSession(null);
          }}
          sessionId={exportTargetSession.session.sessionId}
          sessionName={exportTargetSession.session.name}
          onExportComplete={handleSmartExportComplete}
        />
      )}

      {/* セッション削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleSessionDelete}
        targetType="session"
        targetName={deleteTarget?.name || ""}
        targetId={deleteTarget?.sessionId}
      />

      {/* エディタ削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={!!editorDeleteTarget}
        onClose={() => setEditorDeleteTarget(null)}
        onConfirm={handleEditorDelete}
        targetType={editorDeleteTarget?.type === "node" ? "node" : "edge"}
        targetName={editorDeleteTarget?.name || ""}
        targetId={editorDeleteTarget?.id}
      />
    </div>
  );
}
