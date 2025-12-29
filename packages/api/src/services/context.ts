/**
 * コンテキスト注入サービス
 *
 * セマンティック検索結果を基に、関連するセッション情報を
 * 新しいセッションに自動注入するためのコンテキストを構築する。
 *
 * 機能:
 * - 関連セッションの検索
 * - コンテキスト文字列の構築
 * - トークン制限管理
 */

import { generateQueryEmbedding, isEmbeddingAvailable } from "./embeddings";
import {
  searchSimilarSessions,
  type SessionSearchResult,
} from "../repositories/embedding";
import { getSummariesBySessionIds } from "../repositories/summary";
import type { SessionSummary } from "@claude-cnthub/shared";
import { distanceToRelevanceScore } from "../utils/relevance";

/**
 * コンテキスト構築の定数
 */
/** デフォルトの最大セッション数 */
const DEFAULT_MAX_SESSIONS = 5;
/** デフォルトの最大トークン数 */
const DEFAULT_MAX_TOKENS = 4000;
/** デフォルトの最小関連度スコア */
const DEFAULT_MIN_RELEVANCE_SCORE = 0.3;
/** 表示する決定事項の最大数 */
const MAX_DECISIONS_DISPLAY = 3;
/** 表示する変更ファイルの最大数 */
const MAX_FILES_DISPLAY = 5;
/** 検索時のフィルタリング倍率 */
const SEARCH_MULTIPLIER = 2;
/** 日本語1トークンあたりの文字数 */
const JAPANESE_CHARS_PER_TOKEN = 1.5;
/** 英語1トークンあたりの文字数 */
const ENGLISH_CHARS_PER_TOKEN = 4;

/**
 * コンテキスト構築オプション
 */
export interface ContextOptions {
  /** 取得する関連セッション数（デフォルト: 5） */
  maxSessions?: number;
  /** 最大トークン数（デフォルト: 4000） */
  maxTokens?: number;
  /** 最小関連度スコア（デフォルト: 0.3） */
  minRelevanceScore?: number;
}

/**
 * 関連コンテキスト
 */
export interface RelatedContext {
  /** 関連セッション情報 */
  sessions: RelatedSession[];
  /** 構築されたコンテキスト文字列 */
  contextText: string;
  /** 推定トークン数 */
  estimatedTokens: number;
  /** 検索に使用されたクエリ */
  query: string;
}

/**
 * 関連セッション情報
 */
export interface RelatedSession {
  sessionId: string;
  sessionName: string;
  shortSummary: string;
  detailedSummary?: string;
  keyDecisions?: string[];
  filesModified?: string[];
  relevanceScore: number;
}

/**
 * クエリに関連するセッションを検索
 *
 * @param queryText - 検索クエリ
 * @param options - 検索オプション
 * @returns 関連セッションのリスト
 */
export async function findRelatedSessions(
  queryText: string,
  options: ContextOptions = {}
): Promise<RelatedSession[]> {
  const {
    maxSessions = DEFAULT_MAX_SESSIONS,
    minRelevanceScore = DEFAULT_MIN_RELEVANCE_SCORE,
  } = options;

  // Embedding 機能が利用不可の場合は空配列を返す
  if (!isEmbeddingAvailable()) {
    return [];
  }

  // クエリの Embedding を生成
  const embeddingResult = await generateQueryEmbedding(queryText);
  if (!embeddingResult) {
    return [];
  }

  // セマンティック検索を実行（フィルタリング用に多めに取得）
  const searchResults = searchSimilarSessions(
    embeddingResult.embedding,
    maxSessions * SEARCH_MULTIPLIER
  );

  // 距離をスコアに変換してフィルタ
  const filteredResults = searchResults
    .map((result) => ({
      ...result,
      relevanceScore: distanceToRelevanceScore(result.distance),
    }))
    .filter((result) => result.relevanceScore >= minRelevanceScore)
    .slice(0, maxSessions);

  if (filteredResults.length === 0) {
    return [];
  }

  // バッチ取得でN+1問題を回避
  const sessionIds = filteredResults.map((r) => r.sessionId);
  const summaryMap = getSummariesBySessionIds(sessionIds);

  return filteredResults.map((result) => {
    const summary = summaryMap.get(result.sessionId);
    return {
      sessionId: result.sessionId,
      sessionName: result.sessionName,
      shortSummary: result.shortSummary,
      detailedSummary: summary?.detailedSummary,
      keyDecisions: summary?.keyDecisions,
      filesModified: summary?.filesModified,
      relevanceScore: result.relevanceScore,
    };
  });
}

/**
 * 関連セッションからコンテキスト文字列を構築
 *
 * @param queryText - 元のクエリ
 * @param options - 構築オプション
 * @returns 構築されたコンテキスト
 */
export async function buildRelatedContext(
  queryText: string,
  options: ContextOptions = {}
): Promise<RelatedContext> {
  const { maxTokens = DEFAULT_MAX_TOKENS } = options;

  const sessions = await findRelatedSessions(queryText, options);

  if (sessions.length === 0) {
    return {
      sessions: [],
      contextText: "",
      estimatedTokens: 0,
      query: queryText,
    };
  }

  // コンテキスト文字列を構築
  let contextParts: string[] = [];
  let estimatedTokens = 0;

  // ヘッダー
  const header =
    "## 関連する過去のセッション\n\n以下は類似した作業の履歴です：\n";
  contextParts.push(header);
  estimatedTokens += estimateTokens(header);

  // 各セッションの情報を追加
  for (const session of sessions) {
    const sessionContext = formatSessionContext(session);
    const sessionTokens = estimateTokens(sessionContext);

    // トークン制限をチェック
    if (estimatedTokens + sessionTokens > maxTokens) {
      break;
    }

    contextParts.push(sessionContext);
    estimatedTokens += sessionTokens;
  }

  const contextText = contextParts.join("\n");

  return {
    sessions,
    contextText,
    estimatedTokens,
    query: queryText,
  };
}

/**
 * セッション情報をコンテキスト文字列にフォーマット
 */
function formatSessionContext(session: RelatedSession): string {
  const parts: string[] = [];

  // セッション名と要約
  parts.push(`### ${session.sessionName}`);
  parts.push(`関連度: ${Math.round(session.relevanceScore * 100)}%`);
  parts.push("");
  parts.push(session.detailedSummary || session.shortSummary);

  // 決定事項
  if (session.keyDecisions && session.keyDecisions.length > 0) {
    parts.push("");
    parts.push("**決定事項:**");
    for (const decision of session.keyDecisions.slice(
      0,
      MAX_DECISIONS_DISPLAY
    )) {
      parts.push(`- ${decision}`);
    }
  }

  // 変更ファイル
  if (session.filesModified && session.filesModified.length > 0) {
    parts.push("");
    parts.push("**関連ファイル:**");
    for (const file of session.filesModified.slice(0, MAX_FILES_DISPLAY)) {
      parts.push(`- \`${file}\``);
    }
  }

  parts.push("");
  parts.push("---");

  return parts.join("\n");
}

/**
 * テキストのトークン数を推定
 *
 * 簡易的な推定（日本語/英語混合対応）
 */
function estimateTokens(text: string): number {
  if (!text) return 0;

  const japaneseChars = text.match(/[\u3000-\u9fff]/g) || [];
  const otherChars = text.length - japaneseChars.length;

  const japaneseTokens = japaneseChars.length / JAPANESE_CHARS_PER_TOKEN;
  const otherTokens = otherChars / ENGLISH_CHARS_PER_TOKEN;

  return Math.ceil(japaneseTokens + otherTokens);
}

/**
 * コンテキスト注入が利用可能か確認
 */
export function isContextInjectionAvailable(): boolean {
  return isEmbeddingAvailable();
}
