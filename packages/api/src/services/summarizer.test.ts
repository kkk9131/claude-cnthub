/**
 * AI要約サービスのテスト
 *
 * TDD Red: まずテストを書いて失敗することを確認
 * セッションメッセージからAI要約を生成する機能を検証
 */

import { describe, it, expect, vi } from "vitest";
import type { Message } from "@claude-cnthub/shared";

// モック対象: Claude Agent SDK
// query() は async generator として実装
vi.mock("@anthropic-ai/claude-agent-sdk", () => ({
  query: vi.fn().mockImplementation(async function* () {
    yield {
      type: "assistant",
      message: {
        content: [
          {
            text: "SHORT_SUMMARY: JWT認証機能を実装しました。\nDETAILED_SUMMARY: ユーザーの要求に基づきJWT認証機能を実装。authミドルウェアを作成し、トークン有効期限を24時間に設定しました。\nKEY_DECISIONS:\n- トークンの有効期限は24時間に設定",
          },
        ],
      },
    };
  }),
}));

// テスト対象モジュール
import {
  generateSummary,
  extractMetadata,
  calculateTokenCount,
  type SummaryGenerationOptions,
} from "./summarizer";

// テスト用メッセージデータ（全テストで共有）
const createMockMessages = (): Message[] => [
  {
    messageId: "msg-1",
    sessionId: "sess-1",
    type: "user",
    content: "認証機能を実装してください",
    compressed: false,
    timestamp: new Date("2024-12-28T10:00:00Z"),
  },
  {
    messageId: "msg-2",
    sessionId: "sess-1",
    type: "assistant",
    content:
      "JWT認証を実装します。まず依存関係をインストールして、authミドルウェアを作成します。",
    compressed: false,
    timestamp: new Date("2024-12-28T10:01:00Z"),
  },
  {
    messageId: "msg-3",
    sessionId: "sess-1",
    type: "tool_use",
    content: JSON.stringify({
      tool: "Write",
      input: { file_path: "src/middleware/auth.ts" },
    }),
    compressed: false,
    timestamp: new Date("2024-12-28T10:02:00Z"),
  },
  {
    messageId: "msg-4",
    sessionId: "sess-1",
    type: "assistant",
    content:
      "認証ミドルウェアを作成しました。トークンの有効期限は24時間に設定しました。",
    compressed: false,
    timestamp: new Date("2024-12-28T10:03:00Z"),
  },
];

describe("Summarizer Service", () => {
  describe("generateSummary", () => {
    it("メッセージ配列から要約を生成できる", async () => {
      const mockMessages = createMockMessages();
      const summary = await generateSummary("sess-1", mockMessages);

      // 戻り値の型を検証
      expect(summary).toBeDefined();
      expect(summary.sessionId).toBe("sess-1");
      expect(typeof summary.shortSummary).toBe("string");
      expect(typeof summary.detailedSummary).toBe("string");
      expect(summary.shortSummary.length).toBeGreaterThan(0);
      expect(summary.detailedSummary.length).toBeGreaterThan(0);
    });

    it("空のメッセージ配列でエラーにならない", async () => {
      const summary = await generateSummary("sess-1", []);

      expect(summary.shortSummary).toBe("");
      expect(summary.detailedSummary).toBe("");
    });

    it("オプションでmaxTurnsを指定できる", async () => {
      const mockMessages = createMockMessages();
      const options: SummaryGenerationOptions = {
        maxTurns: 2,
      };

      const summary = await generateSummary("sess-1", mockMessages, options);
      expect(summary).toBeDefined();
    });

    it("トークン数が計算される", async () => {
      const mockMessages = createMockMessages();
      const summary = await generateSummary("sess-1", mockMessages);

      expect(summary.originalTokenCount).toBeGreaterThan(0);
      expect(summary.summaryTokenCount).toBeGreaterThan(0);
    });
  });

  describe("extractMetadata", () => {
    it("使用されたツールを抽出できる", () => {
      const mockMessages = createMockMessages();
      const metadata = extractMetadata(mockMessages);

      expect(metadata.toolsUsed).toContain("Write");
    });

    it("変更されたファイルを抽出できる", () => {
      const mockMessages = createMockMessages();
      const metadata = extractMetadata(mockMessages);

      expect(metadata.filesModified).toContain("src/middleware/auth.ts");
    });

    it("空のメッセージから空のメタデータを返す", () => {
      const metadata = extractMetadata([]);

      expect(metadata.toolsUsed).toEqual([]);
      expect(metadata.filesModified).toEqual([]);
    });

    it("決定事項を抽出できる", () => {
      const mockMessages = createMockMessages();
      const metadata = extractMetadata(mockMessages);

      // 「〜に設定しました」パターンを検出
      expect(metadata.keyDecisions.length).toBeGreaterThan(0);
    });
  });

  describe("calculateTokenCount", () => {
    it("文字列のトークン数を概算できる", () => {
      const text = "Hello, world! This is a test.";
      const count = calculateTokenCount(text);

      // トークン数は文字数の約1/4程度（英語の場合）
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(text.length);
    });

    it("日本語テキストのトークン数を計算できる", () => {
      const text = "認証機能を実装してください";
      const count = calculateTokenCount(text);

      // 日本語は1文字≒1-2トークン
      expect(count).toBeGreaterThan(0);
    });

    it("空文字列は0を返す", () => {
      expect(calculateTokenCount("")).toBe(0);
    });
  });
});

describe("API Response Parsing", () => {
  it("要約レスポンスの形式が正しい", async () => {
    const mockMessages = createMockMessages();
    const summary = await generateSummary("sess-1", mockMessages);

    // 要約が存在し、適切な長さがある
    expect(summary.shortSummary.length).toBeGreaterThan(0);
    expect(summary.detailedSummary.length).toBeGreaterThan(0);
  });

  it("メタデータが含まれる", async () => {
    const mockMessages = createMockMessages();
    const summary = await generateSummary("sess-1", mockMessages);

    // メッセージから抽出されたメタデータ
    expect(summary.filesModified).toContain("src/middleware/auth.ts");
    expect(summary.toolsUsed).toContain("Write");
  });
});
