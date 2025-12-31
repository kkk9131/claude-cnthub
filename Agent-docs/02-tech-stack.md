# 技術スタック

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────────┐
│                        claude-cnthub                            │
├─────────────────────────────────────────────────────────────────┤
│  Monorepo (Bun Workspaces)                                      │
│  ├── packages/api      # Backend (Hono + Bun) - 統合サーバー    │
│  ├── packages/web      # Frontend (React + Vite)                │
│  ├── packages/shared   # 共通型定義                              │
│  ├── packages/plugin   # Claude Plugin パッケージ                │
│  └── packages/cli      # CLI ツール (補助)                       │
└─────────────────────────────────────────────────────────────────┘
```

### サーバーアーキテクチャ (統合)

```
┌─────────────────────────────────────────────────────────────────┐
│  cnthub Server (統合)                                           │
│  Port: 3048                                                     │
├─────────────────────────────────────────────────────────────────┤
│  /api/*        ← セッション CRUD、メモリ操作                    │
│  /hook/*       ← Claude Code Hooks 受信                        │
│  /memories/*   ← メモリ追加・検索 (シンプル API)                │
│  /profiles/*   ← Profile System (Phase 2)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## ランタイム

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Bun** | 1.1.0+ | パッケージ管理、ランタイム、ビルド |

### Bun を選択した理由

- Node.js より 3-4x 高速
- TypeScript ネイティブサポート
- 組み込みテストランナー
- claude-mem でも採用されている

---

## Backend

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Hono** | 4.x | Web フレームワーク |
| **SQLite** | - | データベース（Bun 組み込み） |
| **sqlite-vec** | 0.1.x | ベクトル検索拡張 |
| **Socket.IO** | 4.x | WebSocket 通信 |
| **Zod** | 3.x | スキーマ検証 |

### Hono を選択した理由

- 軽量で高速（Express より高パフォーマンス）
- TypeScript ファースト
- Edge Runtime 対応（将来の拡張性）
- ミドルウェアが豊富

---

## Frontend

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **React** | 18.x | UI ライブラリ |
| **Vite** | 5.x | ビルドツール |
| **TailwindCSS** | 3.x | スタイリング |
| **Zustand** | 4.x | 状態管理 |
| **React Query** | 5.x | サーバー状態管理 |
| **Socket.IO Client** | 4.x | WebSocket クライアント |
| **dnd-kit** | 6.x | ドラッグ&ドロップ (ノード操作) |

---

## AI / Claude 連携

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **@anthropic-ai/claude-agent-sdk** | 0.1.x | Claude Agent SDK |

### 利用方式

```typescript
// サブスクプラン（Claude Pro/Team/Enterprise）
// → 追加設定不要、claude コマンド経由で自動認証

// API キー方式
// → ANTHROPIC_API_KEY 環境変数設定
```

---

## Plugin / Hooks / Skills

### Hooks (自動実行)

```
packages/plugin/
├── hooks/
│   ├── session-start.ts     # セッション開始時
│   ├── user-prompt-submit.ts # プロンプト送信時
│   ├── post-tool-use.ts     # ツール使用後
│   ├── stop.ts              # 中断時
│   └── session-end.ts       # セッション終了時
```

### Skills (行動指針)

```
packages/plugin/
├── skills/
│   ├── cnthub-add/
│   │   └── SKILL.md         # メモリ追加の指針
│   ├── cnthub-search/
│   │   └── SKILL.md         # 検索の指針
│   └── cnthub-gui/
│       └── SKILL.md         # GUI 起動の指針
```

**Skills と Hooks の違い:**
- **Hooks**: イベント発生時に自動実行
- **Skills**: 文脈に応じて Claude が自動ロードする行動指針

---

## 開発ツール

| 技術 | 用途 |
|------|------|
| **TypeScript** | 型安全性 |
| **ESLint** | リンター |
| **Prettier** | フォーマッター |
| **Vitest** | テストフレームワーク |

---

## ディレクトリ構成

```
claude-cnthub/
├── Agent-docs/              # ドキュメント
├── packages/
│   ├── api/                 # Backend (統合サーバー)
│   │   ├── src/
│   │   │   ├── routes/      # API ルート
│   │   │   │   ├── sessions.ts
│   │   │   │   ├── memories.ts   # シンプル API
│   │   │   │   ├── hooks.ts
│   │   │   │   └── profiles.ts   # Phase 2
│   │   │   ├── services/    # ビジネスロジック
│   │   │   ├── db/          # データベース
│   │   │   └── index.ts     # エントリーポイント
│   │   └── package.json
│   │
│   ├── web/                 # Frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Session/
│   │   │   │   ├── Memory/
│   │   │   │   ├── TreeView/     # ノード操作
│   │   │   │   └── Common/
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
│   ├── plugin/              # Claude Plugin
│   │   ├── plugin.json
│   │   ├── hooks/
│   │   └── skills/
│   │
│   └── cli/                 # CLI (補助)
│       ├── src/
│       │   ├── commands/
│       │   └── index.ts
│       └── package.json
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
    ├──────────────────┐
    │                  │
packages/api      packages/web
    ↑                  ↑
    │                  │
    ├──────────────────┤
    │                  │
packages/plugin   packages/cli
```

---

## 環境変数

```env
# サーバー設定 (統合)
API_PORT=3048

# AI 設定（API キー方式の場合のみ）
ANTHROPIC_API_KEY=sk-ant-...

# データベース
DATABASE_PATH=~/.claude-cnthub/data.db

# ログ
LOG_LEVEL=info
```

---

## セッション ID 体系

```
ch_ss_0001  # セッション
ch_mg_0001  # マージ
ch_pj_0001  # プロジェクト
ch_ob_0001  # 観測記録 (observation)

prefix:
  ch = claude-cnthub
  ss = session
  mg = merge
  pj = project
  ob = observation
```
