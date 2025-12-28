# 技術スタック

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────────┐
│                        claude-cnthub                            │
├─────────────────────────────────────────────────────────────────┤
│  Monorepo (Bun Workspaces)                                      │
│  ├── packages/api      # Backend (Hono + Bun)                   │
│  ├── packages/web      # Frontend (React + Vite)                │
│  ├── packages/shared   # 共通型定義                              │
│  └── packages/plugin   # Claude Plugin パッケージ                │
└─────────────────────────────────────────────────────────────────┘
```

---

## ランタイム

| 技術    | バージョン | 用途                               |
| ------- | ---------- | ---------------------------------- |
| **Bun** | 1.1.0+     | パッケージ管理、ランタイム、ビルド |

### Bun を選択した理由

- Node.js より 3-4x 高速
- TypeScript ネイティブサポート
- 組み込みテストランナー
- claude-mem でも採用されている

---

## Backend

| 技術           | バージョン | 用途                         |
| -------------- | ---------- | ---------------------------- |
| **Hono**       | 4.x        | Web フレームワーク           |
| **SQLite**     | -          | データベース（Bun 組み込み） |
| **sqlite-vec** | 0.1.x      | ベクトル検索拡張             |
| **Socket.IO**  | 4.x        | WebSocket 通信               |
| **Zod**        | 3.x        | スキーマ検証                 |

### Hono を選択した理由

- 軽量で高速（Express より高パフォーマンス）
- TypeScript ファースト
- Edge Runtime 対応（将来の拡張性）
- ミドルウェアが豊富

---

## Frontend

| 技術                 | バージョン | 用途                   |
| -------------------- | ---------- | ---------------------- |
| **React**            | 18.x       | UI ライブラリ          |
| **Vite**             | 5.x        | ビルドツール           |
| **TailwindCSS**      | 3.x        | スタイリング           |
| **Zustand**          | 4.x        | 状態管理               |
| **React Query**      | 5.x        | サーバー状態管理       |
| **Socket.IO Client** | 4.x        | WebSocket クライアント |

---

## AI / Claude 連携

| 技術                               | バージョン | 用途             |
| ---------------------------------- | ---------- | ---------------- |
| **@anthropic-ai/claude-agent-sdk** | 0.1.x      | Claude Agent SDK |

### 利用方式

```typescript
// サブスクプラン（Claude Pro/Team/Enterprise）
// → 追加設定不要、claude コマンド経由で自動認証

// API キー方式
// → ANTHROPIC_API_KEY 環境変数設定
```

### 2.3 AI 要約機能の詳細

#### アーキテクチャ（claude-mem 参考）

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI 要約パイプライン                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [セッション終了]                                                 │
│       ↓                                                         │
│  [メッセージ収集] ─→ messages テーブルから取得                     │
│       ↓                                                         │
│  [前処理] ─→ トークン制限に合わせてチャンク化                       │
│       ↓                                                         │
│  [Claude Agent SDK] ─→ 要約生成（ストリーミング）                  │
│       ↓                                                         │
│  [メタデータ抽出] ─→ 決定事項、変更ファイル、ツール使用             │
│       ↓                                                         │
│  [埋め込み生成] ─→ Voyage AI でベクトル化                         │
│       ↓                                                         │
│  [保存] ─→ summaries + session_embeddings テーブル               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Claude Agent SDK によるテキスト生成

```typescript
// packages/api/src/services/summarizer.ts
import { query } from "@anthropic-ai/claude-agent-sdk";

export async function generateSummary(
  messages: Message[]
): Promise<SessionSummary> {
  const prompt = buildSummaryPrompt(messages);

  for await (const message of query({
    prompt,
    options: {
      model: "claude-sonnet-4-5-20250514", // コスト効率重視
      allowedTools: [],                     // ツール不要
      maxBudgetUsd: 0.5,                    // 予算制限
    },
  })) {
    if ("result" in message) {
      return parseSummaryResult(message.result);
    }
  }

  throw new Error("Summary generation failed");
}
```

#### 要約プロンプト設計

```typescript
function buildSummaryPrompt(messages: Message[]): string {
  return `
以下のClaude Codeセッションを分析し、JSON形式で要約してください。

## セッション内容
${formatMessages(messages)}

## 出力形式
{
  "shortSummary": "1-2文の要約",
  "detailedSummary": "詳細な説明（3-5文）",
  "keyDecisions": ["決定事項1", "決定事項2"],
  "filesModified": ["path/to/file1.ts", "path/to/file2.ts"],
  "toolsUsed": ["Read", "Write", "Bash"],
  "topicsDiscussed": ["トピック1", "トピック2"],
  "nextSteps": ["次のアクション1"]
}
`;
}
```

#### 埋め込み生成（セマンティック検索用）

**注意**: Claude Agent SDK には埋め込み API がないため、Voyage AI を使用

```typescript
// packages/api/src/services/embeddings.ts
import Anthropic from "@anthropic-ai/sdk";

// Voyage AI（Anthropic推奨のパートナー）
const voyageClient = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await voyageClient.embed({
    input: [text],
    model: "voyage-3.5",        // バランス型（コード対応）
    inputType: "document",
  });

  return result.data[0].embedding;
}

// 検索クエリ用（異なる inputType）
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const result = await voyageClient.embed({
    input: [query],
    model: "voyage-3.5",
    inputType: "query",         // クエリ最適化
  });

  return result.data[0].embedding;
}
```

#### sqlite-vec によるベクトル検索

```typescript
// packages/api/src/repositories/embedding.ts
import { query, run } from "../db";

// 埋め込み保存
export function saveEmbedding(sessionId: string, embedding: number[]): void {
  run(
    `INSERT INTO session_embeddings (session_id, embedding) VALUES (?, ?)`,
    sessionId,
    new Float32Array(embedding)
  );
}

// セマンティック検索
export function searchSimilarSessions(
  queryEmbedding: number[],
  limit: number = 10
): SearchResult[] {
  return query<SearchResult>(
    `
    SELECT
      s.session_id,
      s.name,
      sm.short_summary,
      vec_distance_cosine(e.embedding, ?) AS distance
    FROM session_embeddings e
    JOIN sessions s ON e.session_id = s.session_id
    JOIN summaries sm ON s.session_id = sm.session_id
    ORDER BY distance ASC
    LIMIT ?
    `,
    new Float32Array(queryEmbedding),
    limit
  );
}
```

#### コスト管理

| モデル | 入力 | 出力 | 用途 |
|--------|------|------|------|
| Claude Sonnet 4.5 | $3/MTok | $15/MTok | 要約生成（推奨） |
| Claude Haiku 4.5 | $1/MTok | $5/MTok | 軽量タスク |
| Voyage 3.5 | $0.06/MTok | - | 埋め込み生成 |

```typescript
// コスト最適化設定
const COST_CONFIG = {
  summaryModel: "claude-sonnet-4-5-20250514",
  maxBudgetPerSummary: 0.5,  // USD
  maxTokensPerChunk: 100000, // チャンク分割閾値
  embeddingBatchSize: 100,   // バッチ処理
};
```

#### エラーハンドリング

```typescript
import {
  CLINotFoundError,
  ProcessError,
  CLIJSONDecodeError,
} from "@anthropic-ai/claude-agent-sdk";

export async function safeSummarize(
  messages: Message[]
): Promise<SessionSummary | null> {
  try {
    return await generateSummary(messages);
  } catch (error) {
    if (error instanceof CLINotFoundError) {
      console.error("[Summary] Claude Code not installed");
      // グレースフルデグラデーション: 要約なしで継続
      return createFallbackSummary(messages);
    }
    if (error instanceof ProcessError) {
      console.error(`[Summary] Process error: ${error.stderr}`);
      return null;
    }
    throw error;
  }
}

// フォールバック: 統計ベースの要約
function createFallbackSummary(messages: Message[]): SessionSummary {
  return {
    shortSummary: `${messages.length}件のメッセージ`,
    detailedSummary: "AI要約は利用できません",
    keyDecisions: [],
    filesModified: extractFilesFromMessages(messages),
    toolsUsed: extractToolsFromMessages(messages),
    topicsDiscussed: [],
    originalTokens: countTokens(messages),
    summaryTokens: 0,
  };
}
```

#### claude-mem との比較

| 機能 | claude-mem | claude-cnthub |
|------|------------|---------------|
| ベクトルDB | Chroma | sqlite-vec（軽量） |
| 埋め込み | 不明 | Voyage AI |
| 検索 | ハイブリッド | セマンティック + FTS5 |
| ストレージ | SQLite + Chroma | SQLite統合 |
| Hook統合 | 5種類 | 同等 |

---

## Plugin / Hook

| 技術                   | 用途                             |
| ---------------------- | -------------------------------- |
| **Claude Plugin 仕様** | `claude plugin install` 対応     |
| **hooks.json**         | Claude Code ライフサイクルフック |
| **Git Cron**           | Git 操作トリガー                 |

### Plugin 構成

```
packages/plugin/
├── package.json       # name: "@anthropic-ai/claude-cnthub"
├── plugin.json        # Plugin マニフェスト
├── hooks/
│   ├── session-start.ts
│   ├── post-tool-use.ts
│   ├── stop.ts
│   └── session-end.ts
└── skills/
    └── mem-search.md  # メモリ検索スキル
```

---

## 開発ツール

| 技術           | 用途                 |
| -------------- | -------------------- |
| **TypeScript** | 型安全性             |
| **ESLint**     | リンター             |
| **Prettier**   | フォーマッター       |
| **Vitest**     | テストフレームワーク |

---

## ディレクトリ構成

```
claude-cnthub/
├── Agent-docs/              # ドキュメント
├── packages/
│   ├── api/                 # Backend
│   │   ├── src/
│   │   │   ├── routes/      # API ルート
│   │   │   ├── services/    # ビジネスロジック
│   │   │   ├── db/          # データベース
│   │   │   ├── hooks/       # Hook ハンドラー
│   │   │   └── index.ts     # エントリーポイント
│   │   └── package.json
│   │
│   ├── web/                 # Frontend
│   │   ├── src/
│   │   │   ├── components/  # UI コンポーネント
│   │   │   ├── hooks/       # React Hooks
│   │   │   ├── stores/      # Zustand ストア
│   │   │   ├── services/    # API クライアント
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   ├── shared/              # 共通
│   │   └── src/
│   │       └── types/       # 型定義
│   │
│   └── plugin/              # Claude Plugin
│       ├── plugin.json
│       ├── hooks/
│       └── skills/
│
├── package.json             # ルート（workspaces）
├── tsconfig.json
└── .gitignore
```

---

## 依存関係グラフ

```
packages/shared
    ↑
    ├──────────────┐
    │              │
packages/api    packages/web
    ↑              ↑
    │              │
packages/plugin ───┘
```

---

## 環境変数

```env
# サーバー設定
API_PORT=3001
WEB_PORT=5173
HOOK_SERVER_PORT=37778

# AI 設定（API キー方式の場合のみ）
ANTHROPIC_API_KEY=sk-ant-...

# データベース
DATABASE_PATH=~/.claude-cnthub/data.db

# ログ
LOG_LEVEL=info
```
