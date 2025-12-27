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
