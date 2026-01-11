/**
 * Hook Utilities
 *
 * 共通ユーティリティ関数（全 Hook スクリプトで使用）
 */

const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// サイレントモード（デフォルト: 非表示、CNTHUB_SILENT=false で表示）
const SILENT_MODE = process.env.CNTHUB_SILENT !== "false";

/**
 * ログ出力（サイレントモード対応）
 * @param {...any} args - ログ引数
 */
function log(...args) {
  if (!SILENT_MODE) {
    console.error(...args);
  }
}

/**
 * エラーログ出力（サイレントモードでも重大なエラーは出力）
 * @param {...any} args - ログ引数
 */
function logError(...args) {
  // 重大なエラーはサイレントモードでも出力
  console.error(...args);
}

// 設定ディレクトリとファイルパス
const HOME_DIR = process.env.HOME || process.env.USERPROFILE || "";
const CONFIG_DIR = path.join(HOME_DIR, ".claude-cnthub");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");
const PID_FILE = path.join(CONFIG_DIR, "server.pid");
const WEB_PID_FILE = path.join(CONFIG_DIR, "web.pid");
const TRANSCRIPT_CACHE_FILE = path.join(CONFIG_DIR, "transcript-cache.json");
const DATABASE_PATH = path.join(CONFIG_DIR, "data.db");

// デフォルト設定
const DEFAULT_CONFIG = {
  api: {
    port: 3048,
    host: "localhost",
  },
  web: {
    port: 5173,
    host: "localhost",
    autoStart: true,
  },
  worker: {
    autoStart: true,
    startupTimeout: 15000,
  },
};

// 設定を読み込み（キャッシュ）
let cachedConfig = null;

/**
 * 設定ディレクトリを確保
 */
function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

/**
 * 設定ファイルを読み込む
 * @returns {Object} 設定オブジェクト
 */
function loadConfig() {
  if (cachedConfig) return cachedConfig;

  ensureConfigDir();

  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const content = fs.readFileSync(CONFIG_FILE, "utf-8");
      cachedConfig = { ...DEFAULT_CONFIG, ...JSON.parse(content) };
    } catch (error) {
      logError(`[cnthub] Failed to parse config: ${getErrorMessage(error)}`);
      cachedConfig = { ...DEFAULT_CONFIG };
    }
  } else {
    cachedConfig = { ...DEFAULT_CONFIG };
    saveConfig(cachedConfig);
  }

  return cachedConfig;
}

/**
 * 設定ファイルを保存
 * @param {Object} config - 設定オブジェクト
 */
function saveConfig(config) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  cachedConfig = config;
}

// 設定から値を取得
const config = loadConfig();
const API_URL =
  process.env.CNTHUB_API_URL || `http://${config.api.host}:${config.api.port}`;
const FETCH_TIMEOUT = 10000; // 10秒
const HEALTH_CHECK_TIMEOUT = 2000; // ヘルスチェック用（短め）
const SERVER_STARTUP_TIMEOUT = config.worker.startupTimeout || 15000;
const SERVER_STARTUP_INTERVAL = 500; // ポーリング間隔

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
    log(`[cnthub] Failed to parse hook context: ${message}`);
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
    log("[cnthub] Invalid or missing session_id");
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

  // 基本的なパス正規化
  const normalized = path.resolve(filePath);
  const homeDir = process.env.HOME || process.env.USERPROFILE || "";

  // セキュリティ: HOME未定義時は全パスが許可されるのを防止
  if (!homeDir) {
    log("[cnthub] HOME directory not defined");
    return false;
  }

  const allowedBase = path.join(homeDir, ".claude");

  // 論理パスでの初期チェック
  if (
    !normalized.startsWith(allowedBase + path.sep) &&
    normalized !== allowedBase
  ) {
    log("[cnthub] Transcript path outside allowed directory");
    return false;
  }

  if (!normalized.endsWith(".jsonl")) {
    log("[cnthub] Invalid transcript file extension");
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
        log("[cnthub] Transcript symlink points outside allowed directory");
        return false;
      }
    }
  } catch (error) {
    // realpathSync が失敗した場合（アクセス権限など）は拒否
    log("[cnthub] Failed to resolve transcript path");
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

/**
 * トランスクリプトファイルから最新のusage情報を取得
 * @param {string} transcriptPath - トランスクリプトファイルのパス
 * @returns {{inputTokens: number, outputTokens: number} | null} usage情報またはnull
 */
function getLatestUsageFromTranscript(transcriptPath) {
  if (!transcriptPath || !isValidTranscriptPath(transcriptPath)) {
    return null;
  }

  try {
    if (!fs.existsSync(transcriptPath)) {
      return null;
    }

    const content = fs.readFileSync(transcriptPath, "utf-8");
    const lines = content.trim().split("\n");

    // 末尾から探索して最新のusage情報を取得
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const entry = JSON.parse(line);
        if (entry.message && entry.message.usage) {
          const usage = entry.message.usage;
          // cache_read_input_tokens は課金されないので除外
          return {
            inputTokens:
              (usage.input_tokens || 0) +
              (usage.cache_creation_input_tokens || 0),
            outputTokens: usage.output_tokens || 0,
          };
        }
      } catch {
        // JSON解析エラーは無視して次の行を試す
        continue;
      }
    }

    return null;
  } catch (error) {
    log(`[cnthub] Failed to read transcript: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * トランスクリプトファイルから全エントリのトークン合計を計算
 * @param {string} transcriptPath - トランスクリプトファイルのパス
 * @returns {{inputTokens: number, outputTokens: number} | null} トークン合計またはnull
 */
function getTotalUsageFromTranscript(transcriptPath) {
  if (!transcriptPath || !isValidTranscriptPath(transcriptPath)) {
    return null;
  }

  try {
    if (!fs.existsSync(transcriptPath)) {
      return null;
    }

    const content = fs.readFileSync(transcriptPath, "utf-8");
    const lines = content.trim().split("\n");

    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      try {
        const entry = JSON.parse(trimmed);
        if (entry.message && entry.message.usage) {
          const usage = entry.message.usage;
          // cache_read_input_tokens は課金されないので除外
          totalInputTokens +=
            (usage.input_tokens || 0) +
            (usage.cache_creation_input_tokens || 0);
          totalOutputTokens += usage.output_tokens || 0;
        }
      } catch {
        // JSON解析エラーは無視して次の行を試す
        continue;
      }
    }

    if (totalInputTokens === 0 && totalOutputTokens === 0) {
      return null;
    }

    return {
      inputTokens: totalInputTokens,
      outputTokens: totalOutputTokens,
    };
  } catch (error) {
    log(`[cnthub] Failed to read transcript: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * セッションごとのトランスクリプトパスをキャッシュに保存
 * @param {string} sessionId - セッションID
 * @param {string} transcriptPath - トランスクリプトパス
 */
function saveTranscriptPath(sessionId, transcriptPath) {
  ensureConfigDir();
  try {
    let cache = {};
    if (fs.existsSync(TRANSCRIPT_CACHE_FILE)) {
      cache = JSON.parse(fs.readFileSync(TRANSCRIPT_CACHE_FILE, "utf-8"));
    }
    cache[sessionId] = transcriptPath;
    fs.writeFileSync(TRANSCRIPT_CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    log(`[cnthub] Failed to save transcript path: ${getErrorMessage(error)}`);
  }
}

/**
 * セッションのトランスクリプトパスをキャッシュから取得
 * @param {string} sessionId - セッションID
 * @returns {string|null} トランスクリプトパスまたはnull
 */
function getTranscriptPath(sessionId) {
  try {
    if (!fs.existsSync(TRANSCRIPT_CACHE_FILE)) {
      return null;
    }
    const cache = JSON.parse(fs.readFileSync(TRANSCRIPT_CACHE_FILE, "utf-8"));
    return cache[sessionId] || null;
  } catch {
    return null;
  }
}

/**
 * サーバーのヘルスチェック
 * @returns {Promise<boolean>} サーバーが起動している場合 true
 */
async function checkServerHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      HEALTH_CHECK_TIMEOUT
    );

    const response = await fetch(`${API_URL}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * PID ファイルを保存
 * @param {number} pid - プロセスID
 */
function savePid(pid) {
  ensureConfigDir();
  fs.writeFileSync(PID_FILE, String(pid));
}

/**
 * PID ファイルを読み込む
 * @returns {number|null} PID またはnull
 */
function loadPid() {
  if (!fs.existsSync(PID_FILE)) return null;
  try {
    const pid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
    return isNaN(pid) ? null : pid;
  } catch {
    return null;
  }
}

/**
 * PID ファイルを削除
 */
function removePid() {
  if (fs.existsSync(PID_FILE)) {
    fs.unlinkSync(PID_FILE);
  }
}

/**
 * プロセスが存在するか確認
 * @param {number} pid - プロセスID
 * @returns {boolean} プロセスが存在する場合 true
 */
function isProcessRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * API サーバーをバックグラウンドで起動
 * @returns {Promise<boolean>} 起動成功の場合 true
 */
async function startServer() {
  // プラグインルートからバンドル済みAPIを起動
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.dirname(__dirname);
  const workerApiPath = path.join(pluginRoot, "scripts", "worker-api.js");

  // バンドル版が存在するか確認
  if (!fs.existsSync(workerApiPath)) {
    // フォールバック: 開発時は packages/api から起動
    const projectRoot = path.resolve(pluginRoot, "..");
    const apiDir = path.join(projectRoot, "packages", "api");

    if (fs.existsSync(path.join(apiDir, "src", "index.ts"))) {
      log(`[cnthub] Starting API server from source: ${apiDir}`);
      try {
        const child = spawn("bun", ["run", "src/index.ts"], {
          cwd: apiDir,
          detached: true,
          stdio: "ignore",
          env: { ...process.env, NODE_ENV: "production", DATABASE_PATH },
        });
        child.unref();
        if (child.pid) savePid(child.pid);
        log(`[cnthub] API server process spawned (PID: ${child.pid})`);
        return true;
      } catch (error) {
        logError(`[cnthub] Failed to start server: ${getErrorMessage(error)}`);
        return false;
      }
    }

    logError(`[cnthub] worker-api.js not found: ${workerApiPath}`);
    return false;
  }

  log(`[cnthub] Starting API server from bundle: ${workerApiPath}`);

  try {
    // バンドル済みAPIをbunで起動
    const child = spawn("bun", [workerApiPath], {
      detached: true,
      stdio: "ignore",
      env: {
        ...process.env,
        NODE_ENV: "production",
        DATABASE_PATH,
      },
    });

    // 親プロセスから切り離し
    child.unref();

    // PID を保存
    if (child.pid) {
      savePid(child.pid);
    }

    log(`[cnthub] API server process spawned (PID: ${child.pid})`);
    return true;
  } catch (error) {
    logError(`[cnthub] Failed to start server: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * ポートを使用しているプロセスの PID を取得
 * @param {number} port - ポート番号
 * @returns {number|null} PID またはnull
 */
function findProcessByPort(port) {
  // ポート番号のバリデーション（コマンドインジェクション対策）
  const portNum = parseInt(port, 10);
  if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
    log(`[cnthub] Invalid port number: ${port}`);
    return null;
  }

  try {
    const { execSync } = require("child_process");
    // macOS/Linux: lsof でポートを使用しているプロセスを検索
    const output = execSync(`lsof -ti:${portNum} 2>/dev/null`, {
      encoding: "utf-8",
    });
    const pid = parseInt(output.trim().split("\n")[0], 10);
    return isNaN(pid) ? null : pid;
  } catch {
    return null;
  }
}

/**
 * API サーバーを停止
 * @returns {Promise<boolean>} 停止成功の場合 true
 */
async function stopServer() {
  let pid = loadPid();

  if (!pid) {
    // PID ファイルがない場合、ポートから PID を検索
    if (await checkServerHealth()) {
      pid = findProcessByPort(config.api.port);
      if (pid) {
        log(`[cnthub] Found server on port ${config.api.port} (PID: ${pid})`);
      } else {
        log("[cnthub] Server is running but could not find PID");
        return false;
      }
    } else {
      log("[cnthub] Server is not running");
      return true;
    }
  }

  if (!isProcessRunning(pid)) {
    log("[cnthub] Server process not found, cleaning up PID file");
    removePid();
    return true;
  }

  try {
    process.kill(pid, "SIGTERM");
    log(`[cnthub] Sent SIGTERM to process ${pid}`);

    // 停止を待機（最大5秒）
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isProcessRunning(pid)) {
        removePid();
        log("[cnthub] Server stopped successfully");
        return true;
      }
    }

    // 強制終了
    process.kill(pid, "SIGKILL");
    removePid();
    log("[cnthub] Server force killed");
    return true;
  } catch (error) {
    logError(`[cnthub] Failed to stop server: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * サーバーの状態を取得
 * @returns {Promise<Object>} { isRunning, pid, port, health }
 */
async function getServerStatus() {
  let pid = loadPid();
  const isHealthy = await checkServerHealth();

  // PID ファイルがない場合、ポートから PID を検索
  if (!pid && isHealthy) {
    pid = findProcessByPort(config.api.port);
  }

  const processRunning = pid ? isProcessRunning(pid) : false;

  return {
    isRunning: isHealthy || processRunning,
    pid: processRunning ? pid : null,
    port: config.api.port,
    health: isHealthy ? "ok" : "unreachable",
    configPath: CONFIG_FILE,
    pidPath: PID_FILE,
  };
}

/**
 * サーバーが起動するまで待機
 * @param {number} [timeout=SERVER_STARTUP_TIMEOUT] - 最大待機時間（ミリ秒）
 * @returns {Promise<boolean>} 起動成功の場合 true
 */
async function waitForServer(timeout = SERVER_STARTUP_TIMEOUT) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await checkServerHealth()) {
      return true;
    }
    await new Promise((resolve) =>
      setTimeout(resolve, SERVER_STARTUP_INTERVAL)
    );
  }

  return false;
}

/**
 * サーバーが起動していることを保証
 * 起動していなければ起動し、起動完了まで待機
 * @returns {Promise<boolean>} サーバーが利用可能な場合 true
 */
async function ensureServerRunning() {
  // 既に起動しているか確認
  if (await checkServerHealth()) {
    log("[cnthub] API server is already running");
    return true;
  }

  log("[cnthub] API server not running, starting...");

  // サーバーを起動
  const started = await startServer();
  if (!started) {
    return false;
  }

  // 起動完了を待機
  const ready = await waitForServer();
  if (ready) {
    log("[cnthub] API server is now ready");
    return true;
  }

  logError("[cnthub] API server failed to start within timeout");
  return false;
}

// ============================================
// Web Frontend Functions
// ============================================

/**
 * Web PID ファイルを保存
 * @param {number} pid - プロセスID
 */
function saveWebPid(pid) {
  ensureConfigDir();
  fs.writeFileSync(WEB_PID_FILE, String(pid));
}

/**
 * Web PID ファイルを読み込む
 * @returns {number|null} PID またはnull
 */
function loadWebPid() {
  if (!fs.existsSync(WEB_PID_FILE)) return null;
  try {
    const pid = parseInt(fs.readFileSync(WEB_PID_FILE, "utf-8").trim(), 10);
    return isNaN(pid) ? null : pid;
  } catch {
    return null;
  }
}

/**
 * Web PID ファイルを削除
 */
function removeWebPid() {
  if (fs.existsSync(WEB_PID_FILE)) {
    fs.unlinkSync(WEB_PID_FILE);
  }
}

/**
 * Web フロントエンドのヘルスチェック
 * @returns {Promise<boolean>} 起動している場合 true
 */
async function checkWebHealth() {
  const webConfig = config.web || DEFAULT_CONFIG.web;
  const webUrl = `http://${webConfig.host}:${webConfig.port}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      HEALTH_CHECK_TIMEOUT
    );

    const response = await fetch(webUrl, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response.ok || response.status === 304;
  } catch {
    return false;
  }
}

/**
 * Web フロントエンドをバックグラウンドで起動
 * @returns {Promise<boolean>} 起動成功の場合 true
 */
async function startWeb() {
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.dirname(__dirname);
  const projectRoot = path.resolve(pluginRoot, "..");
  const webDir = path.join(projectRoot, "packages", "web");

  log(`[cnthub] Starting Web frontend from: ${webDir}`);

  try {
    const child = spawn("bun", ["run", "dev"], {
      cwd: webDir,
      detached: true,
      stdio: "ignore",
      env: {
        ...process.env,
        NODE_ENV: "development",
      },
    });

    child.unref();

    if (child.pid) {
      saveWebPid(child.pid);
    }

    log(`[cnthub] Web frontend process spawned (PID: ${child.pid})`);
    return true;
  } catch (error) {
    logError(`[cnthub] Failed to start web: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * Web フロントエンドを停止
 * @returns {Promise<boolean>} 停止成功の場合 true
 */
async function stopWeb() {
  const webConfig = config.web || DEFAULT_CONFIG.web;
  let pid = loadWebPid();

  if (!pid) {
    if (await checkWebHealth()) {
      pid = findProcessByPort(webConfig.port);
      if (pid) {
        log(`[cnthub] Found web on port ${webConfig.port} (PID: ${pid})`);
      } else {
        log("[cnthub] Web is running but could not find PID");
        return false;
      }
    } else {
      log("[cnthub] Web is not running");
      return true;
    }
  }

  if (!isProcessRunning(pid)) {
    log("[cnthub] Web process not found, cleaning up PID file");
    removeWebPid();
    return true;
  }

  try {
    process.kill(pid, "SIGTERM");
    log(`[cnthub] Sent SIGTERM to web process ${pid}`);

    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isProcessRunning(pid)) {
        removeWebPid();
        log("[cnthub] Web stopped successfully");
        return true;
      }
    }

    process.kill(pid, "SIGKILL");
    removeWebPid();
    log("[cnthub] Web force killed");
    return true;
  } catch (error) {
    logError(`[cnthub] Failed to stop web: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * Web フロントエンドが起動するまで待機
 * @param {number} [timeout=SERVER_STARTUP_TIMEOUT] - 最大待機時間（ミリ秒）
 * @returns {Promise<boolean>} 起動成功の場合 true
 */
async function waitForWeb(timeout = SERVER_STARTUP_TIMEOUT) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await checkWebHealth()) {
      return true;
    }
    await new Promise((resolve) =>
      setTimeout(resolve, SERVER_STARTUP_INTERVAL)
    );
  }

  return false;
}

/**
 * Web フロントエンドが起動していることを保証
 * @returns {Promise<boolean>} 利用可能な場合 true
 */
async function ensureWebRunning() {
  const webConfig = config.web || DEFAULT_CONFIG.web;

  // 自動起動が無効の場合はスキップ
  if (!webConfig.autoStart) {
    log("[cnthub] Web auto-start is disabled");
    return false;
  }

  // 既に起動しているか確認
  if (await checkWebHealth()) {
    log("[cnthub] Web frontend is already running");
    return true;
  }

  log("[cnthub] Web frontend not running, starting...");

  const started = await startWeb();
  if (!started) {
    return false;
  }

  const ready = await waitForWeb();
  if (ready) {
    log("[cnthub] Web frontend is now ready");
    return true;
  }

  logError("[cnthub] Web frontend failed to start within timeout");
  return false;
}

module.exports = {
  API_URL,
  FETCH_TIMEOUT,
  CONFIG_DIR,
  CONFIG_FILE,
  PID_FILE,
  WEB_PID_FILE,
  // Silent mode logging
  log,
  logError,
  readHookContext,
  validateHookContext,
  fetchWithTimeout,
  sendToAPI,
  isValidTranscriptPath,
  getLatestUsageFromTranscript,
  getTotalUsageFromTranscript,
  saveTranscriptPath,
  getTranscriptPath,
  getErrorMessage,
  loadConfig,
  saveConfig,
  checkServerHealth,
  ensureServerRunning,
  stopServer,
  getServerStatus,
  // Web frontend functions
  checkWebHealth,
  ensureWebRunning,
  stopWeb,
};
