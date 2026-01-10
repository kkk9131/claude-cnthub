/**
 * Session Classifier Service
 *
 * セッションの重要度・カテゴリ判定と失敗検出を行う。
 * 要約生成後に呼び出され、セッションに分類情報を設定する。
 *
 * 呼び出し箇所:
 * - session-end-orchestrator.ts: セッション終了時
 * - observations.ts: Export / Smart Export 時
 */

import type { Message } from "@claude-cnthub/shared";
import { extractMetadata, classifySession } from "./summarizer";
import { detectIssues } from "./observation-analyzer";
import { listObservations } from "../repositories/observation";
import { updateSessionClassification } from "../repositories/session";
import { hookLogger as log } from "../utils/logger";

/**
 * 分類結果
 */
export interface ClassificationResult {
  /** 重要度 */
  importance: string;
  /** カテゴリ */
  category: string;
  /** 問題があるか */
  hasIssues: boolean;
  /** 問題タイプ */
  issueType?: string;
}

/**
 * セッションを分類し、DBに保存する
 *
 * @param sessionId - セッションID
 * @param messages - メッセージ配列（重要度・カテゴリ判定用）
 * @param context - ログ用コンテキスト名
 * @returns 分類結果（失敗時は null）
 */
export function classifyAndSaveSession(
  sessionId: string,
  messages: Message[],
  context: string = "session"
): ClassificationResult | null {
  try {
    // 1. メタデータ抽出と分類判定
    const metadata = extractMetadata(messages);
    const classification = classifySession(messages, metadata);

    // 2. 観測記録から失敗パターンを検出
    const observations = listObservations({ sessionId, limit: 100 });
    const issueResult = detectIssues(observations.items);

    // 3. DBに保存
    updateSessionClassification(sessionId, {
      importance: classification.importance,
      category: classification.category,
      hasIssues: issueResult.hasIssues,
      issueType: issueResult.issueType,
    });

    const result: ClassificationResult = {
      importance: classification.importance,
      category: classification.category,
      hasIssues: issueResult.hasIssues,
      issueType: issueResult.issueType,
    };

    log.info(`${context} classification updated`, {
      sessionId,
      ...result,
    });

    return result;
  } catch (error) {
    log.warn(`${context} classification failed`, {
      sessionId,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}
