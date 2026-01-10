/**
 * AI要約サービス
 *
 * セッションのメッセージからAI要約を生成する。
 * Claude Agent SDKを使用して要約・メタデータ抽出を行う。
 *
 * グレースフルデグラデーション:
 * - API失敗時もセッションは継続
 * - フォールバックで簡易要約を生成
 *
 * 認証:
 * - Claude Code認証を自動使用（APIキー設定不要）
 * - Pro/Team/Enterpriseサブスクで追加料金なし
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import type {
  Message,
  SessionSummary,
  SessionImportance,
  SessionCategory,
} from "@claude-cnthub/shared";
import { generateId, now } from "../repositories/base";

/**
 * 要約生成オプション
 */
export interface SummaryGenerationOptions {
  /** 最大ターン数（デフォルト: 1） */
  maxTurns?: number;
}

/**
 * メッセージから抽出されるメタデータ
 */
export interface ExtractedMetadata {
  /** 使用されたツール一覧 */
  toolsUsed: string[];
  /** 変更されたファイル一覧 */
  filesModified: string[];
  /** トピック（キーワード） */
  topics: string[];
  /** 重要な決定事項 */
  keyDecisions: string[];
}

/**
 * メッセージ配列から要約を生成
 *
 * @param sessionId - セッションID
 * @param messages - メッセージ配列
 * @param options - 生成オプション
 * @returns 生成された要約
 */
export async function generateSummary(
  sessionId: string,
  messages: Message[],
  options: SummaryGenerationOptions = {}
): Promise<SessionSummary> {
  const { maxTurns = 1 } = options;

  // 空のメッセージの場合は空の要約を返す
  if (messages.length === 0) {
    return createEmptySummary(sessionId);
  }

  // メッセージをテキストに変換
  const conversationText = formatMessagesForSummary(messages);
  const originalTokenCount = calculateTokenCount(conversationText);

  // メタデータを抽出
  const metadata = extractMetadata(messages);

  try {
    // Claude Agent SDKで要約を生成
    const prompt = buildSummaryPrompt(conversationText);
    let summaryText = "";

    // query()でClaude呼び出し（ツール不要）
    for await (const message of query({
      prompt,
      options: {
        allowedTools: [], // 要約にはツール不要
        maxTurns,
      },
    })) {
      // アシスタントメッセージからテキストを抽出
      if (message.type === "assistant" && message.message?.content) {
        for (const block of message.message.content) {
          if ("text" in block) {
            summaryText += block.text;
          }
        }
      }
    }

    // 要約をパース
    const { shortSummary, detailedSummary, keyDecisions } =
      parseSummaryResponse(summaryText, metadata.keyDecisions);

    const summaryTokenCount = calculateTokenCount(
      shortSummary + detailedSummary
    );
    const compressionRatio =
      originalTokenCount > 0 ? originalTokenCount / summaryTokenCount : 0;

    const timestamp = new Date(now());

    return {
      summaryId: generateId(),
      sessionId,
      shortSummary,
      detailedSummary,
      keyDecisions,
      filesModified: metadata.filesModified,
      toolsUsed: metadata.toolsUsed,
      topics: metadata.topics,
      originalTokenCount,
      summaryTokenCount,
      compressionRatio,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  } catch {
    // グレースフルデグラデーション: APIエラー時はフォールバック
    return createFallbackSummary(sessionId, messages, metadata);
  }
}

/**
 * メッセージからメタデータを抽出
 */
export function extractMetadata(messages: Message[]): ExtractedMetadata {
  const toolsUsed = new Set<string>();
  const filesModified = new Set<string>();
  const topics = new Set<string>();
  const keyDecisions: string[] = [];

  for (const message of messages) {
    // ツール使用メッセージからツール名とファイルパスを抽出
    if (message.type === "tool_use") {
      try {
        const toolData = JSON.parse(message.content);
        if (toolData.tool) {
          toolsUsed.add(toolData.tool);
        }
        // ファイル操作ツールからファイルパスを抽出
        if (toolData.input?.file_path) {
          filesModified.add(toolData.input.file_path);
        }
      } catch {
        // JSONパースエラーは無視
      }
    }

    // アシスタントメッセージから決定事項を抽出
    if (message.type === "assistant") {
      // 「〜に設定しました」「〜を採用しました」などのパターンを検出
      const decisionPatterns = [
        /(.+)に設定しました/g,
        /(.+)を採用しました/g,
        /(.+)で実装します/g,
      ];
      for (const pattern of decisionPatterns) {
        const matches = message.content.matchAll(pattern);
        for (const match of matches) {
          keyDecisions.push(match[0]);
        }
      }

      // キーワード抽出（簡易版: 技術用語を検出）
      const techTerms = message.content.match(
        /\b(JWT|OAuth|API|REST|GraphQL|SQL|Redis|認証|セキュリティ|ミドルウェア)\b/gi
      );
      if (techTerms) {
        techTerms.forEach((term) => topics.add(term));
      }
    }
  }

  return {
    toolsUsed: Array.from(toolsUsed),
    filesModified: Array.from(filesModified),
    topics: Array.from(topics),
    keyDecisions,
  };
}

/**
 * テキストのトークン数を概算
 *
 * 正確なトークン化はAPIコストがかかるため、
 * 簡易的な計算（文字数ベース）で概算する。
 *
 * - 英語: 約4文字 = 1トークン
 * - 日本語: 約1.5文字 = 1トークン
 */
export function calculateTokenCount(text: string): number {
  if (!text) return 0;

  // 日本語と英語の比率を推定
  const japaneseChars = text.match(/[\u3000-\u9fff]/g) || [];
  const otherChars = text.length - japaneseChars.length;

  // 日本語は1.5文字≒1トークン、英語は4文字≒1トークン
  const japaneseTokens = japaneseChars.length / 1.5;
  const otherTokens = otherChars / 4;

  return Math.ceil(japaneseTokens + otherTokens);
}

/**
 * メッセージを要約用テキストに変換
 */
function formatMessagesForSummary(messages: Message[]): string {
  return messages
    .map((msg) => {
      const role = msg.type === "user" ? "User" : "Assistant";
      if (msg.type === "tool_use" || msg.type === "tool_result") {
        return `[Tool: ${msg.type}]\n${msg.content}`;
      }
      return `${role}: ${msg.content}`;
    })
    .join("\n\n");
}

/**
 * 要約生成プロンプトを構築
 */
function buildSummaryPrompt(conversationText: string): string {
  return `以下の会話を要約してください。

## 出力形式
SHORT_SUMMARY:（1-2文で簡潔に）
DETAILED_SUMMARY:（3-5文で詳細に）
KEY_DECISIONS:（重要な決定事項をリスト形式で）

## 会話内容
${conversationText}`;
}

/**
 * APIレスポンスをパース
 */
function parseSummaryResponse(
  text: string,
  fallbackDecisions: string[]
): {
  shortSummary: string;
  detailedSummary: string;
  keyDecisions: string[];
} {
  const shortMatch = text.match(
    /SHORT_SUMMARY:\s*(.+?)(?=DETAILED_SUMMARY:|$)/s
  );
  const detailedMatch = text.match(
    /DETAILED_SUMMARY:\s*(.+?)(?=KEY_DECISIONS:|$)/s
  );
  const decisionsMatch = text.match(/KEY_DECISIONS:\s*(.+)$/s);

  const shortSummary = shortMatch?.[1]?.trim() || "";
  const detailedSummary = detailedMatch?.[1]?.trim() || "";

  let keyDecisions = fallbackDecisions;
  if (decisionsMatch) {
    const decisionsText = decisionsMatch[1].trim();
    keyDecisions = decisionsText
      .split(/[\n・\-]/)
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
  }

  return { shortSummary, detailedSummary, keyDecisions };
}

/**
 * 空の要約を作成
 */
function createEmptySummary(sessionId: string): SessionSummary {
  const timestamp = new Date(now());
  return {
    summaryId: generateId(),
    sessionId,
    shortSummary: "",
    detailedSummary: "",
    keyDecisions: [],
    filesModified: [],
    toolsUsed: [],
    topics: [],
    originalTokenCount: 0,
    summaryTokenCount: 0,
    compressionRatio: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

/**
 * フォールバック要約を作成（API失敗時）
 */
function createFallbackSummary(
  sessionId: string,
  messages: Message[],
  metadata: ExtractedMetadata
): SessionSummary {
  const timestamp = new Date(now());

  // 最初のユーザーメッセージをタイトルとして使用
  const firstUserMessage = messages.find((m) => m.type === "user");
  const shortSummary = firstUserMessage?.content.slice(0, 100) || "";

  // メッセージ数とツール使用をまとめる
  const detailedSummary = `要約生成に失敗しました。メッセージ数: ${messages.length}件、使用ツール: ${metadata.toolsUsed.join(", ") || "なし"}`;

  const originalTokenCount = calculateTokenCount(
    messages.map((m) => m.content).join("\n")
  );

  return {
    summaryId: generateId(),
    sessionId,
    shortSummary,
    detailedSummary,
    keyDecisions: metadata.keyDecisions,
    filesModified: metadata.filesModified,
    toolsUsed: metadata.toolsUsed,
    topics: metadata.topics,
    originalTokenCount,
    summaryTokenCount: calculateTokenCount(shortSummary + detailedSummary),
    compressionRatio: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

/**
 * セッション分類結果
 */
export interface SessionClassification {
  /** 重要度 */
  importance: SessionImportance;
  /** カテゴリ */
  category: SessionCategory;
}

/**
 * メッセージからセッションの重要度とカテゴリを判定
 *
 * ヒューリスティックベースの判定:
 * - 重要度: ファイル変更数、キー決定事項数、トークン数で判定
 * - カテゴリ: 使用ツール、キーワードパターンで判定
 *
 * @param messages - メッセージ配列
 * @param metadata - 抽出済みメタデータ
 * @returns 分類結果
 */
export function classifySession(
  messages: Message[],
  metadata: ExtractedMetadata
): SessionClassification {
  const importance = determineImportance(messages, metadata);
  const category = determineCategory(messages, metadata);

  return { importance, category };
}

/**
 * 重要度を判定
 *
 * 判定基準:
 * - high: 10ファイル以上変更 or 5つ以上の決定事項 or 10000トークン以上
 * - low: ファイル変更なし and 決定事項なし and 1000トークン未満
 * - medium: その他
 */
function determineImportance(
  messages: Message[],
  metadata: ExtractedMetadata
): SessionImportance {
  const fileCount = metadata.filesModified.length;
  const decisionCount = metadata.keyDecisions.length;
  const tokenCount = calculateTokenCount(
    messages.map((m) => m.content).join("\n")
  );

  // 高重要度の条件
  if (fileCount >= 10 || decisionCount >= 5 || tokenCount >= 10000) {
    return "high";
  }

  // 低重要度の条件
  if (fileCount === 0 && decisionCount === 0 && tokenCount < 1000) {
    return "low";
  }

  return "medium";
}

/**
 * カテゴリを判定
 *
 * 判定基準:
 * - bugfix: エラー/バグ関連のキーワードが含まれる
 * - feature: 新規ファイル作成 or 機能追加キーワード
 * - refactor: リファクタリングキーワード
 * - exploration: 調査/試行錯誤キーワード or ツール使用が少ない
 * - other: その他
 */
function determineCategory(
  messages: Message[],
  metadata: ExtractedMetadata
): SessionCategory {
  const allContent = messages
    .map((m) => m.content)
    .join("\n")
    .toLowerCase();

  // バグ修正パターン
  const bugfixPatterns = [
    /fix(ed|ing)?\s+(bug|error|issue)/i,
    /バグ(修正|フィックス)/i,
    /エラー(修正|対応)/i,
    /issue\s*#?\d+/i,
    /hotfix/i,
  ];
  if (bugfixPatterns.some((p) => p.test(allContent))) {
    return "bugfix";
  }

  // 新機能パターン
  const featurePatterns = [
    /add(ed|ing)?\s+new/i,
    /implement(ed|ing)?/i,
    /新機能/i,
    /機能追加/i,
    /feature/i,
  ];
  if (featurePatterns.some((p) => p.test(allContent))) {
    return "feature";
  }

  // リファクタリングパターン
  const refactorPatterns = [
    /refactor(ed|ing)?/i,
    /リファクタ(リング)?/i,
    /整理/i,
    /cleanup/i,
    /restructure/i,
  ];
  if (refactorPatterns.some((p) => p.test(allContent))) {
    return "refactor";
  }

  // 調査/試行錯誤パターン
  const explorationPatterns = [
    /調査/i,
    /試行錯誤/i,
    /investigate/i,
    /explore/i,
    /research/i,
    /検討/i,
  ];
  if (
    explorationPatterns.some((p) => p.test(allContent)) ||
    metadata.toolsUsed.length <= 2
  ) {
    return "exploration";
  }

  // ファイル変更があれば feature
  if (metadata.filesModified.length > 0) {
    return "feature";
  }

  return "other";
}
