/**
 * Session End Orchestrator のテスト
 *
 * セッション終了時の連鎖処理（要約→タイトル→Embedding→DB保存）を検証。
 * parseTranscriptContent を使用してファイルシステムに依存しないテストを行う。
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// モック対象モジュール
vi.mock("@anthropic-ai/claude-agent-sdk", () => ({
  query: vi.fn().mockImplementation(async function* () {
    yield {
      type: "assistant",
      message: {
        content: [
          {
            text: "SHORT_SUMMARY: テスト要約です。\nDETAILED_SUMMARY: これは詳細な要約です。テスト目的で生成されました。\nKEY_DECISIONS:\n- テスト用の決定事項",
          },
        ],
      },
    };
  }),
}));

// Embedding サービスをモック
const mockGenerateEmbedding = vi.fn().mockResolvedValue({
  embedding: new Array(384).fill(0.1),
  totalTokens: 100,
  provider: "local",
  dimension: 384,
});

vi.mock("./embeddings", () => ({
  generateEmbedding: mockGenerateEmbedding,
}));

// transcript-parser をモック
const mockParseTranscript = vi.fn();
const mockValidateTranscriptPath = vi.fn();

vi.mock("./transcript-parser", () => ({
  parseTranscript: mockParseTranscript,
  validateTranscriptPath: mockValidateTranscriptPath,
}));

// リポジトリをモック
const mockCreateSummary = vi.fn().mockReturnValue({
  summaryId: "sum-001",
  sessionId: "sess-001",
  shortSummary: "テスト要約",
  detailedSummary: "詳細な要約",
  keyDecisions: [],
  filesModified: [],
  toolsUsed: [],
  topics: [],
  originalTokenCount: 100,
  summaryTokenCount: 20,
  compressionRatio: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
});

vi.mock("../repositories/summary", () => ({
  createSummary: mockCreateSummary,
}));

const mockSaveEmbedding = vi.fn().mockReturnValue(1);

vi.mock("../repositories/embedding", () => ({
  saveEmbedding: mockSaveEmbedding,
}));

const mockGetSessionById = vi.fn().mockReturnValue({
  sessionId: "sess-001",
  name: "Test Session",
  status: "completed",
  workingDir: "/test",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockUpdateSession = vi.fn().mockReturnValue({
  sessionId: "sess-001",
  name: "Updated Session",
  status: "completed",
});

vi.mock("../repositories/session", () => ({
  getSessionById: mockGetSessionById,
  updateSession: mockUpdateSession,
}));

// テスト対象モジュール
import {
  processSessionEnd,
  type SessionEndInput,
} from "./session-end-orchestrator";

describe("Session End Orchestrator", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // デフォルトのモック設定
    mockGetSessionById.mockReturnValue({
      sessionId: "sess-001",
      name: "Test Session",
      status: "completed",
      workingDir: "/test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockValidateTranscriptPath.mockReturnValue({
      valid: true,
      resolvedPath: "/some/path.jsonl",
    });

    mockParseTranscript.mockReturnValue([
      {
        messageId: "msg-001",
        sessionId: "sess-001",
        type: "user",
        content: "テストメッセージ",
        compressed: false,
        timestamp: new Date(),
      },
      {
        messageId: "msg-002",
        sessionId: "sess-001",
        type: "assistant",
        content: "テスト応答",
        compressed: false,
        timestamp: new Date(),
      },
    ]);

    mockGenerateEmbedding.mockResolvedValue({
      embedding: new Array(384).fill(0.1),
      totalTokens: 100,
      provider: "local",
      dimension: 384,
    });
  });

  describe("processSessionEnd", () => {
    it("トランスクリプトから連鎖処理を実行できる", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      // 全ステップが成功
      expect(result.success).toBe(true);
      expect(result.steps.transcriptParsed).toBe(true);
      expect(result.steps.summaryGenerated).toBe(true);
      expect(result.steps.titleGenerated).toBe(true);
      expect(result.steps.embeddingGenerated).toBe(true);
      expect(result.steps.dbSaved).toBe(true);
    });

    it("存在しないセッションでエラーを返す", async () => {
      mockGetSessionById.mockReturnValueOnce(null);

      const input: SessionEndInput = {
        sessionId: "nonexistent",
        transcriptPath: "/some/path.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.success).toBe(false);
      expect(result.errors).toContain("Session not found");
    });

    it("トランスクリプトがない場合もセッションは正常終了", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "",
      };

      const result = await processSessionEnd(input);

      // トランスクリプトがなくても成功
      expect(result.success).toBe(true);
      expect(result.steps.transcriptParsed).toBe(false);
    });

    it("空のトランスクリプトでも正常終了", async () => {
      mockParseTranscript.mockReturnValue([]);

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/empty.jsonl",
      };

      const result = await processSessionEnd(input);

      // メッセージがないため要約生成はスキップ
      expect(result.success).toBe(true);
      expect(result.steps.transcriptParsed).toBe(false);
      expect(result.steps.summaryGenerated).toBe(false);
    });

    it("DB保存が実行される", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      await processSessionEnd(input);

      // DB保存が呼び出されたことを確認
      expect(mockCreateSummary).toHaveBeenCalled();
      expect(mockSaveEmbedding).toHaveBeenCalled();
      expect(mockUpdateSession).toHaveBeenCalled();
    });

    it("Embedding が生成される", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.steps.embeddingGenerated).toBe(true);
      expect(mockGenerateEmbedding).toHaveBeenCalled();
    });

    it("生成されたタイトルが結果に含まれる", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.generatedTitle).toBeDefined();
      expect(result.generatedTitle!.length).toBeGreaterThan(0);
    });

    it("要約IDが結果に含まれる", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.summaryId).toBe("sum-001");
    });

    it("cwdがオプションで渡せる", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
        cwd: "/some/working/dir",
      };

      const result = await processSessionEnd(input);

      // cwd があってもエラーにならない
      expect(result.success).toBe(true);
    });

    it("トランスクリプト検証が失敗した場合エラーを記録する", async () => {
      mockValidateTranscriptPath.mockReturnValue({
        valid: false,
        error: "Invalid path",
      });

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/invalid/path.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain("Transcript validation failed");
    });
  });

  describe("グレースフルデグラデーション", () => {
    it("Embedding生成が失敗しても処理は続行する", async () => {
      mockGenerateEmbedding.mockResolvedValueOnce(null);

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      // Embedding生成は失敗したが全体は成功
      expect(result.steps.embeddingGenerated).toBe(false);
      expect(result.steps.dbSaved).toBe(true);
      expect(result.success).toBe(true);
    });

    it("Embedding生成でエラーが発生しても処理は続行する", async () => {
      mockGenerateEmbedding.mockRejectedValueOnce(
        new Error("Embedding service unavailable")
      );

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      // エラーは記録されるが処理は続行
      expect(result.errors.some((e) => e.includes("Embedding"))).toBe(true);
      expect(result.steps.dbSaved).toBe(true);
    });

    it("DB保存が失敗した場合はエラーを記録する", async () => {
      mockCreateSummary.mockImplementationOnce(() => {
        throw new Error("Database connection failed");
      });

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.errors.some((e) => e.includes("DB save failed"))).toBe(
        true
      );
      expect(result.steps.dbSaved).toBe(false);
    });
  });

  describe("結果の検証", () => {
    it("成功時にembeddingIdが設定される", async () => {
      mockSaveEmbedding.mockReturnValue(42);

      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      const result = await processSessionEnd(input);

      expect(result.embeddingId).toBe(42);
    });

    it("セッション名が更新される", async () => {
      const input: SessionEndInput = {
        sessionId: "sess-001",
        transcriptPath: "/test/transcript.jsonl",
      };

      await processSessionEnd(input);

      expect(mockUpdateSession).toHaveBeenCalledWith(
        "sess-001",
        expect.objectContaining({ name: expect.any(String) })
      );
    });
  });
});
