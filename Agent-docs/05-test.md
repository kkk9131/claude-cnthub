# テスト設計

## 概要

| 項目                     | 内容               |
| ------------------------ | ------------------ |
| **テストフレームワーク** | Vitest（Bun 互換） |
| **E2E テスト**           | Playwright         |
| **カバレッジ目標**       | 80% 以上           |

---

## テスト戦略

### テストピラミッド

```
        ┌───────────┐
        │   E2E     │  少数・重要フロー
        ├───────────┤
        │Integration│  API・DB 統合
        ├───────────┤
        │   Unit    │  多数・高速
        └───────────┘
```

| レイヤー    | 対象                     | 割合 |
| ----------- | ------------------------ | ---- |
| Unit        | サービス、ユーティリティ | 60%  |
| Integration | API ルート、DB 操作      | 30%  |
| E2E         | クリティカルパス         | 10%  |

---

## Unit テスト

### 対象サービス

#### SessionSummarizer

```typescript
// packages/api/src/services/__tests__/SessionSummarizer.test.ts

describe("SessionSummarizer", () => {
  describe("summarizeSession", () => {
    it("should generate summary from messages", async () => {
      // Arrange
      const messages = [
        { type: "user", content: "ログイン機能を実装して" },
        { type: "assistant", content: "JWT を使って実装します..." },
      ];

      // Act
      const summary = await summarizer.summarizeSession("sess_123");

      // Assert
      expect(summary.shortSummary).toBeDefined();
      expect(summary.detailedSummary).toBeDefined();
      expect(summary.compressionRatio).toBeGreaterThan(1);
    });

    it("should extract key decisions", async () => {
      // 決定事項の抽出を検証
    });

    it("should extract modified files", async () => {
      // 変更ファイルの抽出を検証
    });

    it("should handle empty session gracefully", async () => {
      // 空のセッションでエラーにならないことを検証
    });
  });
});
```

#### VectorSearchService

```typescript
// packages/api/src/services/__tests__/VectorSearchService.test.ts

describe("VectorSearchService", () => {
  describe("semanticSearch", () => {
    it("should return relevant results for query", async () => {
      // Arrange
      await indexTestData();

      // Act
      const results = await searchService.semanticSearch("認証");

      // Assert
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].relevanceScore).toBeGreaterThan(0.7);
    });

    it("should respect limit parameter", async () => {
      const results = await searchService.semanticSearch("test", 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should return empty array for no matches", async () => {
      const results = await searchService.semanticSearch("xyznonexistent");
      expect(results).toEqual([]);
    });
  });

  describe("generateEmbedding", () => {
    it("should generate 384-dim vector", async () => {
      const embedding = await searchService.generateEmbedding("test text");
      expect(embedding).toHaveLength(384);
    });
  });
});
```

#### ContextInjectionService

```typescript
// packages/api/src/services/__tests__/ContextInjectionService.test.ts

describe("ContextInjectionService", () => {
  describe("buildContext", () => {
    it("should include relevant summaries", async () => {
      const context = await contextService.buildContext("認証を実装");
      expect(context.relevantSummaries.length).toBeGreaterThan(0);
    });

    it("should respect token limit", async () => {
      const context = await contextService.buildContext("test", {
        maxTokens: 800,
      });
      expect(context.totalTokens).toBeLessThanOrEqual(800);
    });

    it("should include work item context when specified", async () => {
      const context = await contextService.buildContext("test", {
        workItemId: "wi_123",
      });
      expect(context.workItemContext).toBeDefined();
    });
  });
});
```

---

## Integration テスト

### API ルートテスト

```typescript
// packages/api/src/routes/__tests__/sessions.test.ts

describe("Sessions API", () => {
  let app: Hono;

  beforeAll(async () => {
    app = createApp();
    await setupTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
  });

  describe("POST /api/sessions", () => {
    it("should create a new session", async () => {
      const res = await app.request("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Session",
          workingDir: "/tmp/test",
        }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.sessionId).toBeDefined();
      expect(body.name).toBe("Test Session");
    });

    it("should return 400 for missing required fields", async () => {
      const res = await app.request("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/sessions", () => {
    it("should return paginated sessions", async () => {
      const res = await app.request("/api/sessions?page=1&limit=10");

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.sessions).toBeInstanceOf(Array);
      expect(body.pagination).toBeDefined();
    });
  });
});
```

### データベーステスト

```typescript
// packages/api/src/db/__tests__/repositories.test.ts

describe("SessionRepository", () => {
  beforeEach(async () => {
    await db.exec("DELETE FROM sessions");
  });

  describe("create", () => {
    it("should insert session with generated id", async () => {
      const session = await sessionRepo.create({
        name: "Test",
        workingDir: "/test",
      });

      expect(session.sessionId).toMatch(/^sess_/);
    });
  });

  describe("findById", () => {
    it("should return session by id", async () => {
      const created = await sessionRepo.create({
        name: "Test",
        workingDir: "/test",
      });
      const found = await sessionRepo.findById(created.sessionId);

      expect(found).toEqual(created);
    });

    it("should return null for non-existent id", async () => {
      const found = await sessionRepo.findById("non_existent");
      expect(found).toBeNull();
    });
  });
});
```

---

## E2E テスト

### クリティカルパス

```typescript
// e2e/critical-flows.test.ts

import { test, expect } from "@playwright/test";

test.describe("Critical User Flows", () => {
  test("create session and send message", async ({ page }) => {
    // 1. トップページにアクセス
    await page.goto("/");

    // 2. 新規セッション作成
    await page.click('[data-testid="new-session-btn"]');
    await page.fill('[data-testid="session-name"]', "E2E Test Session");
    await page.fill('[data-testid="working-dir"]', "/tmp/test");
    await page.click('[data-testid="create-session"]');

    // 3. セッション詳細ページに遷移
    await expect(page).toHaveURL(/\/sessions\/.+/);

    // 4. メッセージ送信
    await page.fill('[data-testid="message-input"]', "Hello Claude");
    await page.click('[data-testid="send-btn"]');

    // 5. メッセージが表示されることを確認
    await expect(page.locator('[data-testid="message-list"]')).toContainText(
      "Hello Claude",
    );
  });

  test("search sessions semantically", async ({ page }) => {
    await page.goto("/search");
    await page.fill('[data-testid="search-input"]', "認証の実装");
    await page.click('[data-testid="search-btn"]');

    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
  });
});
```

---

## テストユーティリティ

### モック

```typescript
// packages/api/src/test-utils/mocks.ts

// Claude Agent SDK モック
export const mockClaudeAgent = {
  query: vi.fn().mockResolvedValue({
    content: "Mocked response",
  }),
  generateEmbedding: vi.fn().mockResolvedValue(new Array(384).fill(0.1)),
};

// DB モック
export const createTestDb = async () => {
  const db = new Database(":memory:");
  await runMigrations(db);
  return db;
};
```

### フィクスチャ

```typescript
// packages/api/src/test-utils/fixtures.ts

export const sessionFixture = {
  sessionId: "sess_test123",
  name: "Test Session",
  workingDir: "/tmp/test",
  status: "idle",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export const messageFixtures = [
  { type: "user", content: "Hello" },
  { type: "assistant", content: "Hi there!" },
];
```

---

## CI/CD 統合

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1

      - run: bun install
      - run: bun test
      - run: bun run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## テストコマンド

```bash
# 全テスト実行
bun test

# ウォッチモード
bun test --watch

# カバレッジ
bun test --coverage

# 特定ファイル
bun test SessionSummarizer

# E2E テスト
bun run test:e2e
```
