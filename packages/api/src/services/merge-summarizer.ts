/**
 * M-03: AI マージ要約生成サービス
 *
 * 複数セッションの要約をAIで統合する。
 * Claude Agent SDKを使用して統合要約を生成。
 *
 * グレースフルデグラデーション:
 * - API失敗時はフォールバック要約を生成
 * - 要約の単純結合で最低限の機能を提供
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { query as dbQuery } from "../db";

/**
 * セッション要約の簡易版（マージ用）
 */
export interface SessionSummaryForMerge {
  sessionId: string;
  shortSummary: string;
  detailedSummary: string;
  topics: string[];
  keyDecisions: string[];
}

/**
 * マージ要約の結果
 */
export interface MergeSummaryResult {
  success: boolean;
  shortSummary?: string;
  detailedSummary?: string;
  topics?: string[];
  keyDecisions?: string[];
  error?: string;
}

/**
 * パースされたマージレスポンス
 */
export interface ParsedMergeResponse {
  shortSummary: string;
  detailedSummary: string;
  topics: string[];
  keyDecisions: string[];
}

/**
 * DBからセッション要約を取得
 */
function getSummaryBySessionId(
  sessionId: string
): SessionSummaryForMerge | null {
  const rows = dbQuery(
    `SELECT session_id, short_summary, detailed_summary, topics, key_decisions
     FROM summaries
     WHERE session_id = ?
     LIMIT 1`,
    sessionId
  ) as Array<{
    session_id: string;
    short_summary: string;
    detailed_summary: string;
    topics: string;
    key_decisions: string;
  }>;

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];
  return {
    sessionId: row.session_id,
    shortSummary: row.short_summary || "",
    detailedSummary: row.detailed_summary || "",
    topics: safeParseJSON(row.topics, []),
    keyDecisions: safeParseJSON(row.key_decisions, []),
  };
}

/**
 * 安全にJSONをパース
 */
function safeParseJSON<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * 複数セッションの要約をマージする
 *
 * @param sessionIds マージ対象のセッションIDリスト
 * @returns マージ結果
 */
export async function generateMergeSummary(
  sessionIds: string[]
): Promise<MergeSummaryResult> {
  // 空のセッションIDリストをチェック
  if (sessionIds.length === 0) {
    return {
      success: false,
      error: "No session IDs provided",
    };
  }

  // 各セッションの要約を取得
  const summaries: SessionSummaryForMerge[] = [];
  for (const sessionId of sessionIds) {
    const summary = getSummaryBySessionId(sessionId);
    if (summary) {
      summaries.push(summary);
    }
  }

  // 有効な要約がない場合
  if (summaries.length === 0) {
    return {
      success: false,
      error: "No summaries found for the provided session IDs",
    };
  }

  // 1件のみの場合はそのまま返す
  if (summaries.length === 1) {
    const s = summaries[0];
    return {
      success: true,
      shortSummary: s.shortSummary,
      detailedSummary: s.detailedSummary,
      topics: s.topics,
      keyDecisions: s.keyDecisions,
    };
  }

  // テスト環境またはClaude Code外ではフォールバックを使用
  // Claude Agent SDKはClaude Code内でのみ動作するため
  const isTestEnv =
    process.env.NODE_ENV === "test" || process.env.DATABASE_PATH === ":memory:";

  if (isTestEnv) {
    return createFallbackMergeSummary(summaries);
  }

  try {
    // Claude Agent SDKで統合要約を生成
    const prompt = buildMergePrompt(summaries);
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

    // レスポンスをパース
    const parsed = parseMergeResponse(responseText);

    return {
      success: true,
      shortSummary: parsed.shortSummary,
      detailedSummary: parsed.detailedSummary,
      topics: parsed.topics,
      keyDecisions: parsed.keyDecisions,
    };
  } catch {
    // グレースフルデグラデーション: フォールバック要約を返す
    return createFallbackMergeSummary(summaries);
  }
}

/**
 * マージ用プロンプトを構築
 */
export function buildMergePrompt(summaries: SessionSummaryForMerge[]): string {
  let sessionSummaries = "";

  for (let i = 0; i < summaries.length; i++) {
    const s = summaries[i];
    sessionSummaries += `
### セッション ${i + 1} (${s.sessionId})
**概要**: ${s.shortSummary}
**詳細**: ${s.detailedSummary}
**トピック**: ${s.topics.join(", ") || "なし"}
**決定事項**: ${s.keyDecisions.join(", ") || "なし"}
`;
  }

  return `以下の複数セッションの要約を1つに統合してください。

## 入力セッション
${sessionSummaries}

## 出力形式
SHORT_SUMMARY:（統合された1-2文の要約）
DETAILED_SUMMARY:（統合された3-5文の詳細要約）
KEY_DECISIONS:（重要な決定事項をリスト形式で）
TOPICS:（関連トピックをカンマ区切りで）

## 注意
- 重複する内容は統合してください
- 各セッションの重要なポイントを漏らさないでください
- 自然な日本語で出力してください`;
}

/**
 * AIレスポンスをパース
 */
export function parseMergeResponse(text: string): ParsedMergeResponse {
  const result: ParsedMergeResponse = {
    shortSummary: "",
    detailedSummary: "",
    topics: [],
    keyDecisions: [],
  };

  if (!text) return result;

  // SHORT_SUMMARY
  const shortMatch = text.match(
    /SHORT_SUMMARY:\s*(.+?)(?=DETAILED_SUMMARY:|$)/s
  );
  if (shortMatch) {
    result.shortSummary = shortMatch[1].trim();
  }

  // DETAILED_SUMMARY
  const detailedMatch = text.match(
    /DETAILED_SUMMARY:\s*(.+?)(?=KEY_DECISIONS:|$)/s
  );
  if (detailedMatch) {
    result.detailedSummary = detailedMatch[1].trim();
  }

  // KEY_DECISIONS
  const decisionsMatch = text.match(/KEY_DECISIONS:\s*(.+?)(?=TOPICS:|$)/s);
  if (decisionsMatch) {
    const decisionsText = decisionsMatch[1].trim();
    result.keyDecisions = decisionsText
      .split(/[\n・\-]/)
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
  }

  // TOPICS
  const topicsMatch = text.match(/TOPICS:\s*(.+)$/s);
  if (topicsMatch) {
    const topicsText = topicsMatch[1].trim();
    result.topics = topicsText
      .split(/[,、]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }

  return result;
}

/**
 * フォールバック要約を作成（API失敗時）
 */
export function createFallbackMergeSummary(
  summaries: SessionSummaryForMerge[]
): MergeSummaryResult {
  if (summaries.length === 0) {
    return {
      success: true,
      shortSummary: "",
      detailedSummary: "",
      topics: [],
      keyDecisions: [],
    };
  }

  // 各セッションの要約を結合
  const shortSummary = summaries.map((s) => s.shortSummary).join(" / ");
  const detailedSummary = summaries.map((s) => s.detailedSummary).join("\n\n");

  // トピックと決定事項を統合（重複排除）
  const topicsSet = new Set<string>();
  const decisionsSet = new Set<string>();

  for (const s of summaries) {
    s.topics.forEach((t) => topicsSet.add(t));
    s.keyDecisions.forEach((d) => decisionsSet.add(d));
  }

  return {
    success: true,
    shortSummary,
    detailedSummary,
    topics: Array.from(topicsSet),
    keyDecisions: Array.from(decisionsSet),
  };
}
