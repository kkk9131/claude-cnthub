/**
 * Viewer ページ (R-10: Plugin Viewer UI)
 *
 * - 左サイドバー: プロジェクト切替 + セッション一覧
 * - メイン: React Flow ノードエディタ
 */

import { useCallback, useEffect, useState } from "react";
import { ViewerSidebar } from "../components/ViewerSidebar";
import { NodeEditor } from "../components/NodeEditor";
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

export function ViewerPage() {
  const { theme, toggleTheme } = useTheme();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [hiddenSessionIds, setHiddenSessionIds] = useState<string[]>([]);
  const [currentSessionData, setCurrentSessionData] =
    useState<CurrentSessionData>({
      session: null,
      observations: [],
      observationCount: 0,
      tokenCount: 0,
    });

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

  // 現在のセッション（processing または最新の idle）を取得 + ポーリング
  useEffect(() => {
    const fetchCurrentSession = async () => {
      try {
        // まず processing 状態のセッションを取得
        let sessionRes = await fetch("/api/sessions?limit=1&status=processing");
        if (!sessionRes.ok) return;
        let sessionData = await sessionRes.json();
        let currentSession = sessionData.items?.[0] || null;

        // processing がなければ最新の idle セッションを取得
        if (!currentSession) {
          sessionRes = await fetch("/api/sessions?limit=1&status=idle");
          if (!sessionRes.ok) return;
          sessionData = await sessionRes.json();
          currentSession = sessionData.items?.[0] || null;
        }

        if (currentSession) {
          // セッションのobservationsを取得
          const obsRes = await fetch(
            `/api/sessions/${currentSession.sessionId}/observations?limit=100`
          );
          if (obsRes.ok) {
            const obsData = await obsRes.json();
            setCurrentSessionData({
              session: currentSession,
              observations: obsData.items || [],
              observationCount: obsData.items?.length || 0,
              tokenCount: currentSession.tokenCount || 0,
            });
          }
        }
      } catch (err) {
        console.error("[ViewerPage] Failed to fetch current session:", err);
      }
    };

    fetchCurrentSession();
    // 5秒ごとにポーリング
    const interval = setInterval(fetchCurrentSession, 5000);
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

  // export 操作（選択セッションを新規保存）
  const handleExportSession = useCallback(
    async (sessionIds: string[]) => {
      const session = currentSessionData.session;
      const observations = currentSessionData.observations;
      const obsCount = observations.length;

      if (!session || obsCount === 0) {
        alert("エクスポートするobservationsがありません");
        return;
      }

      console.log("[Viewer] Export sessions:", sessionIds);

      // 確認ダイアログ
      const groupName = window.prompt(
        `Export: ${obsCount} observations\n\n新しいセッション名を入力してください:`,
        `Export from ${session.name}`
      );

      if (!groupName) {
        console.log("[Viewer] Export cancelled");
        return;
      }

      try {
        const observationIds = observations.map((o) => o.observationId);

        console.log("[Viewer] Exporting:", {
          sessionId: session.sessionId,
          observationIds: observationIds.slice(0, 5),
          totalCount: observationIds.length,
          groupName,
        });

        const response = await fetch(
          `/api/sessions/${session.sessionId}/export`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ observationIds, groupName }),
          }
        );

        const responseText = await response.text();
        console.log("[Viewer] Response:", response.status, responseText);

        if (!response.ok) {
          const error = JSON.parse(responseText);
          throw new Error(
            error.error?.message || `Export failed: ${response.status}`
          );
        }

        const result = JSON.parse(responseText);
        alert(
          `Export 完了!\n\n新しいセッション: ${result.session?.sessionId}\n観測数: ${result.observations?.length || 0}`
        );

        console.log("[Viewer] Export result:", result);

        // セッション一覧を再取得してUIを更新
        await fetchSessions();
      } catch (err) {
        console.error("[Viewer] Export error:", err);
        alert(
          `Export 失敗: ${err instanceof Error ? err.message : "Unknown error"}`
        );
      }
    },
    [currentSessionData, fetchSessions]
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
          onSessionSelect={handleSessionToggle}
          onSessionClick={handleSessionClick}
          selectedSessionIds={hiddenSessionIds}
        />

        {/* メインエリア: ノードエディタ */}
        <main className="flex-1 overflow-hidden">
          <NodeEditor
            sessions={visibleSessions}
            currentSessionData={currentSessionData}
            onGetSession={handleGetSession}
            onExportSession={handleExportSession}
          />
        </main>
      </div>
    </div>
  );
}
