/**
 * タグ自動抽出サービス (L-05)
 *
 * AI を使用して要約からタグを自動抽出する。
 * グレースフルデグラデーション: API失敗時はフォールバック処理で対応。
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import type { ExtendedSessionSummary } from "@claude-cnthub/shared";

/**
 * タグ抽出オプション
 */
export interface TagExtractionOptions {
  /** 最大タグ数（デフォルト: 10） */
  maxTags?: number;
  /** AIを使用するか（デフォルト: true） */
  useAI?: boolean;
}

/**
 * 技術キーワードパターン
 */
const TECH_KEYWORDS = [
  // 言語・フレームワーク
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "react",
  "vue",
  "angular",
  "svelte",
  "next",
  "nuxt",
  "node",
  "deno",
  "bun",
  // API・通信
  "api",
  "rest",
  "graphql",
  "websocket",
  "grpc",
  "http",
  // 認証・セキュリティ
  "auth",
  "authentication",
  "authorization",
  "jwt",
  "oauth",
  "oauth2",
  "security",
  // データベース
  "database",
  "sql",
  "nosql",
  "mongodb",
  "postgres",
  "mysql",
  "sqlite",
  "redis",
  // インフラ・DevOps
  "docker",
  "kubernetes",
  "ci",
  "cd",
  "aws",
  "gcp",
  "azure",
  // テスト
  "test",
  "testing",
  "unit-test",
  "e2e",
  "integration",
  // UI/UX
  "ui",
  "ux",
  "css",
  "tailwind",
  "styled",
  "dark-mode",
  "responsive",
  // その他
  "performance",
  "optimization",
  "refactor",
  "bugfix",
  "feature",
  "migration",
];

/**
 * 要約テキストからタグを抽出
 */
export function extractTagsFromSummary(
  shortSummary: string,
  detailedSummary: string
): string[] {
  const text = `${shortSummary} ${detailedSummary}`.toLowerCase();
  const tags = new Set<string>();

  // 技術キーワードを検出
  for (const keyword of TECH_KEYWORDS) {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  }

  // 特殊パターンを検出
  const patterns = [
    { regex: /dark[\s-]?mode/i, tag: "dark-mode" },
    { regex: /light[\s-]?mode/i, tag: "light-mode" },
    { regex: /unit[\s-]?test/i, tag: "unit-test" },
    { regex: /end[\s-]?to[\s-]?end/i, tag: "e2e" },
    { regex: /real[\s-]?time/i, tag: "realtime" },
  ];

  for (const { regex, tag } of patterns) {
    if (regex.test(text)) {
      tags.add(tag);
    }
  }

  return Array.from(tags);
}

/**
 * ファイルパスからタグを抽出
 */
function extractTagsFromFiles(filesModified: string[]): string[] {
  const tags = new Set<string>();

  for (const filePath of filesModified) {
    const parts = filePath.toLowerCase().split("/");

    // パッケージ名やディレクトリ名をタグに
    for (const part of parts) {
      if (["api", "web", "shared", "plugin"].includes(part)) {
        tags.add(part);
      }
      if (
        [
          "routes",
          "services",
          "components",
          "hooks",
          "utils",
          "middleware",
        ].includes(part)
      ) {
        tags.add(part);
      }
    }

    // ファイル名（拡張子なし）
    const fileName = parts[parts.length - 1]?.replace(/\.[^.]+$/, "");
    if (fileName && fileName.length > 2 && fileName.length < 30) {
      tags.add(fileName);
    }
  }

  return Array.from(tags);
}

/**
 * 決定事項からタグを抽出
 */
function extractTagsFromDecisions(keyDecisions: string[]): string[] {
  const tags = new Set<string>();
  const text = keyDecisions.join(" ").toLowerCase();

  for (const keyword of TECH_KEYWORDS) {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  }

  return Array.from(tags);
}

/**
 * フォールバック: AIを使わずにタグを抽出
 */
export function extractTagsFallback(
  summary: ExtendedSessionSummary,
  options: TagExtractionOptions = {}
): string[] {
  const { maxTags = 10 } = options;
  const allTags = new Set<string>();

  // トピックから
  for (const topic of summary.topics || []) {
    allTags.add(topic.toLowerCase());
  }

  // 要約テキストから
  const summaryTags = extractTagsFromSummary(
    summary.shortSummary || "",
    summary.detailedSummary || ""
  );
  for (const tag of summaryTags) {
    allTags.add(tag);
  }

  // 決定事項から
  const decisionTags = extractTagsFromDecisions(summary.keyDecisions || []);
  for (const tag of decisionTags) {
    allTags.add(tag);
  }

  // ファイルパスから
  const fileTags = extractTagsFromFiles(summary.filesModified || []);
  for (const tag of fileTags) {
    allTags.add(tag);
  }

  // 重複を除去し、最大数まで切り詰め
  return Array.from(allTags).slice(0, maxTags);
}

/**
 * AIプロンプトを構築
 */
function buildTagExtractionPrompt(summary: ExtendedSessionSummary): string {
  return `以下のセッション要約から、最も関連性の高いタグを5-10個抽出してください。

## 要約
短い要約: ${summary.shortSummary}
詳細要約: ${summary.detailedSummary}
トピック: ${(summary.topics || []).join(", ")}
変更ファイル: ${(summary.filesModified || []).slice(0, 5).join(", ")}

## 出力形式
タグをカンマ区切りで出力してください（例: api, authentication, jwt, typescript）

タグ:`;
}

/**
 * AI応答からタグをパース
 */
function parseTagsFromResponse(text: string): string[] {
  // カンマまたは改行で分割
  const tags = text
    .split(/[,\n]/)
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0 && tag.length < 30)
    .filter((tag) => /^[a-z0-9\-]+$/.test(tag));

  return [...new Set(tags)];
}

/**
 * タグを自動抽出（メイン関数）
 *
 * AIを使用してタグを抽出。失敗時はフォールバック処理。
 */
export async function extractTags(
  summary: ExtendedSessionSummary,
  options: TagExtractionOptions = {}
): Promise<string[]> {
  const { maxTags = 10, useAI = true } = options;

  // AIを使用しない場合はフォールバック
  if (!useAI) {
    return extractTagsFallback(summary, { maxTags });
  }

  try {
    const prompt = buildTagExtractionPrompt(summary);
    let responseText = "";

    for await (const message of query({
      prompt,
      options: {
        allowedTools: [],
        maxTurns: 1,
      },
    })) {
      if (message.type === "assistant" && message.message?.content) {
        for (const block of message.message.content) {
          if ("text" in block) {
            responseText += block.text;
          }
        }
      }
    }

    const tags = parseTagsFromResponse(responseText);

    // AIが十分なタグを返さなかった場合、フォールバックで補完
    if (tags.length < 3) {
      const fallbackTags = extractTagsFallback(summary, { maxTags });
      const allTags = [...new Set([...tags, ...fallbackTags])];
      return allTags.slice(0, maxTags);
    }

    return tags.slice(0, maxTags);
  } catch {
    // グレースフルデグラデーション: AI失敗時はフォールバック
    return extractTagsFallback(summary, { maxTags });
  }
}
