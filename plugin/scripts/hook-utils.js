/**
 * Hook Utilities
 *
 * 共通ユーティリティ関数（全 Hook スクリプトで使用）
 */

const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// 設定ディレクトリとファイルパス
const HOME_DIR = process.env.HOME || process.env.USERPROFILE || "";
const CONFIG_DIR = path.join(HOME_DIR, ".claude-cnthub");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");
const PID_FILE = path.join(CONFIG_DIR, "server.pid");

// デフォルト設定
const DEFAULT_CONFIG = {
  api: {
    port: 3048,
    host: "localhost",
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
    } catch {
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
  // プラグインルートからプロジェクトルートを計算
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || path.dirname(__dirname);
  const projectRoot = path.resolve(pluginRoot, "..");
  const apiDir = path.join(projectRoot, "packages", "api");

  console.error(`[cnthub] Starting API server from: ${apiDir}`);

  try {
    // bun run dev:api をバックグラウンドで起動
    const child = spawn("bun", ["run", "src/index.ts"], {
      cwd: apiDir,
      detached: true,
      stdio: "ignore",
      env: {
        ...process.env,
        NODE_ENV: "production",
      },
    });

    // 親プロセスから切り離し
    child.unref();

    // PID を保存
    if (child.pid) {
      savePid(child.pid);
    }

    console.error(`[cnthub] API server process spawned (PID: ${child.pid})`);
    return true;
  } catch (error) {
    console.error(`[cnthub] Failed to start server: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * ポートを使用しているプロセスの PID を取得
 * @param {number} port - ポート番号
 * @returns {number|null} PID またはnull
 */
function findProcessByPort(port) {
  try {
    const { execSync } = require("child_process");
    // macOS/Linux: lsof でポートを使用しているプロセスを検索
    const output = execSync(`lsof -ti:${port} 2>/dev/null`, {
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
        console.error(
          `[cnthub] Found server on port ${config.api.port} (PID: ${pid})`
        );
      } else {
        console.error("[cnthub] Server is running but could not find PID");
        return false;
      }
    } else {
      console.error("[cnthub] Server is not running");
      return true;
    }
  }

  if (!isProcessRunning(pid)) {
    console.error("[cnthub] Server process not found, cleaning up PID file");
    removePid();
    return true;
  }

  try {
    process.kill(pid, "SIGTERM");
    console.error(`[cnthub] Sent SIGTERM to process ${pid}`);

    // 停止を待機（最大5秒）
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isProcessRunning(pid)) {
        removePid();
        console.error("[cnthub] Server stopped successfully");
        return true;
      }
    }

    // 強制終了
    process.kill(pid, "SIGKILL");
    removePid();
    console.error("[cnthub] Server force killed");
    return true;
  } catch (error) {
    console.error(`[cnthub] Failed to stop server: ${getErrorMessage(error)}`);
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
    console.error("[cnthub] API server is already running");
    return true;
  }

  console.error("[cnthub] API server not running, starting...");

  // サーバーを起動
  const started = await startServer();
  if (!started) {
    return false;
  }

  // 起動完了を待機
  const ready = await waitForServer();
  if (ready) {
    console.error("[cnthub] API server is now ready");
    return true;
  }

  console.error("[cnthub] API server failed to start within timeout");
  return false;
}

module.exports = {
  API_URL,
  FETCH_TIMEOUT,
  CONFIG_DIR,
  CONFIG_FILE,
  PID_FILE,
  readHookContext,
  validateHookContext,
  fetchWithTimeout,
  sendToAPI,
  isValidTranscriptPath,
  getErrorMessage,
  loadConfig,
  saveConfig,
  checkServerHealth,
  ensureServerRunning,
  stopServer,
  getServerStatus,
};
