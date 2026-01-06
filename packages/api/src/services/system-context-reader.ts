/**
 * System Context Reader
 *
 * Claude Code の設定ファイル（Skills, Hooks, MCP Servers, Rules）を読み取るサービス
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import type {
  SystemSkill,
  SystemHook,
  SystemMcpServer,
  SystemRule,
  SystemContextSource,
  HookEventType,
} from "@claude-cnthub/shared";

/**
 * SKILL.md の front-matter をパースした結果
 */
export interface SkillMetadata {
  name: string;
  description: string;
  allowedTools: string[];
}

/**
 * SKILL.md の front-matter をパースする
 */
export function parseSkillFrontMatter(content: string): SkillMetadata {
  const result: SkillMetadata = {
    name: "",
    description: "",
    allowedTools: [],
  };

  // front-matter を抽出 (---で囲まれた部分)
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return result;
  }

  const frontMatter = frontMatterMatch[1];

  // name を抽出
  const nameMatch = frontMatter.match(/^name:\s*(.+)$/m);
  if (nameMatch) {
    result.name = nameMatch[1].trim();
  }

  // description を抽出
  const descMatch = frontMatter.match(/^description:\s*(.+)$/m);
  if (descMatch) {
    result.description = descMatch[1].trim();
  }

  // allowed-tools を抽出
  const toolsMatch = frontMatter.match(/^allowed-tools:\s*(.+)$/m);
  if (toolsMatch) {
    result.allowedTools = toolsMatch[1]
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }

  return result;
}

/**
 * ディレクトリから Skills を読み取る
 *
 * ディレクトリ構造: skills/{skill-name}/SKILL.md
 */
export async function readSkillsFromDir(
  dir: string,
  source: SystemContextSource
): Promise<SystemSkill[]> {
  const skills: SystemSkill[] = [];

  try {
    if (!existsSync(dir)) {
      return skills;
    }

    const entries = readdirSync(dir);

    for (const entry of entries) {
      const entryPath = join(dir, entry);

      // ディレクトリのみ処理
      if (!statSync(entryPath).isDirectory()) {
        continue;
      }

      const skillMdPath = join(entryPath, "SKILL.md");
      if (!existsSync(skillMdPath)) {
        continue;
      }

      try {
        const content = readFileSync(skillMdPath, "utf-8");
        const metadata = parseSkillFrontMatter(content);

        skills.push({
          name: metadata.name || entry,
          description: metadata.description,
          source,
          path: skillMdPath,
          allowedTools:
            metadata.allowedTools.length > 0
              ? metadata.allowedTools
              : undefined,
        });
      } catch (error) {
        console.warn(`Failed to read skill at ${skillMdPath}:`, error);
      }
    }
  } catch (error) {
    console.warn(`Failed to read skills from ${dir}:`, error);
  }

  return skills;
}

/**
 * settings.json から Hooks を読み取る
 *
 * Claude Code の settings.json フォーマット:
 * {
 *   "hooks": {
 *     "EventName": [
 *       {
 *         "matcher": "...",  // optional
 *         "hooks": [
 *           { "type": "command", "command": "...", "timeout": 5000 }
 *         ]
 *       }
 *     ]
 *   }
 * }
 */
export async function readHooksFromSettings(
  settingsPath: string,
  source: SystemContextSource
): Promise<SystemHook[]> {
  const hooks: SystemHook[] = [];

  try {
    if (!existsSync(settingsPath)) {
      return hooks;
    }

    const content = readFileSync(settingsPath, "utf-8");
    const settings = JSON.parse(content);

    if (!settings.hooks) {
      return hooks;
    }

    for (const [eventName, eventHooks] of Object.entries(settings.hooks)) {
      if (!Array.isArray(eventHooks)) {
        continue;
      }

      for (const hookGroup of eventHooks) {
        const group = hookGroup as {
          matcher?: string;
          hooks?: Array<{ type: string; command: string; timeout?: number }>;
        };

        if (!group.hooks || !Array.isArray(group.hooks)) {
          continue;
        }

        for (const hook of group.hooks) {
          if (hook.type === "command" && hook.command) {
            hooks.push({
              event: eventName as HookEventType,
              source,
              matcher: group.matcher,
              command: hook.command,
              timeout: hook.timeout,
            });
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to read hooks from ${settingsPath}:`, error);
  }

  return hooks;
}

/**
 * hooks.json (プラグイン形式) から Hooks を読み取る
 *
 * プラグインの hooks.json フォーマット:
 * {
 *   "hooks": {
 *     "EventName": [
 *       {
 *         "hooks": [
 *           { "type": "command", "command": "...", "timeout": 5000 }
 *         ]
 *       }
 *     ]
 *   }
 * }
 */
export async function readHooksFromHooksJson(
  hooksJsonPath: string,
  source: SystemContextSource
): Promise<SystemHook[]> {
  const hooks: SystemHook[] = [];

  try {
    if (!existsSync(hooksJsonPath)) {
      return hooks;
    }

    const content = readFileSync(hooksJsonPath, "utf-8");
    const hooksConfig = JSON.parse(content);

    if (!hooksConfig.hooks) {
      return hooks;
    }

    for (const [eventName, eventHooks] of Object.entries(hooksConfig.hooks)) {
      if (!Array.isArray(eventHooks)) {
        continue;
      }

      for (const hookGroup of eventHooks) {
        const group = hookGroup as {
          matcher?: string;
          hooks?: Array<{ type: string; command: string; timeout?: number }>;
        };

        if (!group.hooks || !Array.isArray(group.hooks)) {
          continue;
        }

        for (const hook of group.hooks) {
          if (hook.type === "command" && hook.command) {
            hooks.push({
              event: eventName as HookEventType,
              source,
              matcher: group.matcher,
              command: hook.command,
              timeout: hook.timeout,
            });
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to read hooks from ${hooksJsonPath}:`, error);
  }

  return hooks;
}

/**
 * JSON ファイルから MCP Servers を読み取る
 *
 * plugin.json / mcp.json フォーマット:
 * {
 *   "mcpServers": {
 *     "server-name": {
 *       "command": "node",
 *       "args": ["server.js"],
 *       "env": { "KEY": "value" }
 *     }
 *   }
 * }
 */
export async function readMcpServersFromJson(
  jsonPath: string,
  source: Exclude<SystemContextSource, "project">
): Promise<SystemMcpServer[]> {
  const servers: SystemMcpServer[] = [];

  try {
    if (!existsSync(jsonPath)) {
      return servers;
    }

    const content = readFileSync(jsonPath, "utf-8");
    const config = JSON.parse(content);

    if (!config.mcpServers || typeof config.mcpServers !== "object") {
      return servers;
    }

    for (const [name, serverConfig] of Object.entries(config.mcpServers)) {
      const server = serverConfig as {
        command: string;
        args?: string[];
        env?: Record<string, string>;
      };

      if (server.command) {
        servers.push({
          name,
          source,
          command: server.command,
          args: server.args,
          env: server.env,
        });
      }
    }
  } catch (error) {
    console.warn(`Failed to read MCP servers from ${jsonPath}:`, error);
  }

  return servers;
}

/**
 * ディレクトリから Rules を読み取る
 *
 * ディレクトリ構造: rules/*.md
 */
export async function readRulesFromDir(
  dir: string,
  source: Exclude<SystemContextSource, "plugin">
): Promise<SystemRule[]> {
  const rules: SystemRule[] = [];

  // コンテンツの最大長（プレビュー用）
  const MAX_CONTENT_LENGTH = 1000;

  try {
    if (!existsSync(dir)) {
      return rules;
    }

    const entries = readdirSync(dir);

    for (const entry of entries) {
      // .md ファイルのみ処理
      if (!entry.endsWith(".md")) {
        continue;
      }

      const rulePath = join(dir, entry);

      // ファイルのみ処理
      if (!statSync(rulePath).isFile()) {
        continue;
      }

      try {
        let content = readFileSync(rulePath, "utf-8");

        // コンテンツを制限
        if (content.length > MAX_CONTENT_LENGTH) {
          content = content.substring(0, MAX_CONTENT_LENGTH) + "...";
        }

        rules.push({
          name: basename(rulePath),
          source,
          path: rulePath,
          content,
        });
      } catch (error) {
        console.warn(`Failed to read rule at ${rulePath}:`, error);
      }
    }
  } catch (error) {
    console.warn(`Failed to read rules from ${dir}:`, error);
  }

  return rules;
}
