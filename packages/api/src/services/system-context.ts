/**
 * System Context Service
 *
 * Claude Code の System Context（Skills, Hooks, MCP Servers, Rules）を
 * 統合的に取得するサービス
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import type {
  SystemContextResponse,
  SystemSkill,
  SystemHook,
  SystemMcpServer,
  SystemRule,
  SystemContextSource,
  SystemContextMetadata,
} from "@claude-cnthub/shared";
import {
  readSkillsFromDir,
  readHooksFromSettings,
  readHooksFromHooksJson,
  readMcpServersFromJson,
  readRulesFromDir,
} from "./system-context-reader";

/**
 * System Context 取得オプション
 */
export interface SystemContextOptions {
  /** プロジェクトパス（指定しない場合は cwd） */
  projectPath?: string;
  /** ソースフィルタ（デフォルト: all） */
  source?: SystemContextSource | "all";
}

/**
 * グローバル設定パス (~/.claude)
 */
function getGlobalPath(): string {
  return join(homedir(), ".claude");
}

/**
 * プロジェクト設定パス (.claude)
 */
function getProjectClaudePath(projectPath: string): string | null {
  const claudePath = join(projectPath, ".claude");
  if (existsSync(claudePath)) {
    return claudePath;
  }
  return null;
}

/**
 * プラグイン設定パス (plugin/.claude-plugin)
 */
function getPluginPath(projectPath: string): string | null {
  const pluginPath = join(projectPath, "plugin", ".claude-plugin");
  if (existsSync(pluginPath)) {
    return pluginPath;
  }
  return null;
}

/**
 * ソースフィルタが一致するかチェック
 */
function matchesSource(
  itemSource: SystemContextSource,
  filterSource?: SystemContextSource | "all"
): boolean {
  if (!filterSource || filterSource === "all") {
    return true;
  }
  return itemSource === filterSource;
}

/**
 * System Context 全体を取得
 */
export async function getSystemContext(
  options: SystemContextOptions = {}
): Promise<SystemContextResponse> {
  const projectPath = options.projectPath || process.cwd();
  const source = options.source || "all";

  const globalPath = getGlobalPath();
  const projectClaudePath = getProjectClaudePath(projectPath);
  const pluginPath = getPluginPath(projectPath);

  // 並列で取得
  const [skills, hooks, mcpServers, rules] = await Promise.all([
    getSkills({ projectPath, source }),
    getHooks({ projectPath, source }),
    getMcpServers({ projectPath, source }),
    getRules({ projectPath, source }),
  ]);

  const metadata: SystemContextMetadata = {
    globalPath,
    projectPath: projectClaudePath,
    pluginPath,
    scannedAt: new Date().toISOString(),
  };

  return {
    skills,
    hooks,
    mcpServers,
    rules,
    metadata,
  };
}

/**
 * Skills を取得
 */
export async function getSkills(
  options: SystemContextOptions = {}
): Promise<SystemSkill[]> {
  const projectPath = options.projectPath || process.cwd();
  const source = options.source || "all";

  const skills: SystemSkill[] = [];

  // グローバル Skills
  if (matchesSource("global", source)) {
    const globalPath = getGlobalPath();
    const globalSkillsPath = join(globalPath, "skills");
    const globalSkills = await readSkillsFromDir(globalSkillsPath, "global");
    skills.push(...globalSkills);
  }

  // プロジェクト Skills
  if (matchesSource("project", source)) {
    const projectClaudePath = getProjectClaudePath(projectPath);
    if (projectClaudePath) {
      const projectSkillsPath = join(projectClaudePath, "skills");
      const projectSkills = await readSkillsFromDir(
        projectSkillsPath,
        "project"
      );
      skills.push(...projectSkills);
    }
  }

  // プラグイン Skills (commands ディレクトリ)
  if (matchesSource("plugin", source)) {
    const pluginPath = getPluginPath(projectPath);
    if (pluginPath) {
      // プラグインの commands ディレクトリを skills として扱う場合
      // 今回は SKILL.md 形式のスキルのみ対象
      const pluginSkillsPath = join(pluginPath, "..", "skills");
      if (existsSync(pluginSkillsPath)) {
        const pluginSkills = await readSkillsFromDir(
          pluginSkillsPath,
          "plugin"
        );
        skills.push(...pluginSkills);
      }
    }
  }

  return skills;
}

/**
 * Hooks を取得
 */
export async function getHooks(
  options: SystemContextOptions = {}
): Promise<SystemHook[]> {
  const projectPath = options.projectPath || process.cwd();
  const source = options.source || "all";

  const hooks: SystemHook[] = [];

  // グローバル Hooks
  if (matchesSource("global", source)) {
    const globalPath = getGlobalPath();
    const globalSettingsPath = join(globalPath, "settings.json");
    const globalHooks = await readHooksFromSettings(
      globalSettingsPath,
      "global"
    );
    hooks.push(...globalHooks);
  }

  // プロジェクト Hooks
  if (matchesSource("project", source)) {
    const projectClaudePath = getProjectClaudePath(projectPath);
    if (projectClaudePath) {
      const projectSettingsPath = join(projectClaudePath, "settings.json");
      const projectHooks = await readHooksFromSettings(
        projectSettingsPath,
        "project"
      );
      hooks.push(...projectHooks);
    }
  }

  // プラグイン Hooks
  if (matchesSource("plugin", source)) {
    const pluginPath = getPluginPath(projectPath);
    if (pluginPath) {
      const pluginHooksPath = join(pluginPath, "hooks", "hooks.json");
      const pluginHooks = await readHooksFromHooksJson(
        pluginHooksPath,
        "plugin"
      );
      hooks.push(...pluginHooks);
    }
  }

  return hooks;
}

/**
 * MCP Servers を取得
 *
 * MCP Servers は global と plugin のみ（project には存在しない）
 */
export async function getMcpServers(
  options: SystemContextOptions = {}
): Promise<SystemMcpServer[]> {
  const projectPath = options.projectPath || process.cwd();
  const source = options.source || "all";

  const servers: SystemMcpServer[] = [];

  // project source の場合は空を返す（MCP は project にない）
  if (source === "project") {
    return servers;
  }

  // グローバル MCP Servers
  if (matchesSource("global", source)) {
    const globalPath = getGlobalPath();
    const globalMcpPath = join(globalPath, "mcp.json");
    const globalServers = await readMcpServersFromJson(globalMcpPath, "global");
    servers.push(...globalServers);
  }

  // プラグイン MCP Servers
  if (matchesSource("plugin", source)) {
    const pluginPath = getPluginPath(projectPath);
    if (pluginPath) {
      const pluginJsonPath = join(pluginPath, "plugin.json");
      const pluginServers = await readMcpServersFromJson(
        pluginJsonPath,
        "plugin"
      );
      servers.push(...pluginServers);
    }
  }

  return servers;
}

/**
 * Rules を取得
 *
 * Rules は global と project のみ（plugin には存在しない）
 */
export async function getRules(
  options: SystemContextOptions = {}
): Promise<SystemRule[]> {
  const projectPath = options.projectPath || process.cwd();
  const source = options.source || "all";

  const rules: SystemRule[] = [];

  // plugin source の場合は空を返す（Rules は plugin にない）
  if (source === "plugin") {
    return rules;
  }

  // グローバル Rules (CLAUDE.md)
  if (matchesSource("global", source)) {
    const globalPath = getGlobalPath();
    const globalRulesPath = join(globalPath, "rules");
    const globalRules = await readRulesFromDir(globalRulesPath, "global");
    rules.push(...globalRules);

    // ~/.claude/CLAUDE.md も読み取る
    const globalClaudeMdPath = join(globalPath, "CLAUDE.md");
    if (existsSync(globalClaudeMdPath)) {
      try {
        const { readFileSync } = await import("node:fs");
        let content = readFileSync(globalClaudeMdPath, "utf-8");
        if (content.length > 1000) {
          content = content.substring(0, 1000) + "...";
        }
        rules.push({
          name: "CLAUDE.md",
          source: "global",
          path: globalClaudeMdPath,
          content,
        });
      } catch {
        // 読み取り失敗は無視
      }
    }
  }

  // プロジェクト Rules
  if (matchesSource("project", source)) {
    const projectClaudePath = getProjectClaudePath(projectPath);
    if (projectClaudePath) {
      const projectRulesPath = join(projectClaudePath, "rules");
      const projectRules = await readRulesFromDir(projectRulesPath, "project");
      rules.push(...projectRules);
    }
  }

  return rules;
}
