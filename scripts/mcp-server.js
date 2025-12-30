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

const API_URL = process.env.CNTHUB_API_URL || "http://localhost:3001";
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

  return await response.json();
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

  const sessions = await response.json();

  // Return Level 0 index (lightweight)
  return sessions.map((s) => ({
    id: s.id,
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
 * コンテキスト注入（並列処理）
 * @param {Object} options - オプション
 * @param {string[]} options.sessionIds - セッション ID 配列
 * @param {string} [options.format="summary"] - 出力形式
 * @returns {Promise<Array>} コンテキストデータ
 */
async function injectContext({ sessionIds, format = "summary" }) {
  // 並列でセッション取得
  const sessionPromises = sessionIds.map((sessionId) =>
    getSession({ sessionId }).catch((error) => ({
      id: sessionId,
      error: error instanceof Error ? error.message : String(error),
    }))
  );

  const sessions = await Promise.all(sessionPromises);
  const results = [];

  for (const session of sessions) {
    // エラーの場合はそのまま追加
    if (session.error) {
      results.push({ id: session.id, error: session.error });
      continue;
    }

    switch (format) {
      case "summary":
        results.push({
          id: session.id,
          name: session.name,
          summary: session.summary?.shortSummary || "No summary available",
        });
        break;

      case "changes":
        results.push({
          id: session.id,
          name: session.name,
          changes: session.summary?.changes || [],
          decisions: session.summary?.decisions || [],
        });
        break;

      case "full":
      default:
        results.push(session);
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
