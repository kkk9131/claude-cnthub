# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-10
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

### Wave 1: トークン・品質可視化

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| TOK-01 | リアルトークン数表示（input/output分離） | 🔴 High | `cc:TODO` |
| TOK-02 | PostToolUse Hookでトークン累積 | 🔴 High | `cc:TODO` |
| TOK-03 | UI: カードにトークン数表示 | 🔴 High | `cc:TODO` |

### Wave 2: セッション分類・マーキング

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| CLS-01 | セッション重要度・分類機能 | 🔴 High | `cc:TODO` |
| CLS-02 | 失敗セッション自動検出（エラーパターン分析） | 🔴 High | `cc:TODO` |
| CLS-03 | 🐛バグアイコン・マーキングUI | 🔴 High | `cc:TODO` |

### Wave 3: 自動コンテキスト注入

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| INJ-01 | ノード接続時の自動コンテキスト注入（pending→1回注入） | 🔴 High | `cc:TODO` |
| INJ-02 | CLI getとUI同期（Edge作成 + WebSocket通知） | 🔴 High | `cc:TODO` |
| INJ-03 | ノード削除時のコンテキスト管理（残りpending + /clear通知） | 🟡 Medium | `cc:TODO` |

### Wave 4: ネガティブ学習

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| NEG-01 | バグセッション自動接続（セマンティック検索 + 確認あり） | 🟡 Medium | `cc:TODO` |
| NEG-02 | ネガティブコンテキストフォーマット | 🟡 Medium | `cc:TODO` |

---

## Phase 4: 最適化エージェント `cc:TODO`

> 目的: Claude Agent SDK + Skills で設定ファイルを分析・最適化

```
[最適化] → 調査 → プラン提示 → 承認 → 実行 → 確認/ロールバック
```

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| OPT-01 | 最適化エージェント基盤（Skills使用） | 🔴 High | `cc:TODO` |
| OPT-02 | CLAUDE.md 段階的開示化 | 🔴 High | `cc:TODO` |
| OPT-03 | Skills フォルダ分析・最適化 | 🔴 High | `cc:TODO` |
| OPT-04 | MCP → Skill 化変換 | 🟡 Medium | `cc:TODO` |
| OPT-05 | UI: 最適化ボタン・プログレス | 🔴 High | `cc:TODO` |
| OPT-06 | UI: プラン確認・承認フロー | 🔴 High | `cc:TODO` |
| OPT-07 | UI: ロールバック機能 | 🟡 Medium | `cc:TODO` |

---

## Phase 5: 拡張機能 `将来`

| ID | タスク | 状態 |
|----|--------|------|
| EXT-01 | settings.json 最適化 | 将来 |
| EXT-02 | subagent 最適化 | 将来 |
| EXT-03 | Cross-LLM 連携 | 将来 |

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
