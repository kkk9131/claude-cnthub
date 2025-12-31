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

  describe("境界値テスト", () => {
    describe("マルチバイト文字", () => {
      it("絵文字を含む要約を正しく処理する", async () => {
        const sessionId = createTestSession("Emoji Session 🎉");
        createTestSummary(
          sessionId,
          "🚀 新機能リリース 🎯",
          "✅ 完了 ❌ 失敗 ⚠️ 警告を表示する機能",
          ["emoji🔥", "feature✨"],
          ["絵文字対応を決定 👍"]
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary).toBe("🚀 新機能リリース 🎯");
        expect(result.topics).toContain("emoji🔥");
      });

      it("日本語・中国語・韓国語を含む要約を処理する", async () => {
        const sessionId = createTestSession("CJK Session");
        createTestSummary(
          sessionId,
          "日本語テスト 中文测试 한국어테스트",
          "詳細：これは日本語、中文、한국어の混在テストです",
          ["日本語", "中文", "한국어"],
          ["多言語対応を決定"]
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary).toContain("日本語");
        expect(result.shortSummary).toContain("中文");
        expect(result.shortSummary).toContain("한국어");
      });

      it("parseMergeResponseが絵文字を含むレスポンスをパースする", () => {
        const response = `SHORT_SUMMARY: 🎉 成功！
DETAILED_SUMMARY: ✅ 全機能実装完了 🚀
KEY_DECISIONS:
- 絵文字サポート追加 👍
TOPICS: feature✨, emoji🔥`;

        const result = parseMergeResponse(response);

        expect(result.shortSummary).toBe("🎉 成功！");
        expect(result.keyDecisions).toContain("絵文字サポート追加 👍");
        expect(result.topics).toContain("feature✨");
      });
    });

    describe("特殊文字", () => {
      it("引用符とエスケープ文字を含む要約を処理する", async () => {
        const sessionId = createTestSession("Quote Session");
        createTestSummary(
          sessionId,
          "テスト \"引用\" と 'シングル' クォート",
          "バックスラッシュ \\ と タブ\t改行\n含む",
          ['quote"test', "escape\\char"],
          ['決定: "重要"']
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary).toContain('"引用"');
      });

      it("HTMLタグ風の文字列を処理する", async () => {
        const sessionId = createTestSession("HTML Session");
        createTestSummary(
          sessionId,
          "<script>alert('xss')</script>タグテスト",
          "詳細: <div>content</div> & <br/>",
          ["<tag>", "html&entity"],
          ["XSS対策を決定"]
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary).toContain("<script>");
      });

      it("SQLインジェクション風の文字列を安全に処理する", async () => {
        const sessionId = createTestSession("SQL Session");
        createTestSummary(
          sessionId,
          "'; DROP TABLE sessions; --",
          "詳細: OR 1=1; DELETE FROM *",
          ["sql'injection", "test"],
          ["セキュリティ対策"]
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary).toContain("DROP TABLE");
      });

      it("改行・タブを含むレスポンスをパースする", () => {
        const response = `SHORT_SUMMARY: 行1
行2
行3
DETAILED_SUMMARY: 詳細
複数行
にわたる
KEY_DECISIONS:
- 決定1
- 決定2
TOPICS: topic1, topic2`;

        const result = parseMergeResponse(response);

        expect(result.shortSummary).toContain("行1");
        expect(result.detailedSummary).toContain("複数行");
        expect(result.keyDecisions.length).toBeGreaterThanOrEqual(2);
      });
    });

    describe("大量データ", () => {
      it("10セッションの要約をマージする", async () => {
        const sessionIds: string[] = [];

        for (let i = 0; i < 10; i++) {
          const sessionId = createTestSession(`Session ${i}`);
          createTestSummary(
            sessionId,
            `要約${i}`,
            `詳細説明${i}`,
            [`topic${i}`],
            [`decision${i}`]
          );
          sessionIds.push(sessionId);
        }

        const result = await generateMergeSummary(sessionIds);

        expect(result.success).toBe(true);
        expect(result.topics?.length).toBe(10);
        expect(result.keyDecisions?.length).toBe(10);
      });

      it("長い文字列（10000文字）を含む要約を処理する", async () => {
        const longText = "あ".repeat(10000);
        const sessionId = createTestSession("Long Session");
        createTestSummary(sessionId, longText, longText, ["long"], ["long"]);

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.shortSummary?.length).toBe(10000);
      });

      it("重複トピックは1つにまとめられる", async () => {
        const session1 = createTestSession("Dup Session 1");
        const session2 = createTestSession("Dup Session 2");

        createTestSummary(
          session1,
          "要約1",
          "詳細1",
          ["common", "unique1"],
          ["common-decision"]
        );
        createTestSummary(
          session2,
          "要約2",
          "詳細2",
          ["common", "unique2"],
          ["common-decision"]
        );

        const result = await generateMergeSummary([session1, session2]);

        expect(result.success).toBe(true);
        // 重複排除されて3つ（common, unique1, unique2）
        expect(result.topics?.filter((t) => t === "common").length).toBe(1);
        expect(result.topics?.length).toBe(3);
      });
    });

    describe("不正なJSONデータ", () => {
      it("不正なJSON形式のtopicsでもエラーにならない", async () => {
        const sessionId = createTestSession("Invalid JSON Session");
        const timestamp = now();

        // 直接DBに不正なJSONを挿入
        execute(
          `INSERT INTO summaries (
            summary_id, session_id, short_summary, detailed_summary,
            key_decisions, files_modified, tools_used, topics,
            original_token_count, summary_token_count, compression_ratio,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          generateId("sum"),
          sessionId,
          "要約",
          "詳細",
          '["valid"]',
          "[]",
          "[]",
          "not valid json {{{",
          1000,
          100,
          0.1,
          timestamp,
          timestamp
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.topics).toEqual([]);
      });

      it("空文字のtopics/keyDecisionsを処理する", async () => {
        const sessionId = createTestSession("Empty JSON Session");
        const timestamp = now();

        // 空文字列をDBに挿入（nullではなく空文字）
        execute(
          `INSERT INTO summaries (
            summary_id, session_id, short_summary, detailed_summary,
            key_decisions, files_modified, tools_used, topics,
            original_token_count, summary_token_count, compression_ratio,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          generateId("sum"),
          sessionId,
          "要約",
          "詳細",
          "", // 空文字
          "[]",
          "[]",
          "", // 空文字
          1000,
          100,
          0.1,
          timestamp,
          timestamp
        );

        const result = await generateMergeSummary([sessionId]);

        expect(result.success).toBe(true);
        expect(result.topics).toEqual([]);
        expect(result.keyDecisions).toEqual([]);
      });
    });

    describe("エラーケース", () => {
      it("全てのセッションに要約がない場合はエラーを返す", async () => {
        const session1 = createTestSession("No Summary 1");
        const session2 = createTestSession("No Summary 2");

        const result = await generateMergeSummary([session1, session2]);

        expect(result.success).toBe(false);
        expect(result.error).toBe(
          "No summaries found for the provided session IDs"
        );
      });
    });
  });
});
