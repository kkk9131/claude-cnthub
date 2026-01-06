/**
 * System Context Types
 *
 * Claude Code の System Context（Skills, Hooks, MCP Servers, Rules）を表す型定義
 */

/**
 * コンテキストのソース種別
 */
export type SystemContextSource = "global" | "project" | "plugin";

/**
 * Hook イベント種別
 */
export type HookEventType =
  | "SessionStart"
  | "SessionEnd"
  | "PostToolUse"
  | "PreToolUse"
  | "UserPromptSubmit";

/**
 * Skill 定義
 */
export interface SystemSkill {
  /** スキル名 */
  name: string;
  /** 説明（SKILL.md の front-matter から取得） */
  description: string;
  /** ソース種別 */
  source: SystemContextSource;
  /** ファイルパス */
  path: string;
  /** 許可されたツール */
  allowedTools?: string[];
}

/**
 * Hook 定義
 */
export interface SystemHook {
  /** イベント種別 */
  event: HookEventType;
  /** ソース種別 */
  source: SystemContextSource;
  /** ツールマッチャー（PostToolUse, PreToolUse 用） */
  matcher?: string;
  /** 実行コマンド */
  command: string;
  /** タイムアウト（ミリ秒） */
  timeout?: number;
}

/**
 * MCP Server 定義
 */
export interface SystemMcpServer {
  /** サーバー名 */
  name: string;
  /** ソース種別 */
  source: Exclude<SystemContextSource, "project">;
  /** 実行コマンド */
  command: string;
  /** 引数 */
  args?: string[];
  /** 環境変数 */
  env?: Record<string, string>;
}

/**
 * Rule 定義
 */
export interface SystemRule {
  /** ルール名（ファイル名） */
  name: string;
  /** ソース種別 */
  source: Exclude<SystemContextSource, "plugin">;
  /** ファイルパス */
  path: string;
  /** 内容（プレビュー用に最初の一部のみ） */
  content: string;
}

/**
 * System Context メタデータ
 */
export interface SystemContextMetadata {
  /** グローバル設定パス (~/.claude) */
  globalPath: string;
  /** プロジェクト設定パス (.claude)、検出されない場合は null */
  projectPath: string | null;
  /** プラグイン設定パス、検出されない場合は null */
  pluginPath: string | null;
  /** スキャン日時（ISO8601） */
  scannedAt: string;
}

/**
 * System Context API レスポンス
 */
export interface SystemContextResponse {
  skills: SystemSkill[];
  hooks: SystemHook[];
  mcpServers: SystemMcpServer[];
  rules: SystemRule[];
  metadata: SystemContextMetadata;
}

/**
 * Skills 一覧レスポンス
 */
export interface SystemSkillsResponse {
  skills: SystemSkill[];
}

/**
 * Hooks 一覧レスポンス
 */
export interface SystemHooksResponse {
  hooks: SystemHook[];
}

/**
 * MCP Servers 一覧レスポンス
 */
export interface SystemMcpServersResponse {
  mcpServers: SystemMcpServer[];
}

/**
 * Rules 一覧レスポンス
 */
export interface SystemRulesResponse {
  rules: SystemRule[];
}
