/**
 * M-03: AI マージ要約生成サービス テスト
 *
 * 複数セッションの要約をAIで統合するサービスのテスト。
 * グレースフルデグラデーション対応。
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { closeDatabase, runMigrations, execute } from "../db";
import { generateId, now } from "../repositories/base";
import {
  generateMergeSummary,
  buildMergePrompt,
  parseMergeResponse,
  createFallbackMergeSummary,
  type MergeSummaryResult,
} from "./merge-summarizer";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

/**
 * テスト用のセッションを作成
 */
function createTestSession(name: string): string {
  const sessionId = generateId("ses");
  const timestamp = now();

  execute(
    `INSERT INTO sessions (session_id, name, status, working_dir, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    sessionId,
    name,
    "completed",
    "/test/working/dir",
    timestamp,
    timestamp
  );

  return sessionId;
}

/**
 * テスト用の要約を作成
 */
function createTestSummary(
  sessionId: string,
  shortSummary: string,
  detailedSummary: string,
  topics: string[] = [],
  keyDecisions: string[] = []
): string {
  const summaryId = generateId("sum");
  const timestamp = now();

  execute(
    `INSERT INTO summaries (
      summary_id, session_id, short_summary, detailed_summary,
      key_decisions, files_modified, tools_used, topics,
      original_token_count, summary_token_count, compression_ratio,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    summaryId,
    sessionId,
    shortSummary,
    detailedSummary,
    JSON.stringify(keyDecisions),
    JSON.stringify([]),
    JSON.stringify([]),
    JSON.stringify(topics),
    1000,
    100,
    0.1,
    timestamp,
    timestamp
  );

  return summaryId;
}

describe("Merge Summarizer Service (M-03)", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    execute("DELETE FROM summaries");
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  describe("generateMergeSummary", () => {
    it("空のセッションIDリストでエラーを返す", async () => {
      const result = await generateMergeSummary([]);

      expect(result.success).toBe(false);
      expect(result.error).toBe("No session IDs provided");
    });

    it("1つのセッションIDでもマージ要約を生成できる", async () => {
      const sessionId = createTestSession("Single Session");
      createTestSummary(
        sessionId,
        "単一セッションの要約",
        "これは単一セッションの詳細な要約です。",
        ["topic1"],
        ["decision1"]
      );

      const result = await generateMergeSummary([sessionId]);

      expect(result.success).toBe(true);
      expect(result.shortSummary).toBeDefined();
      expect(result.detailedSummary).toBeDefined();
    });

    it("複数セッションの要約を統合できる（フォールバック）", async () => {
      const session1 = createTestSession("Session 1");
      const session2 = createTestSession("Session 2");

      createTestSummary(
        session1,
        "認証機能を実装",
        "JWTベースの認証システムを実装しました。",
        ["auth", "jwt"],
        ["JWTを採用"]
      );
      createTestSummary(
        session2,
        "APIエンドポイント追加",
        "RESTful APIエンドポイントを追加しました。",
        ["api", "rest"],
        ["REST形式を採用"]
      );

      const result = await generateMergeSummary([session1, session2]);

      expect(result.success).toBe(true);
      expect(result.shortSummary).toBeDefined();
      expect(result.detailedSummary).toBeDefined();
      expect(result.topics).toBeDefined();
      expect(result.keyDecisions).toBeDefined();
    });

    it("要約が存在しないセッションは無視する", async () => {
      const session1 = createTestSession("Session with summary");
      const session2 = createTestSession("Session without summary");

      createTestSummary(
        session1,
        "要約あり",
        "詳細な要約内容",
        ["topic"],
        ["decision"]
      );

      const result = await generateMergeSummary([session1, session2]);

      expect(result.success).toBe(true);
    });

    it("存在しないセッションIDはスキップする", async () => {
      const session1 = createTestSession("Valid Session");
      createTestSummary(session1, "要約", "詳細", [], []);

      const result = await generateMergeSummary([
        session1,
        "nonexistent_session",
      ]);

      expect(result.success).toBe(true);
    });
  });

  describe("buildMergePrompt", () => {
    it("複数の要約からプロンプトを構築する", () => {
      const summaries = [
        {
          sessionId: "ses_1",
          shortSummary: "認証実装",
          detailedSummary: "JWTベースの認証",
          topics: ["auth"],
          keyDecisions: ["JWT採用"],
        },
        {
          sessionId: "ses_2",
          shortSummary: "API追加",
          detailedSummary: "REST API実装",
          topics: ["api"],
          keyDecisions: ["REST採用"],
        },
      ];

      const prompt = buildMergePrompt(summaries);

      expect(prompt).toContain("認証実装");
      expect(prompt).toContain("API追加");
      expect(prompt).toContain("SHORT_SUMMARY");
      expect(prompt).toContain("DETAILED_SUMMARY");
    });

    it("空の要約配列でも有効なプロンプトを返す", () => {
      const prompt = buildMergePrompt([]);

      expect(prompt).toContain("SHORT_SUMMARY");
      expect(prompt).toContain("DETAILED_SUMMARY");
    });
  });

  describe("parseMergeResponse", () => {
    it("正しい形式のレスポンスをパースする", () => {
      const response = `SHORT_SUMMARY: 統合された要約
DETAILED_SUMMARY: 複数のセッションの内容を統合しました。
KEY_DECISIONS:
- JWT認証を採用
- REST APIを実装
TOPICS: auth, api, backend`;

      const result = parseMergeResponse(response);

      expect(result.shortSummary).toBe("統合された要約");
      expect(result.detailedSummary).toContain("複数のセッション");
      expect(result.keyDecisions).toContain("JWT認証を採用");
      expect(result.topics).toContain("auth");
    });

    it("不完全なレスポンスでもパースできる", () => {
      const response = `SHORT_SUMMARY: 要約のみ`;

      const result = parseMergeResponse(response);

      expect(result.shortSummary).toBe("要約のみ");
      expect(result.detailedSummary).toBe("");
    });

    it("空のレスポンスでもエラーにならない", () => {
      const result = parseMergeResponse("");

      expect(result.shortSummary).toBe("");
      expect(result.detailedSummary).toBe("");
      expect(result.keyDecisions).toEqual([]);
      expect(result.topics).toEqual([]);
    });
  });

  describe("createFallbackMergeSummary", () => {
    it("フォールバック要約を作成する", () => {
      const summaries = [
        {
          sessionId: "ses_1",
          shortSummary: "要約1",
          detailedSummary: "詳細1",
          topics: ["topic1"],
          keyDecisions: ["decision1"],
        },
        {
          sessionId: "ses_2",
          shortSummary: "要約2",
          detailedSummary: "詳細2",
          topics: ["topic2"],
          keyDecisions: ["decision2"],
        },
      ];

      const result = createFallbackMergeSummary(summaries);

      expect(result.success).toBe(true);
      expect(result.shortSummary).toContain("要約1");
      expect(result.shortSummary).toContain("要約2");
      expect(result.topics).toContain("topic1");
      expect(result.topics).toContain("topic2");
      expect(result.keyDecisions).toContain("decision1");
      expect(result.keyDecisions).toContain("decision2");
    });

    it("空の要約配列でもエラーにならない", () => {
      const result = createFallbackMergeSummary([]);

      expect(result.success).toBe(true);
      expect(result.shortSummary).toBe("");
      expect(result.detailedSummary).toBe("");
    });
  });
});
