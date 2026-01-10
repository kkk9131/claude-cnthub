/**
 * Observation 分析サービス (SE-01: AI グルーピング API)
 *
 * observations を AI で自動分析し、カテゴリ別にグルーピングする。
 * Smart Export 機能の基盤となるサービス。
 *
 * カテゴリ:
 * - feature: 新機能の実装
 * - bugfix: バグ修正
 * - refactor: リファクタリング
 * - docs: ドキュメント更新
 * - test: テスト追加・修正
 * - config: 設定・環境構築
 * - exploration: 調査・試行錯誤
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import type { Observation } from "../repositories/observation";
import type { SessionIssueType } from "@claude-cnthub/shared";

/**
 * グルーピングカテゴリ
 */
export type ObservationCategory =
  | "feature"
  | "bugfix"
  | "refactor"
  | "docs"
  | "test"
  | "config"
  | "exploration";

/**
 * グループ化された observations
 */
export interface ObservationGroup {
  /** カテゴリ */
  category: ObservationCategory;
  /** カテゴリの日本語名 */
  categoryLabel: string;
  /** グループの説明（AI生成） */
  description: string;
  /** このグループに属する observation IDs */
  observationIds: string[];
  /** 推定トークン数 */
  estimatedTokens: number;
}

/**
 * 分析結果
 */
export interface AnalyzeResult {
  /** グループ一覧 */
  groups: ObservationGroup[];
  /** 分析にかかった時間（ms） */
  analysisTimeMs: number;
  /** 総 observation 数 */
  totalObservations: number;
  /** 総推定トークン数 */
  totalEstimatedTokens: number;
}

/**
 * カテゴリラベルのマッピング
 */
const CATEGORY_LABELS: Record<ObservationCategory, string> = {
  feature: "新機能",
  bugfix: "バグ修正",
  refactor: "リファクタリング",
  docs: "ドキュメント",
  test: "テスト",
  config: "設定・環境",
  exploration: "調査・試行錯誤",
};

/**
 * テキストのトークン数を推定
 */
function estimateTokens(text: string): number {
  if (!text) return 0;
  const japaneseChars = text.match(/[\u3000-\u9fff]/g) || [];
  const otherChars = text.length - japaneseChars.length;
  const japaneseTokens = japaneseChars.length / 1.5;
  const otherTokens = otherChars / 4;
  return Math.ceil(japaneseTokens + otherTokens);
}

/**
 * AI による分析プロンプトを構築
 */
function buildAnalyzePrompt(observations: Observation[]): string {
  const observationList = observations
    .map((obs, i) => {
      const metadata = obs.metadata ? JSON.stringify(obs.metadata) : "";
      return `[${i + 1}] ID: ${obs.observationId}
Type: ${obs.type}
Title: ${obs.title}
Content: ${obs.content.slice(0, 200)}${obs.content.length > 200 ? "..." : ""}
${metadata ? `Metadata: ${metadata.slice(0, 100)}` : ""}`;
    })
    .join("\n\n");

  return `以下の observations を分析し、作業内容に基づいてグループ分けしてください。

## カテゴリ
- feature: 新機能の実装
- bugfix: バグ修正
- refactor: リファクタリング
- docs: ドキュメント更新
- test: テスト追加・修正
- config: 設定・環境構築
- exploration: 調査・試行錯誤

## 出力形式（JSON）
{
  "groups": [
    {
      "category": "feature",
      "description": "認証機能の実装",
      "observationIds": ["ch_ob_0001", "ch_ob_0002"]
    }
  ]
}

## 注意事項
- 関連する observations は同じグループにまとめる
- 1つの observation は1つのグループにのみ属する
- 空のグループは作成しない
- description は日本語で簡潔に（20文字以内）

## Observations
${observationList}`;
}

/**
 * AI レスポンスをパース
 */
function parseAnalyzeResponse(
  text: string,
  observations: Observation[]
): ObservationGroup[] {
  // JSON部分を抽出
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // パース失敗時はフォールバック
    return createFallbackGroups(observations);
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    const groups: ObservationGroup[] = [];

    // observation ID → トークン数のマップを作成
    const tokenMap = new Map<string, number>();
    for (const obs of observations) {
      const tokens = estimateTokens(obs.title) + estimateTokens(obs.content);
      tokenMap.set(obs.observationId, tokens);
    }

    // 有効な observation IDs のセット
    const validIds = new Set(observations.map((o) => o.observationId));

    for (const group of parsed.groups || []) {
      const category = group.category as ObservationCategory;
      if (!CATEGORY_LABELS[category]) continue;

      // 有効な ID のみフィルタ
      const observationIds = (group.observationIds || []).filter((id: string) =>
        validIds.has(id)
      );
      if (observationIds.length === 0) continue;

      // トークン数を計算
      const estimatedTokens = observationIds.reduce(
        (sum: number, id: string) => sum + (tokenMap.get(id) || 0),
        0
      );

      groups.push({
        category,
        categoryLabel: CATEGORY_LABELS[category],
        description: group.description || "",
        observationIds,
        estimatedTokens,
      });
    }

    // グループに含まれなかった observations を exploration に追加
    const groupedIds = new Set(groups.flatMap((g) => g.observationIds));
    const ungroupedObs = observations.filter(
      (o) => !groupedIds.has(o.observationId)
    );

    if (ungroupedObs.length > 0) {
      const ungroupedTokens = ungroupedObs.reduce(
        (sum, obs) => sum + (tokenMap.get(obs.observationId) || 0),
        0
      );
      groups.push({
        category: "exploration",
        categoryLabel: CATEGORY_LABELS.exploration,
        description: "その他の作業",
        observationIds: ungroupedObs.map((o) => o.observationId),
        estimatedTokens: ungroupedTokens,
      });
    }

    return groups;
  } catch {
    return createFallbackGroups(observations);
  }
}

/**
 * フォールバックグループを作成（AI失敗時）
 */
function createFallbackGroups(observations: Observation[]): ObservationGroup[] {
  // type ごとにグループ化
  const typeGroups = new Map<string, Observation[]>();

  for (const obs of observations) {
    const existing = typeGroups.get(obs.type) || [];
    existing.push(obs);
    typeGroups.set(obs.type, existing);
  }

  const groups: ObservationGroup[] = [];

  // type → category のマッピング
  const typeToCategory: Record<string, ObservationCategory> = {
    tool_use: "feature",
    decision: "feature",
    error: "bugfix",
    learning: "exploration",
    note: "docs",
    file_change: "feature",
  };

  for (const [type, obs] of typeGroups) {
    const category = typeToCategory[type] || "exploration";
    const estimatedTokens = obs.reduce(
      (sum, o) => sum + estimateTokens(o.title) + estimateTokens(o.content),
      0
    );

    groups.push({
      category,
      categoryLabel: CATEGORY_LABELS[category],
      description: `${type} タイプの記録`,
      observationIds: obs.map((o) => o.observationId),
      estimatedTokens,
    });
  }

  return groups;
}

/**
 * Observations を分析してグルーピング
 *
 * Claude Agent SDK を使用して AI による分類を行う（サブスク対応）。
 * API エラー時はフォールバック（type ベース分類）を使用。
 *
 * @param observations - 分析対象の observations
 * @returns グルーピング結果
 */
export async function analyzeObservations(
  observations: Observation[]
): Promise<AnalyzeResult> {
  const startTime = Date.now();

  // 空の場合は空結果を返す
  if (observations.length === 0) {
    return {
      groups: [],
      analysisTimeMs: 0,
      totalObservations: 0,
      totalEstimatedTokens: 0,
    };
  }

  // 総トークン数を計算
  const totalEstimatedTokens = observations.reduce(
    (sum, obs) => sum + estimateTokens(obs.title) + estimateTokens(obs.content),
    0
  );

  try {
    // Claude Agent SDK で分析を実行（サブスク使用）
    const prompt = buildAnalyzePrompt(observations);
    let responseText = "";

    for await (const message of query({
      prompt,
      options: {
        allowedTools: [], // 分析にはツール不要
        maxTurns: 1,
      },
    })) {
      // アシスタントメッセージからテキストを抽出
      if (message.type === "assistant" && message.message?.content) {
        for (const block of message.message.content) {
          if ("text" in block) {
            responseText += block.text;
          }
        }
      }
    }

    // レスポンスをパースしてグループを生成
    const groups = parseAnalyzeResponse(responseText, observations);

    return {
      groups,
      analysisTimeMs: Date.now() - startTime,
      totalObservations: observations.length,
      totalEstimatedTokens,
    };
  } catch (error) {
    // API エラー時はフォールバック
    console.error(
      "[observation-analyzer] Agent SDK error, using fallback:",
      error
    );
    const groups = createFallbackGroups(observations);
    return {
      groups,
      analysisTimeMs: Date.now() - startTime,
      totalObservations: observations.length,
      totalEstimatedTokens,
    };
  }
}

/**
 * 失敗検出結果
 */
export interface IssueDetectionResult {
  /** 問題があるか */
  hasIssues: boolean;
  /** 問題タイプ */
  issueType?: SessionIssueType;
  /** 検出された問題の詳細 */
  details?: string;
}

/**
 * Observations から失敗パターンを検出
 *
 * 検出パターン:
 * - error_loop: 同じエラーメッセージの繰り返し（3回以上）
 * - edit_loop: 同じファイルを何度も編集（5回以上）
 * - test_failure_loop: テスト失敗→修正→再失敗のループ
 * - rollback: git reset/revert の検出
 *
 * @param observations - 分析対象の observations
 * @returns 失敗検出結果
 */
export function detectIssues(
  observations: Observation[]
): IssueDetectionResult {
  if (observations.length === 0) {
    return { hasIssues: false };
  }

  // エラーループの検出
  const errorLoopResult = detectErrorLoop(observations);
  if (errorLoopResult.hasIssues) {
    return errorLoopResult;
  }

  // 編集ループの検出
  const editLoopResult = detectEditLoop(observations);
  if (editLoopResult.hasIssues) {
    return editLoopResult;
  }

  // テスト失敗ループの検出
  const testFailureResult = detectTestFailureLoop(observations);
  if (testFailureResult.hasIssues) {
    return testFailureResult;
  }

  // ロールバックの検出
  const rollbackResult = detectRollback(observations);
  if (rollbackResult.hasIssues) {
    return rollbackResult;
  }

  return { hasIssues: false };
}

/**
 * エラーループを検出（同じエラーが3回以上）
 */
function detectErrorLoop(observations: Observation[]): IssueDetectionResult {
  // エラータイプの observations を抽出
  const errorObs = observations.filter((obs) => obs.type === "error");

  if (errorObs.length < 3) {
    return { hasIssues: false };
  }

  // エラーメッセージをカウント（先頭100文字で比較）
  const errorCounts = new Map<string, number>();
  for (const obs of errorObs) {
    const key = obs.content.slice(0, 100).toLowerCase();
    errorCounts.set(key, (errorCounts.get(key) || 0) + 1);
  }

  // 3回以上の繰り返しがあるか
  for (const [errorKey, count] of errorCounts) {
    if (count >= 3) {
      return {
        hasIssues: true,
        issueType: "error_loop",
        details: `同じエラーが${count}回繰り返されました: "${errorKey.slice(0, 50)}..."`,
      };
    }
  }

  return { hasIssues: false };
}

/**
 * 編集ループを検出（同じファイルを5回以上編集）
 */
function detectEditLoop(observations: Observation[]): IssueDetectionResult {
  // file_change または tool_use (Edit/Write) を抽出
  const editObs = observations.filter((obs) => {
    if (obs.type === "file_change") return true;
    if (obs.type === "tool_use") {
      const content = obs.content.toLowerCase();
      return content.includes("edit") || content.includes("write");
    }
    return false;
  });

  if (editObs.length < 5) {
    return { hasIssues: false };
  }

  // ファイルパスをカウント
  const fileCounts = new Map<string, number>();
  for (const obs of editObs) {
    // metadata からファイルパスを抽出
    const metadata = obs.metadata as Record<string, unknown> | undefined;
    const filePath =
      (metadata?.file_path as string) ||
      (metadata?.path as string) ||
      extractFilePathFromContent(obs.content);

    if (filePath) {
      fileCounts.set(filePath, (fileCounts.get(filePath) || 0) + 1);
    }
  }

  // 5回以上の編集があるか
  for (const [filePath, count] of fileCounts) {
    if (count >= 5) {
      return {
        hasIssues: true,
        issueType: "edit_loop",
        details: `同じファイルが${count}回編集されました: "${filePath}"`,
      };
    }
  }

  return { hasIssues: false };
}

/**
 * テスト失敗ループを検出
 */
function detectTestFailureLoop(
  observations: Observation[]
): IssueDetectionResult {
  // テスト関連のキーワードを検出
  const testKeywords = ["test", "jest", "vitest", "mocha", "fail", "error"];
  const testFailures: number[] = [];

  for (let i = 0; i < observations.length; i++) {
    const obs = observations[i];
    const content = obs.content.toLowerCase();

    // テスト失敗パターン
    if (
      obs.type === "error" ||
      (content.includes("fail") &&
        testKeywords.some((k) => content.includes(k)))
    ) {
      testFailures.push(i);
    }
  }

  // 3回以上のテスト失敗があり、間に編集が挟まっているか
  if (testFailures.length >= 3) {
    // テスト失敗の間に編集があるか確認
    let hasEditBetween = false;
    for (let i = 0; i < testFailures.length - 1; i++) {
      const start = testFailures[i];
      const end = testFailures[i + 1];

      for (let j = start + 1; j < end; j++) {
        const obs = observations[j];
        if (obs.type === "file_change" || obs.type === "tool_use") {
          hasEditBetween = true;
          break;
        }
      }
      if (hasEditBetween) break;
    }

    if (hasEditBetween) {
      return {
        hasIssues: true,
        issueType: "test_failure_loop",
        details: `テスト失敗→修正→再失敗のループが${testFailures.length}回検出されました`,
      };
    }
  }

  return { hasIssues: false };
}

/**
 * ロールバックを検出
 */
function detectRollback(observations: Observation[]): IssueDetectionResult {
  const rollbackKeywords = [
    "git reset",
    "git revert",
    "git checkout --",
    "undo",
    "rollback",
    "元に戻",
    "取り消",
  ];

  for (const obs of observations) {
    const content = obs.content.toLowerCase();

    for (const keyword of rollbackKeywords) {
      if (content.includes(keyword)) {
        return {
          hasIssues: true,
          issueType: "rollback",
          details: `ロールバック操作が検出されました: "${keyword}"`,
        };
      }
    }
  }

  return { hasIssues: false };
}

/**
 * コンテンツからファイルパスを抽出（ヒューリスティック）
 */
function extractFilePathFromContent(content: string): string | null {
  // よくあるパスパターンをマッチ
  const patterns = [
    /"file_path":\s*"([^"]+)"/,
    /"path":\s*"([^"]+)"/,
    /file:\s*([^\s,]+)/i,
    /editing\s+([^\s,]+)/i,
    /writing\s+to\s+([^\s,]+)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}
