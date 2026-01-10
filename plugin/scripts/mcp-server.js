#!/usr/bin/env node
/**
 * cnthub MCP Server
 *
 * Provides session management tools via MCP protocol.
 * Tools:
 * - search: Semantic search across sessions
 * - list_sessions: Get session index (Level 0)
 * - get_session: Get session details (Level 1)
 * - inject_context: Inject context from past sessions
 */

const readline = require("readline");
const path = require("path");

const API_URL = process.env.CNTHUB_API_URL || "http://localhost:3048";
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT || path.dirname(__dirname);
const FETCH_TIMEOUT = Number(process.env.CNTHUB_TIMEOUT) || 10000;

// 環境変数未設定の警告
if (!process.env.CNTHUB_API_URL) {
  console.error(
    "[cnthub] CNTHUB_API_URL not set, using default: http://localhost:3048"
  );
}

// MCP Protocol constants
const JSONRPC_VERSION = "2.0";

// キャッシュ設定
const currentSessionCache = {
  sessionId: null,
  timestamp: 0,
  ttl: 30000, // 30秒
};

/**
 * タイムアウト付き fetch
 * @param {string} url - リクエスト URL
 * @param {Object} options - fetch オプション
 * @param {number} [timeout=FETCH_TIMEOUT] - タイムアウト（ミリ秒）
 * @returns {Promise<Response>}
 * @throws {Error} タイムアウト時は name='AbortError'、その他はネットワークエラー
 */
async function fetchWithTimeout(url, options = {}, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * ページネーション対応のレスポンスからアイテム配列を抽出
 * @param {Array|Object} data - APIレスポンス
 * @returns {Array} アイテム配列
 */
function extractItems(data) {
  return Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.results)
        ? data.results
        : [];
}

// Tool definitions
const TOOLS = [
  {
    name: "search",
    description:
      "Search sessions using semantic search. Returns relevant sessions based on the query.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query to find relevant sessions",
        },
        limit: {
          type: "number",
          description: "Maximum number of results (default: 10)",
          default: 10,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "list_sessions",
    description:
      "List session index (Level 0). Returns lightweight session metadata: id, name, status, tags.",
    inputSchema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          description:
            "Filter by status: in_progress, completed, error, merged",
          enum: ["in_progress", "completed", "error", "merged"],
        },
        projectId: {
          type: "string",
          description: "Filter by project ID",
        },
        limit: {
          type: "number",
          description: "Maximum number of results (default: 20)",
          default: 20,
        },
      },
    },
  },
  {
    name: "get_session",
    description:
      "Get full session details (Level 1). Returns summary, changes, errors, and decisions.",
    inputSchema: {
      type: "object",
      properties: {
        sessionId: {
          type: "string",
          description: "Session ID to retrieve",
        },
      },
      required: ["sessionId"],
    },
  },
  {
    name: "inject_context",
    description:
      "Get context from past sessions for injection. Useful for continuing work from previous sessions.",
    inputSchema: {
      type: "object",
      properties: {
        sessionIds: {
          type: "array",
          items: { type: "string" },
          description: "Session IDs to get context from",
        },
        format: {
          type: "string",
          description: "Output format: summary, full, or changes",
          enum: ["summary", "full", "changes"],
          default: "summary",
        },
      },
      required: ["sessionIds"],
    },
  },
  {
    name: "list_observations",
    description:
      "List observations for a session. Returns tool uses, decisions, errors, and notes.",
    inputSchema: {
      type: "object",
      properties: {
        sessionId: {
          type: "string",
          description:
            "Session ID to get observations from. Use 'current' for the current session.",
        },
        type: {
          type: "string",
          description: "Filter by observation type",
          enum: [
            "tool_use",
            "decision",
            "error",
            "learning",
            "note",
            "file_change",
          ],
        },
        limit: {
          type: "number",
          description: "Maximum number of results (default: 100)",
          default: 100,
        },
      },
      required: ["sessionId"],
    },
  },
  {
    name: "export_observations",
    description:
      "Export selected observations as a new session with AI-generated summary. Used by /cnthub:export command.",
    inputSchema: {
      type: "object",
      properties: {
        sourceSessionId: {
          type: "string",
          description: "Source session ID to export from",
        },
        observationIds: {
          type: "array",
          items: { type: "string" },
          description: "Observation IDs to include in the export",
        },
        groupName: {
          type: "string",
          description: "Name for the exported session/group",
        },
      },
      required: ["sourceSessionId", "observationIds", "groupName"],
    },
  },
  {
    name: "get_connected_sessions",
    description:
      "Get context from sessions connected via UI edges. Returns context from sessions that were connected in the NodeEditor UI.",
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          description: "Output format: summary, full, or changes",
          enum: ["summary", "full", "changes"],
          default: "summary",
        },
      },
    },
  },
];

/**
 * MCP リクエストを処理
 * @param {Object} request - JSON-RPC リクエスト
 * @returns {Promise<Object>} JSON-RPC レスポンス
 */
async function handleRequest(request) {
  const { method, params, id } = request;

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: JSONRPC_VERSION,
          id,
          result: {
            protocolVersion: "2024-11-05",
            serverInfo: {
              name: "cnthub-session",
              version: "0.1.0",
            },
            capabilities: {
              tools: {},
            },
          },
        };

      case "tools/list":
        return {
          jsonrpc: JSONRPC_VERSION,
          id,
          result: {
            tools: TOOLS,
          },
        };

      case "tools/call":
        return await handleToolCall(params, id);

      default:
        return {
          jsonrpc: JSONRPC_VERSION,
          id,
          error: {
            code: -32601,
            message: `Unknown method: ${method}`,
          },
        };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      jsonrpc: JSONRPC_VERSION,
      id,
      error: {
        code: -32603,
        message,
      },
    };
  }
}

/**
 * ツール呼び出しを処理
 * @param {Object} params - ツールパラメータ
 * @param {string|number} id - リクエスト ID
 * @returns {Promise<Object>} JSON-RPC レスポンス
 */
async function handleToolCall(params, id) {
  const { name, arguments: args } = params;

  try {
    let result;

    switch (name) {
      case "search":
        result = await searchSessions(args);
        break;

      case "list_sessions":
        result = await listSessions(args);
        break;

      case "get_session":
        result = await getSession(args);
        break;

      case "inject_context":
        result = await injectContext(args);
        break;

      case "list_observations":
        result = await listObservations(args);
        break;

      case "export_observations":
        result = await exportObservations(args);
        break;

      case "get_connected_sessions":
        result = await getConnectedSessions(args);
        break;

      default:
        return {
          jsonrpc: JSONRPC_VERSION,
          id,
          error: {
            code: -32602,
            message: `Unknown tool: ${name}`,
          },
        };
    }

    return {
      jsonrpc: JSONRPC_VERSION,
      id,
      result: {
        content: [
          {
            type: "text",
            text:
              typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2),
          },
        ],
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      jsonrpc: JSONRPC_VERSION,
      id,
      result: {
        content: [
          {
            type: "text",
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      },
    };
  }
}

// Tool implementations

/**
 * セマンティック検索
 * @param {Object} options - 検索オプション
 * @param {string} options.query - 検索クエリ
 * @param {number} [options.limit=10] - 結果数の上限
 * @returns {Promise<Array>} 検索結果
 */
async function searchSessions({ query, limit = 10 }) {
  // 入力バリデーション
  if (typeof query !== "string" || query.length === 0) {
    throw new Error(
      "Invalid query parameter: query must be a non-empty string"
    );
  }
  const safeLimit = Math.min(Math.max(1, Math.floor(Number(limit) || 10)), 50);

  const params = new URLSearchParams({
    query,
    limit: String(safeLimit),
  });
  const response = await fetchWithTimeout(`${API_URL}/api/search?${params}`);

  if (!response.ok) {
    console.error(`[cnthub] Search request failed: ${response.status}`);
    throw new Error("Search request failed. Please check the API server.");
  }

  const data = await response.json();
  return extractItems(data);
}

/**
 * セッション一覧取得（Level 0）
 * @param {Object} options - フィルタオプション
 * @returns {Promise<Array>} セッション一覧
 */
async function listSessions({ status, projectId, limit = 20 }) {
  // 入力バリデーション
  const safeLimit = Math.min(Math.max(1, Math.floor(Number(limit) || 20)), 100);

  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (projectId) params.set("projectId", projectId);
  params.set("limit", safeLimit.toString());

  const response = await fetchWithTimeout(`${API_URL}/api/sessions?${params}`);

  if (!response.ok) {
    console.error(`[cnthub] List sessions failed: ${response.status}`);
    throw new Error("Failed to list sessions. Please check the API server.");
  }

  const data = await response.json();
  const sessions = extractItems(data);

  // Return Level 0 index (lightweight)
  return sessions.map((s) => ({
    id: s.sessionId || s.id,
    name: s.name || s.title,
    status: s.status,
    tags: s.tags || [],
    createdAt: s.createdAt,
  }));
}

/**
 * セッション詳細取得（Level 1）
 * @param {Object} options - オプション
 * @param {string} options.sessionId - セッション ID
 * @returns {Promise<Object>} セッション詳細
 */
async function getSession({ sessionId }) {
  if (!sessionId || typeof sessionId !== "string") {
    throw new Error("Invalid sessionId parameter");
  }

  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sessionId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Session not found: ${sessionId}`);
    }
    console.error(`[cnthub] Get session failed: ${response.status}`);
    throw new Error("Failed to get session. Please check the API server.");
  }

  return await response.json();
}

/**
 * 現在のセッション ID を解決（キャッシュ付き）
 * @returns {Promise<string|null>} セッション ID（複数該当する場合は最初の1件）
 * @throws {Error} API通信エラー時
 */
async function resolveCurrentSession() {
  const now = Date.now();

  // キャッシュが有効な場合は返す
  if (
    currentSessionCache.sessionId &&
    now - currentSessionCache.timestamp < currentSessionCache.ttl
  ) {
    return currentSessionCache.sessionId;
  }

  try {
    const response = await fetchWithTimeout(`${API_URL}/api/sessions?limit=10`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.error(
        `[cnthub] Failed to resolve current session: HTTP ${response.status}`
      );
      throw new Error("Failed to fetch sessions from API");
    }

    const data = await response.json();
    const sessions = extractItems(data);

    // in_progress または processing のセッションを探す
    const currentSession = sessions.find(
      (s) => s.status === "in_progress" || s.status === "processing"
    );

    const sessionId = currentSession
      ? currentSession.sessionId || currentSession.id
      : null;

    // キャッシュ更新
    currentSessionCache.sessionId = sessionId;
    currentSessionCache.timestamp = now;

    return sessionId;
  } catch (error) {
    // タイムアウトやネットワークエラーは再throw
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[cnthub] Error resolving current session: ${message}`);
    throw new Error(`Failed to resolve current session: ${message}`);
  }
}

/**
 * 観測記録一覧取得
 * @param {Object} options - オプション
 * @param {string} options.sessionId - セッション ID ('current' で現在のセッション)
 * @param {string} [options.type] - 観測タイプでフィルタ
 * @param {number} [options.limit=100] - 結果数の上限
 * @returns {Promise<Array>} 観測記録一覧
 */
async function listObservations({ sessionId, type, limit = 100 }) {
  // 入力バリデーション
  const safeLimit = Math.min(
    Math.max(1, Math.floor(Number(limit) || 100)),
    500
  );

  // 'current' の場合は現在のセッションを解決
  let resolvedSessionId = sessionId;
  if (sessionId === "current") {
    try {
      resolvedSessionId = await resolveCurrentSession();
      if (!resolvedSessionId) {
        throw new Error(
          "No active session found. Please start a session or use a specific session ID."
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to resolve current session: ${message}`);
    }
  }

  const params = new URLSearchParams();
  if (type) params.set("type", type);
  params.set("limit", safeLimit.toString());

  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${resolvedSessionId}/observations?${params}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Session not found: ${resolvedSessionId}`);
    }
    console.error(`[cnthub] List observations failed: ${response.status}`);
    throw new Error(
      "Failed to list observations. Please check the API server."
    );
  }

  const data = await response.json();
  return extractItems(data);
}

/**
 * 観測記録をエクスポート（新セッションとして保存）
 * @param {Object} options - オプション
 * @param {string} options.sourceSessionId - ソースセッション ID
 * @param {string[]} options.observationIds - エクスポートする観測 ID 配列
 * @param {string} options.groupName - グループ名（新セッション名）
 * @returns {Promise<Object>} 作成されたセッション情報
 */
async function exportObservations({
  sourceSessionId,
  observationIds,
  groupName,
}) {
  // 入力バリデーション
  if (!sourceSessionId || typeof sourceSessionId !== "string") {
    throw new Error("Invalid sourceSessionId parameter");
  }
  if (!Array.isArray(observationIds) || observationIds.length === 0) {
    throw new Error("observationIds must be a non-empty array");
  }
  if (!groupName || typeof groupName !== "string") {
    throw new Error("groupName must be a non-empty string");
  }

  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sourceSessionId}/export`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observationIds, groupName }),
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Session not found: ${sourceSessionId}`);
    }
    console.error(`[cnthub] Export observations failed: ${response.status}`);
    throw new Error(
      "Failed to export observations. Please check the API server."
    );
  }

  return await response.json();
}

/**
 * セッション要約取得
 * @param {Object} options - オプション
 * @param {string} options.sessionId - セッション ID
 * @returns {Promise<Object>} セッション要約
 */
async function getSessionSummary({ sessionId }) {
  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sessionId}/summary`
  );

  if (!response.ok) {
    // 要約が見つからない場合は null を返す
    if (response.status === 404) {
      return null;
    }
    console.error(`[cnthub] Get session summary failed: ${response.status}`);
    throw new Error(
      "Failed to get session summary. Please check the API server."
    );
  }

  return await response.json();
}

/**
 * 観測記録を作成
 * @param {string} sessionId - セッション ID
 * @param {Object} data - 観測データ
 * @param {string} data.type - 観測タイプ
 * @param {string} data.title - タイトル
 * @param {string} data.content - 内容
 * @param {Object} [data.metadata] - メタデータ
 * @returns {Promise<Object|null>} 作成された観測記録、またはエラー時は null
 */
async function createObservation(sessionId, data) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/sessions/${sessionId}/observations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.error(
        `[cnthub] Failed to create observation: HTTP ${response.status}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[cnthub] Error creating observation: ${message}`);
    return null;
  }
}

/**
 * Edge作成API呼び出し
 * @param {string} sourceSessionId - ソースセッションID
 * @param {string} targetClaudeSessionId - ターゲットのClaude Session ID
 * @returns {Promise<Object|null>} 作成されたEdge、または失敗時はnull
 */
async function createEdgeApi(sourceSessionId, targetClaudeSessionId) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/api/edges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceSessionId, targetClaudeSessionId }),
    });

    if (!response.ok) {
      // 409はEdge既存、他のエラーも無視（既にあれば問題ない）
      if (response.status === 409) {
        console.error(
          `[cnthub] Edge already exists: ${sourceSessionId} -> ${targetClaudeSessionId}`
        );
        return null;
      }
      console.error(`[cnthub] Failed to create edge: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[cnthub] Error creating edge: ${message}`);
    return null;
  }
}

/**
 * コンテキスト注入（並列処理）
 * @param {Object} options - オプション
 * @param {string[]} options.sessionIds - セッション ID 配列
 * @param {string} [options.format="summary"] - 出力形式
 * @returns {Promise<Array>} コンテキストデータ
 */
async function injectContext({ sessionIds, format = "summary" }) {
  // 入力バリデーション
  if (!Array.isArray(sessionIds) || sessionIds.length === 0) {
    throw new Error("sessionIds must be a non-empty array");
  }

  // 並列でセッションと要約を取得（Promise.allSettled でエラー分離）
  const dataPromises = sessionIds.map(async (sessionId) => {
    try {
      // セッションと要約を並列で取得
      const [session, summary] = await Promise.all([
        getSession({ sessionId }),
        getSessionSummary({ sessionId }),
      ]);
      return { status: "fulfilled", session, summary };
    } catch (error) {
      return {
        status: "rejected",
        id: sessionId,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

  const dataList = await Promise.all(dataPromises);
  const results = [];

  for (const data of dataList) {
    // エラーの場合はそのまま追加
    if (data.status === "rejected") {
      results.push({ id: data.id, error: data.error });
      continue;
    }

    const { session, summary } = data;

    switch (format) {
      case "summary":
        results.push({
          id: session.sessionId || session.id,
          name: session.name,
          summary: summary?.shortSummary || "No summary available",
        });
        break;

      case "changes":
        results.push({
          id: session.sessionId || session.id,
          name: session.name,
          changes: summary?.changes || [],
          decisions: summary?.decisions || summary?.keyDecisions || [],
        });
        break;

      case "full":
      default:
        results.push({
          ...session,
          summary,
        });
    }
  }

  // 現在のセッションに注入したコンテキストを記録
  try {
    const currentSessionId = await resolveCurrentSession();
    if (currentSessionId && results.length > 0) {
      // 注入したコンテキストの要約を作成
      const injectedSessions = results
        .filter((r) => !r.error)
        .map((r) => `- ${r.name} (${r.id})`)
        .join("\n");

      const injectedContent = results
        .filter((r) => !r.error)
        .map((r) => {
          let content = `## ${r.name} (${r.id})\n`;
          if (r.summary) content += `Summary: ${r.summary}\n`;
          if (r.changes && r.changes.length > 0) {
            content += `Changes:\n${r.changes.map((c) => `- ${c}`).join("\n")}\n`;
          }
          if (r.decisions && r.decisions.length > 0) {
            content += `Decisions:\n${r.decisions.map((d) => `- ${d}`).join("\n")}\n`;
          }
          return content;
        })
        .join("\n---\n");

      await createObservation(currentSessionId, {
        type: "note",
        title: `Context Injected: ${results.filter((r) => !r.error).length} session(s)`,
        content: injectedContent,
        metadata: {
          source: "cnthub:get",
          sessionIds: sessionIds,
          format: format,
          injectedAt: new Date().toISOString(),
        },
      });

      // Edge作成（UI同期用）- 各セッションからcurrentSessionへのEdgeを作成
      // これによりWebSocket経由でUIに通知される
      const successfulSessionIds = results
        .filter((r) => !r.error)
        .map((r) => r.id);

      for (const sourceSessionId of successfulSessionIds) {
        await createEdgeApi(sourceSessionId, currentSessionId);
      }
    }
  } catch (error) {
    // 記録に失敗しても注入自体は成功とする
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[cnthub] Failed to record injected context: ${message}`);
  }

  return results;
}

/**
 * UIで接続されたセッションのコンテキストを取得
 * @param {Object} options - オプション
 * @param {string} [options.format="summary"] - 出力形式
 * @returns {Promise<Object>} 接続セッションのコンテキスト
 */
async function getConnectedSessions({ format = "summary" } = {}) {
  // 現在のセッションIDを取得
  const currentSessionId = await resolveCurrentSession();
  if (!currentSessionId) {
    return {
      connected: false,
      message: "現在のセッションが見つかりません。",
      context: null,
    };
  }

  // APIからUIで接続されたセッションのコンテキストを取得
  const response = await fetchWithTimeout(
    `${API_URL}/api/inject/connected/${currentSessionId}`
  );

  if (!response.ok) {
    console.error(
      `[cnthub] Failed to get connected sessions: ${response.status}`
    );
    throw new Error(
      "Failed to get connected sessions. Please check the API server."
    );
  }

  const data = await response.json();

  if (!data.connected || data.sessionCount === 0) {
    return {
      connected: false,
      message:
        "UIで接続されたセッションがありません。NodeEditorでセッションを接続してください。",
      sourceSessionIds: [],
      context: null,
    };
  }

  // format に応じた追加処理が必要な場合はここで対応
  // 現時点では API からのコンテキストをそのまま返す
  return {
    connected: true,
    sessionCount: data.sessionCount,
    sourceSessionIds: data.sourceSessionIds,
    context: data.context,
    format,
  };
}

// Main loop - read JSON-RPC messages from stdin
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const request = JSON.parse(line);
      const response = await handleRequest(request);
      console.log(JSON.stringify(response));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(
        JSON.stringify({
          jsonrpc: JSONRPC_VERSION,
          id: null,
          error: {
            code: -32700,
            message: `Parse error: ${message}`,
          },
        })
      );
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[cnthub] MCP server error: ${message}`);
  process.exit(1);
});
