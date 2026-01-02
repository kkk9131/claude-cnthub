/**
 * Hook Utilities
 *
 * 共通ユーティリティ関数（全 Hook スクリプトで使用）
 */

const path = require("path");

const API_URL = process.env.CNTHUB_API_URL || "http://localhost:3048";
const FETCH_TIMEOUT = 10000; // 10秒

/**
 * 標準入力から Hook コンテキストを読み取る
 * @returns {Promise<Object|null>} パースされたコンテキスト（空の場合はnull）
 */
async function readHookContext() {
  let input = "";
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  if (!input.trim()) {
    return null;
  }

  try {
    const context = JSON.parse(input);
    if (typeof context !== "object" || context === null) {
      throw new Error("Invalid JSON structure");
    }
    return context;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[cnthub] Failed to parse hook context: ${message}`);
    return null;
  }
}

/**
 * Hook コンテキストを検証
 * @param {Object} context - コンテキストオブジェクト
 * @returns {boolean} 有効な場合 true
 */
function validateHookContext(context) {
  if (!context) {
    return false;
  }

  const sessionId = context.session_id;
  if (!sessionId || typeof sessionId !== "string" || sessionId.length === 0) {
    console.error("[cnthub] Invalid or missing session_id");
    return false;
  }

  return true;
}

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

/**
 * cnthub API にリクエストを送信
 * @param {string} endpoint - API エンドポイント（例: "/hook/session-start"）
 * @param {Object} payload - リクエストボディ
 * @param {number} [timeout] - タイムアウト（ミリ秒）
 * @returns {Promise<Response>}
 */
async function sendToAPI(endpoint, payload, timeout = FETCH_TIMEOUT) {
  return fetchWithTimeout(
    `${API_URL}${endpoint}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    timeout
  );
}

/**
 * トランスクリプトファイルパスを検証
 * セキュリティ: シンボリックリンク攻撃とパストラバーサルを防止
 * @param {string} filePath - ファイルパス
 * @returns {boolean} 有効な場合 true
 */
function isValidTranscriptPath(filePath) {
  if (!filePath || typeof filePath !== "string") {
    return false;
  }

  const fs = require("fs");

  // 基本的なパス正規化
  const normalized = path.resolve(filePath);
  const homeDir = process.env.HOME || process.env.USERPROFILE || "";

  // セキュリティ: HOME未定義時は全パスが許可されるのを防止
  if (!homeDir) {
    console.error("[cnthub] HOME directory not defined");
    return false;
  }

  const allowedBase = path.join(homeDir, ".claude");

  // 論理パスでの初期チェック
  if (
    !normalized.startsWith(allowedBase + path.sep) &&
    normalized !== allowedBase
  ) {
    console.error("[cnthub] Transcript path outside allowed directory");
    return false;
  }

  if (!normalized.endsWith(".jsonl")) {
    console.error("[cnthub] Invalid transcript file extension");
    return false;
  }

  // ファイルが存在する場合、シンボリックリンクを解決して再検証
  try {
    if (fs.existsSync(normalized)) {
      const realPath = fs.realpathSync(normalized);
      const realAllowedBase = fs.existsSync(allowedBase)
        ? fs.realpathSync(allowedBase)
        : allowedBase;

      if (
        !realPath.startsWith(realAllowedBase + path.sep) &&
        realPath !== realAllowedBase
      ) {
        console.error(
          "[cnthub] Transcript symlink points outside allowed directory"
        );
        return false;
      }
    }
  } catch (error) {
    // realpathSync が失敗した場合（アクセス権限など）は拒否
    console.error("[cnthub] Failed to resolve transcript path");
    return false;
  }

  return true;
}

/**
 * エラーメッセージを安全に取得
 * @param {unknown} error - エラーオブジェクト
 * @returns {string} エラーメッセージ
 */
function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

module.exports = {
  API_URL,
  FETCH_TIMEOUT,
  readHookContext,
  validateHookContext,
  fetchWithTimeout,
  sendToAPI,
  isValidTranscriptPath,
  getErrorMessage,
};
