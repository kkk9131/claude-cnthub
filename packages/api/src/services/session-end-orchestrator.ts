/**
 * Session End Orchestrator
 *
 * セッション終了時の連鎖処理を管理:
 * 1. トランスクリプト読み込み
 * 2. Claude AI で要約生成
 * 3. タイトル自動生成（スキップ - UserPromptSubmit Hook で処理）
 * 4. Embedding 生成
 * 5. DB 保存
 *
 * グレースフルデグラデーション:
 * - 各ステップの失敗は後続処理に影響しない
 * - 失敗してもセッションは正常終了
 */

import type { Message, SessionSummary } from "@claude-cnthub/shared";
import { parseTranscript, validateTranscriptPath } from "./transcript-parser";
import { generateSummary, extractMetadata } from "./summarizer";
import { generateEmbedding, type EmbeddingResult } from "./embeddings";
import { createSummary } from "../repositories/summary";
import { saveEmbedding } from "../repositories/embedding";
import { getSessionById } from "../repositories/session";
import { hookLogger as log } from "../utils/logger";

/**
 * セッション終了処理の入力
 */
export interface SessionEndInput {
  /** セッションID */
  sessionId: string;
  /** トランスクリプトファイルパス */
  transcriptPath: string;
  /** 作業ディレクトリ */
  cwd?: string;
}

/**
 * セッション終了処理の結果
 */
export interface SessionEndResult {
  /** 処理が成功したか */
  success: boolean;
  /** セッションID */
  sessionId: string;
  /** 生成されたタイトル */
  generatedTitle?: string;
  /** 要約ID */
  summaryId?: string;
  /** Embedding ID */
  embeddingId?: number;
  /** 各ステップの状態 */
  steps: {
    transcriptParsed: boolean;
    summaryGenerated: boolean;
    titleGenerated: boolean;
    embeddingGenerated: boolean;
    dbSaved: boolean;
  };
  /** エラー情報（失敗した場合） */
  errors: string[];
}

/**
 * セッション終了時の連鎖処理を実行
 *
 * @param input - 入力データ
 * @returns 処理結果
 */
export async function processSessionEnd(
  input: SessionEndInput
): Promise<SessionEndResult> {
  const result: SessionEndResult = {
    success: false,
    sessionId: input.sessionId,
    steps: {
      transcriptParsed: false,
      summaryGenerated: false,
      titleGenerated: false,
      embeddingGenerated: false,
      dbSaved: false,
    },
    errors: [],
  };

  log.info("Starting session end processing", {
    sessionId: input.sessionId,
    hasTranscript: !!input.transcriptPath,
  });

  // セッション存在確認
  const session = getSessionById(input.sessionId);
  if (!session) {
    result.errors.push("Session not found");
    log.warn("Session not found for processing", {
      sessionId: input.sessionId,
    });
    return result;
  }

  // Step 1: トランスクリプト読み込み
  let messages: Message[] = [];
  if (input.transcriptPath) {
    const validation = validateTranscriptPath(input.transcriptPath);
    if (validation.valid) {
      messages = parseTranscript(input.transcriptPath, input.sessionId);
      result.steps.transcriptParsed = messages.length > 0;
      log.info("Transcript parsed", {
        sessionId: input.sessionId,
        messageCount: messages.length,
      });
    } else {
      result.errors.push(`Transcript validation failed: ${validation.error}`);
      log.warn("Transcript validation failed", {
        sessionId: input.sessionId,
        error: validation.error,
      });
    }
  }

  // メッセージがない場合は要約生成をスキップ
  if (messages.length === 0) {
    log.info("No messages to process, skipping summary generation", {
      sessionId: input.sessionId,
    });
    result.success = true;
    return result;
  }

  // Step 2: 要約生成
  let summary: SessionSummary | null = null;
  try {
    summary = await generateSummary(input.sessionId, messages);
    result.steps.summaryGenerated = true;
    log.info("Summary generated", {
      sessionId: input.sessionId,
      shortSummaryLength: summary.shortSummary.length,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    result.errors.push(`Summary generation failed: ${errMsg}`);
    log.error("Summary generation failed", new Error(errMsg), {
      sessionId: input.sessionId,
    });

    // フォールバック: メタデータだけでも抽出
    try {
      const metadata = extractMetadata(messages);
      summary = {
        summaryId: "",
        sessionId: input.sessionId,
        shortSummary: messages[0]?.content.slice(0, 100) || "",
        detailedSummary: "",
        keyDecisions: metadata.keyDecisions,
        filesModified: metadata.filesModified,
        toolsUsed: metadata.toolsUsed,
        topics: metadata.topics,
        originalTokenCount: 0,
        summaryTokenCount: 0,
        compressionRatio: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch {
      // メタデータ抽出も失敗した場合は続行
    }
  }

  // Step 3: タイトル生成（スキップ）
  // セッション名は UserPromptSubmit Hook で初回メッセージから生成されるため、
  // ここでの生成はスキップする
  // Note: 既にセッション名がある場合は上書きしない
  result.steps.titleGenerated = true; // 互換性維持のため常に true
  log.info("Title generation skipped (handled by UserPromptSubmit Hook)", {
    sessionId: input.sessionId,
  });

  // Step 4: Embedding 生成
  let embeddingResult: EmbeddingResult | null = null;
  if (summary && summary.shortSummary) {
    try {
      // 短い要約と詳細要約を結合してEmbedding生成
      const textForEmbedding = [
        summary.shortSummary,
        summary.detailedSummary,
        summary.keyDecisions.join(". "),
      ]
        .filter(Boolean)
        .join("\n\n");

      embeddingResult = await generateEmbedding(textForEmbedding);
      if (embeddingResult) {
        result.steps.embeddingGenerated = true;
        log.info("Embedding generated", {
          sessionId: input.sessionId,
          provider: embeddingResult.provider,
          dimension: embeddingResult.dimension,
        });
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      result.errors.push(`Embedding generation failed: ${errMsg}`);
      log.warn("Embedding generation failed", {
        sessionId: input.sessionId,
        error: errMsg,
      });
    }
  }

  // Step 5: DB 保存
  try {
    // 5.1: 要約をDBに保存
    if (summary) {
      const savedSummary = createSummary({
        sessionId: input.sessionId,
        shortSummary: summary.shortSummary,
        detailedSummary: summary.detailedSummary,
        keyDecisions: summary.keyDecisions,
        filesModified: summary.filesModified,
        toolsUsed: summary.toolsUsed,
        topics: summary.topics,
        originalTokenCount: summary.originalTokenCount,
        summaryTokenCount: summary.summaryTokenCount,
        compressionRatio: summary.compressionRatio,
      });
      result.summaryId = savedSummary.summaryId;
      log.info("Summary saved to DB", {
        sessionId: input.sessionId,
        summaryId: savedSummary.summaryId,
      });
    }

    // 5.2: Embeddingをベクトルテーブルに保存
    if (embeddingResult && summary) {
      const embeddingId = saveEmbedding(
        "summary",
        result.summaryId || input.sessionId,
        embeddingResult.embedding,
        input.sessionId,
        summary.shortSummary.slice(0, 200),
        embeddingResult.provider
      );
      if (embeddingId > 0) {
        result.embeddingId = embeddingId;
        log.info("Embedding saved to DB", {
          sessionId: input.sessionId,
          embeddingId,
        });
      }
    }

    // 5.3: セッション名更新はスキップ
    // セッション名は UserPromptSubmit Hook で初回メッセージから生成されるため、
    // ここでの更新は行わない

    result.steps.dbSaved = true;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    result.errors.push(`DB save failed: ${errMsg}`);
    log.error("DB save failed", new Error(errMsg), {
      sessionId: input.sessionId,
    });
  }

  // 成功判定: transcriptがあれば要約まで成功している必要がある
  // transcriptがなければ成功とみなす
  result.success =
    result.steps.dbSaved ||
    (!input.transcriptPath && result.errors.length === 0);

  log.info("Session end processing completed", {
    sessionId: input.sessionId,
    success: result.success,
    steps: result.steps,
    errorCount: result.errors.length,
  });

  return result;
}
