/**
 * セッション自動命名サービス (L-06)
 *
 * AI を使用してセッションに意味のある名前を自動生成する。
 * グレースフルデグラデーション: API失敗時はフォールバック処理で対応。
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import type { ExtendedSessionSummary, Session } from "@claude-cnthub/shared";

/**
 * セッション命名オプション
 */
export interface SessionNamingOptions {
  /** 最大文字数（デフォルト: 50） */
  maxLength?: number;
  /** セッション情報（タスク等を参照） */
  session?: Session;
  /** AIを使用するか（デフォルト: true） */
  useAI?: boolean;
}

/**
 * 文字列をクリーンアップ（特殊文字を除去）
 */
function cleanupName(name: string): string {
  return name
    .replace(/[^\w\s\-]/g, "") // 英数字、スペース、ハイフン以外を除去
    .replace(/\s+/g, " ") // 連続スペースを1つに
    .trim();
}

/**
 * 先頭を大文字に
 */
function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * テキストを指定長で切り詰め
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // 単語境界で切り詰め
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace).trim();
  }

  return truncated.trim();
}

/**
 * ファイルパスからセッション名を生成
 */
function nameFromFilePath(filePath: string): string {
  const parts = filePath.split("/");
  const fileName = parts[parts.length - 1]?.replace(/\.[^.]+$/, "") || "";

  // camelCase や snake_case を分割
  const words = fileName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .toLowerCase();

  return capitalize(words);
}

/**
 * フォールバック: AIを使わずにセッション名を生成
 */
export function generateSessionNameFallback(
  summary: ExtendedSessionSummary,
  options: SessionNamingOptions = {}
): string {
  const { maxLength = 50, session } = options;

  // 1. セッションのタスクがあればそれを使用
  if (session?.task) {
    const name = cleanupName(session.task);
    if (name.length > 0) {
      return capitalize(truncate(name, maxLength));
    }
  }

  // 2. 短い要約を使用
  if (summary.shortSummary) {
    const name = cleanupName(summary.shortSummary);
    if (name.length > 0) {
      return capitalize(truncate(name, maxLength));
    }
  }

  // 3. トピックから生成
  if (summary.topics && summary.topics.length > 0) {
    const name = capitalize(summary.topics.slice(0, 3).join(" "));
    return truncate(name, maxLength);
  }

  // 4. 変更ファイルから生成
  if (summary.filesModified && summary.filesModified.length > 0) {
    const name = nameFromFilePath(summary.filesModified[0]);
    if (name.length > 0) {
      return truncate(name, maxLength);
    }
  }

  // 5. 決定事項から生成
  if (summary.keyDecisions && summary.keyDecisions.length > 0) {
    const name = cleanupName(summary.keyDecisions[0]);
    if (name.length > 0) {
      return capitalize(truncate(name, maxLength));
    }
  }

  // 6. デフォルト名
  return "Untitled Session";
}

/**
 * AIプロンプトを構築
 */
function buildNamingPrompt(
  summary: ExtendedSessionSummary,
  session?: Session
): string {
  const context = session?.task ? `タスク: ${session.task}\n` : "";

  return `以下のセッション情報から、簡潔で分かりやすいセッション名を1つ生成してください。

${context}## 要約
${summary.shortSummary}

## 詳細
${summary.detailedSummary}

## ルール
- 日本語または英語で20-40文字程度
- 具体的で内容が分かる名前
- 動詞で始まる場合は過去形または名詞形
- 特殊文字は使わない

セッション名:`;
}

/**
 * AI応答からセッション名をパース
 */
function parseNameFromResponse(text: string, maxLength: number): string {
  // 最初の行を取得
  const firstLine = text.split("\n")[0]?.trim() || "";

  // クリーンアップして切り詰め
  const name = cleanupName(firstLine);

  if (name.length === 0) {
    return "";
  }

  return capitalize(truncate(name, maxLength));
}

/**
 * セッション名を自動生成（メイン関数）
 *
 * AIを使用してセッション名を生成。失敗時はフォールバック処理。
 */
export async function generateSessionName(
  summary: ExtendedSessionSummary,
  options: SessionNamingOptions = {}
): Promise<string> {
  const { maxLength = 50, session, useAI = true } = options;

  // AIを使用しない場合はフォールバック
  if (!useAI) {
    return generateSessionNameFallback(summary, { maxLength, session });
  }

  try {
    const prompt = buildNamingPrompt(summary, session);
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

    const name = parseNameFromResponse(responseText, maxLength);

    // AIが有効な名前を返さなかった場合、フォールバック
    if (name.length < 3) {
      return generateSessionNameFallback(summary, { maxLength, session });
    }

    return name;
  } catch {
    // グレースフルデグラデーション: AI失敗時はフォールバック
    return generateSessionNameFallback(summary, { maxLength, session });
  }
}
