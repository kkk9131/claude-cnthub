# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-11
> ビジョン: Claude Code の「最適化エンジン」- セッション・システムコンテキストの可視化・操作・AI最適化

## コンセプト

```
lovcode:       Claude Code の「ビューア」（見るだけ）
claude-cnthub: Claude Code の「最適化エンジン」（見る + 操作 + AI最適化）
```

| 機能 | lovcode | claude-cnthub |
|------|---------|---------------|
| セッション閲覧 | ✅ | ✅ |
| システム設定閲覧 | ✅（手動） | ✅ + **AI最適化** |
| コンテキスト注入 | ❌ | ✅ |
| 最適化提案・実行 | ❌ | ✅（Agent SDK） |
| ネガティブ学習 | ❌ | ✅（失敗セッション活用） |

### 核心的価値：段階的開示

```
問題: 全部最初に読み込む → コンテキスト肥大化 → 効率低下
解決: 必要な時に必要なものだけ開示 → コンテキスト最適化
```

---

## コマンド体系

```
/cnthub:
├── get              # 過去セッションから注入
├── export           # 現在のやり取りを保存
├── fork             # セッション分岐（A案/B案並行試行）
├── optimize         # 全体最適化
├── optimize:skills  # Skills 最適化
├── optimize:hooks   # Hooks 最適化
├── optimize:mcp     # MCP → Skill 化
└── optimize:rules   # ルール段階的開示化
```

---

## 完了済み ✅

Phase 0〜2 完了: 基盤構築、Plugin機能、Smart Export、Context Management、UI統合、System Context可視化
詳細は [ARCHIVE.md](./ARCHIVE.md) 参照

---

## Phase 3: セッション品質・コンテキスト管理 `cc:TODO`

> 目的: セッションの品質可視化、自動コンテキスト注入、ネガティブ学習

### Wave 0: セッション分岐 ✅

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| FRK-01 | `/cnthub:fork` コマンド定義 | 🔴 High | ✅ `cc:完了` |
| FRK-02 | DB migration (parent_session_id, fork_point, worktree_path) | 🔴 High | ✅ `cc:完了` |
| FRK-03 | Session fork API エンドポイント | 🔴 High | ✅ `cc:完了` |
| FRK-04 | git worktree サービス | 🔴 High | ✅ `cc:完了` |
| FRK-05 | MCP tools (fork_session, list_forks) | 🔴 High | ✅ `cc:完了` |

**実装詳細:**
- セッションを分岐して別アプローチを並行で試行可能
- git worktree 連携でコード変更も分離
- ブランチ名: `fork/{sessionId}`
- API: `POST /sessions/:id/fork`, `GET /sessions/:id/forks`

### Wave 1: トークン・品質可視化 ✅

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| TOK-01 | リアルトークン数表示（input/output分離） | 🔴 High | ✅ `cc:完了` |
| TOK-02 | SessionEnd Hookでトークン合計計算 | 🔴 High | ✅ `cc:完了` |
| TOK-03 | UI: カードにトークン数表示 | 🔴 High | ✅ `cc:完了` |

### Wave 2: セッション分類・マーキング

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| CLS-01 | セッション重要度・分類機能 | 🔴 High | ✅ `cc:完了` |
| CLS-02 | 失敗セッション自動検出（エラーパターン分析） | 🔴 High | ✅ `cc:完了` |
| CLS-03 | 🐛バグアイコン・マーキングUI | 🔴 High | ✅ `cc:完了` |

### Wave 3: 自動コンテキスト注入

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| INJ-01 | ノード接続時の自動コンテキスト注入（pending→1回注入） | 🔴 High | `cc:TODO` |
| INJ-02 | CLI getとUI同期（Edge作成 + WebSocket通知） | 🔴 High | `cc:TODO` |
| INJ-03 | ノード削除時のコンテキスト管理（残りpending + /clear通知） | 🟡 Medium | `cc:TODO` |

### Wave 4: ネガティブ学習 ✅

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| NEG-01 | バグセッション自動接続（セマンティック検索 + 確認あり） | 🟡 Medium | ✅ `cc:完了` |
| NEG-02 | ネガティブコンテキストフォーマット | 🟡 Medium | ✅ `cc:完了` |

---

## Phase 4: 最適化エージェント `cc:TODO`

> 目的: Claude Agent SDK で設定ファイル（CLAUDE.md, Skills）を段階的開示化

### 対象

- プロジェクト: `<project>/.claude/CLAUDE.md`, `<project>/.claude/skills/`
- グローバル: `~/.claude/CLAUDE.md`, `~/.claude/skills/`

### 最適化基準

| 対象 | 目標行数 | 分離先 |
|------|---------|--------|
| CLAUDE.md | 100行以内 | `rules/` or `references/` |
| SKILL.md | 30行以内 | `references/` or `examples/` |

### アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│  UI: 最適化ボタン (実装済み) → onOptimize コールバック      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  API: POST /api/optimize → WebSocket で進捗通知            │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Orchestrator                              │
│  ・対象パス取得 ・サブエージェント並列実行 ・結果集約        │
└───────────┬─────────────────────────────────┬───────────────┘
            │ 並列                            │ 並列
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│ CLAUDE.md 参照        │         │ Skills 参照           │
│ (読み取り専用)         │         │ (読み取り専用)        │
└───────────┬───────────┘         └───────────┬───────────┘
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│ CLAUDE.md 修正        │         │ Skills 修正           │
│ (100行→rules/)        │         │ (30行→refs/)          │
└───────────┬───────────┘         └───────────┬───────────┘
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│ CLAUDE.md 評価        │◄──NG───►│ Skills 評価           │
│ (最大2回リトライ)      │         │ (最大2回リトライ)      │
└───────────┬───────────┘         └───────────┬───────────┘
            │ OK                              │ OK
            └───────────────┬─────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  UI: 承認ダイアログ (Diff表示) → [承認] [キャンセル]        │
└─────────────────────────────────────────────────────────────┘
```

### タスク

| ID | タスク | 優先度 | 依存 | 状態 |
|----|--------|--------|------|------|
| OPT-01 | オーケストレーター実装 | 🔴 High | - | `cc:TODO` |
| OPT-02 | CLAUDE.md 参照エージェント | 🔴 High | OPT-01 | `cc:TODO` |
| OPT-03 | Skills 参照エージェント | 🔴 High | OPT-01 | `cc:TODO` |
| OPT-04 | CLAUDE.md 修正エージェント | 🔴 High | OPT-02 | `cc:TODO` |
| OPT-05 | Skills 修正エージェント | 🔴 High | OPT-03 | `cc:TODO` |
| OPT-06 | CLAUDE.md 評価エージェント | 🔴 High | OPT-04 | `cc:TODO` |
| OPT-07 | Skills 評価エージェント | 🔴 High | OPT-05 | `cc:TODO` |
| OPT-08 | API `/api/optimize` エンドポイント | 🔴 High | OPT-01〜07 | `cc:TODO` |
| OPT-09 | UI 進捗表示・キャンセル | 🔴 High | OPT-08 | `cc:TODO` |
| OPT-10 | UI 承認ダイアログ (Diff) | 🔴 High | OPT-09 | `cc:TODO` |

### 参照

- [08-agent-sdk-reference.md](./Agent-docs/08-agent-sdk-reference.md) - Agent SDK リファレンス

---

## Phase 5: 拡張機能 `将来`

| ID | タスク | 状態 |
|----|--------|------|
| EXT-01 | settings.json 最適化 | 将来 |
| EXT-02 | subagent 最適化 | 将来 |
| EXT-03 | Cross-LLM 連携 | 将来 |

### セッション分岐の拡張 `将来`

| ID | タスク | 説明 |
|----|--------|------|
| FRK-EXT-01 | UI: 分岐ツリー表示 | セッション関係をグラフで可視化 |
| FRK-EXT-02 | 分岐マージ機能 | 複数分岐の結果を統合 |
| FRK-EXT-03 | 分岐比較ビュー | A案/B案の差分を並列表示 |
| FRK-EXT-04 | worktree 自動クリーンアップ | 不要な worktree を定期削除 |
| FRK-EXT-05 | メッセージコピー機能 | 分岐時に過去メッセージも複製 |

---

## 最適化知見

### Skills 段階的開示
```
Before: CLAUDE.md に全 Skill 説明 → 毎回全部読み込み
After:  Skill 名+1行説明のみ → 必要時だけ本体呼び出し
```

### MCP → Skill 化
```
Before: MCP 直接公開 → 全機能認識、コンテキスト消費
After:  Skill でラップ → 必要時だけ Skill 経由で呼び出し
```

### CLAUDE.md 分割
```
Before: 巨大な単一ファイル
After:  概要のみ + .claude/rules/*.md → 必要時だけ読み込み
```

### ネガティブ学習
```
Before: 同じ失敗を繰り返す
After:  失敗セッションを自動接続 → 「この方法は失敗した」と学習
```

---

## 参照

- [01-requirements.md](./Agent-docs/01-requirements.md) - 要件定義
- [Tasks.md](./Tasks.md) - 現在のタスク詳細
- [ARCHIVE.md](./ARCHIVE.md) - 完了済みタスク詳細
