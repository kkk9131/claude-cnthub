/**
 * セッション名生成サービス (API-02)
 *
 * 初回メッセージから AI でセッション名を生成する。
 * グレースフルデグラデーション: API失敗時はフォールバック処理で対応。
 */

import { query } from "@anthropic-ai/claude-agent-sdk";

/**
 * メッセージからのセッション命名オプション
 */
export interface MessageNamingOptions {
  /** 最大文字数（デフォルト: 15） */
  maxLength?: number;
  /** AIを使用するか（デフォルト: true） */
  useAI?: boolean;
}

/**
 * 文字列をクリーンアップ（特殊文字を除去）
 * 日本語（ひらがな、カタカナ、漢字）は保持
 */
function cleanupName(name: string): string {
  return name
    .replace(/[^\w\s\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "") // 英数字、スペース、ハイフン、日本語以外を除去
    .replace(/\s+/g, " ") // 連続スペースを1つに
    .trim();
}

/**
 * 先頭を大文字に（英語の場合）
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

  // 日本語の場合は単語境界がないのでそのまま切り詰め
  if (lastSpace > maxLength * 0.6) {
    return truncated.substring(0, lastSpace).trim();
  }

  return truncated.trim();
}

/**
 * メッセージから最初の意味のある行を抽出
 */
function extractFirstMeaningfulLine(message: string): string {
  // コードブロックを除去
  const withoutCodeBlocks = message.replace(/```[\s\S]*?```/g, "").trim();

  // 行に分割して最初の非空行を取得
  const lines = withoutCodeBlocks.split("\n").map((line) => line.trim());
  const firstLine = lines.find((line) => line.length > 0);

  return firstLine || "";
}

/**
 * フォールバック: AIを使わずにメッセージからセッション名を生成
 *
 * メッセージの先頭 15 文字（または指定された maxLength）をセッション名として使用
 */
export function generateNameFromMessageFallback(
  message: string,
  options: MessageNamingOptions = {}
): string {
  const { maxLength = 15 } = options;

  // メッセージが空の場合
  const trimmed = message.trim();
  if (!trimmed) {
    return "Untitled Session";
  }

  // 最初の意味のある行を抽出
  const firstLine = extractFirstMeaningfulLine(trimmed);
  if (!firstLine) {
    return "Untitled Session";
  }

  // クリーンアップして切り詰め
  const cleaned = cleanupName(firstLine);
  if (!cleaned) {
    return "Untitled Session";
  }

  return capitalize(truncate(cleaned, maxLength));
}

/**
 * AIプロンプトを構築
 */
function buildNamingPrompt(message: string): string {
  return `以下のユーザーメッセージから、簡潔なセッション名を1つ生成してください。

## ユーザーメッセージ
${message}

## ルール
- 15文字以内で簡潔に
- メッセージが日本語なら日本語、英語なら英語で
- 主要な意図を端的に表現（例: 「認証実装」「バグ修正」「UI改善」）
- 特殊文字は使わない
- 名詞形で出力

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
 * メッセージからセッション名を生成（メイン関数）
 *
 * AIを使用してセッション名を生成。失敗時はフォールバック処理。
 */
export async function generateNameFromMessage(
  message: string,
  options: MessageNamingOptions = {}
): Promise<string> {
  const { maxLength = 15, useAI = true } = options;

  // メッセージが空の場合
  const trimmed = message.trim();
  if (!trimmed) {
    return "Untitled Session";
  }

  // AIを使用しない場合はフォールバック
  if (!useAI) {
    return generateNameFromMessageFallback(message, { maxLength });
  }

  try {
    const prompt = buildNamingPrompt(trimmed);
    let responseText = "";

    for await (const msg of query({
      prompt,
      options: {
        allowedTools: [],
        maxTurns: 1,
      },
    })) {
      if (msg.type === "assistant" && msg.message?.content) {
        for (const block of msg.message.content) {
          if ("text" in block) {
            responseText += block.text;
          }
        }
      }
    }

    const name = parseNameFromResponse(responseText, maxLength);

    // AIが有効な名前を返さなかった場合、フォールバック
    if (name.length < 3) {
      return generateNameFromMessageFallback(message, { maxLength });
    }

    return name;
  } catch {
    // グレースフルデグラデーション: AI失敗時はフォールバック
    return generateNameFromMessageFallback(message, { maxLength });
  }
}
