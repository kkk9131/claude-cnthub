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
const FETCH_TIMEOUT = 10000; // 10秒

// MCP Protocol constants
const JSONRPC_VERSION = "2.0";

/**
 * タイムアウト付き fetch
 * @param {string} url - リクエスト URL
 * @param {Object} options - fetch オプション
 * @param {number} [timeout=FETCH_TIMEOUT] - タイムアウト（ミリ秒）
 * @returns {Promise<Response>}
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
  } finally {
    clearTimeout(timeoutId);
  }
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
  const response = await fetchWithTimeout(
    `${API_URL}/api/search?query=${encodeURIComponent(query)}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  const data = await response.json();
  // Handle paginated response: { items: [...], pagination: {...} }
  return Array.isArray(data) ? data : data.items || data.results || [];
}

/**
 * セッション一覧取得（Level 0）
 * @param {Object} options - フィルタオプション
 * @returns {Promise<Array>} セッション一覧
 */
async function listSessions({ status, projectId, limit = 20 }) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (projectId) params.set("projectId", projectId);
  params.set("limit", limit.toString());

  const response = await fetchWithTimeout(`${API_URL}/api/sessions?${params}`);

  if (!response.ok) {
    throw new Error(`List sessions failed: ${response.status}`);
  }

  const data = await response.json();

  // Handle paginated response: { items: [...], pagination: {...} }
  const sessions = Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : [];

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
  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sessionId}`
  );

  if (!response.ok) {
    throw new Error(`Get session failed: ${response.status}`);
  }

  return await response.json();
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
  const params = new URLSearchParams();
  if (sessionId && sessionId !== "current") {
    params.set("sessionId", sessionId);
  }
  if (type) params.set("type", type);
  params.set("limit", limit.toString());

  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sessionId}/observations?${params}`
  );

  if (!response.ok) {
    throw new Error(`List observations failed: ${response.status}`);
  }

  const data = await response.json();
  // Handle paginated response
  return Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : [];
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
  const response = await fetchWithTimeout(
    `${API_URL}/api/sessions/${sourceSessionId}/export`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observationIds, groupName }),
    }
  );

  if (!response.ok) {
    throw new Error(`Export observations failed: ${response.status}`);
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
    throw new Error(`Get session summary failed: ${response.status}`);
  }

  return await response.json();
}

/**
 * コンテキスト注入（並列処理）
 * @param {Object} options - オプション
 * @param {string[]} options.sessionIds - セッション ID 配列
 * @param {string} [options.format="summary"] - 出力形式
 * @returns {Promise<Array>} コンテキストデータ
 */
async function injectContext({ sessionIds, format = "summary" }) {
  // 並列でセッションと要約を取得
  const dataPromises = sessionIds.map(async (sessionId) => {
    try {
      // セッションと要約を並列で取得
      const [session, summary] = await Promise.all([
        getSession({ sessionId }),
        getSessionSummary({ sessionId }),
      ]);
      return { session, summary };
    } catch (error) {
      return {
        id: sessionId,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

  const dataList = await Promise.all(dataPromises);
  const results = [];

  for (const data of dataList) {
    // エラーの場合はそのまま追加
    if (data.error) {
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

  return results;
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
