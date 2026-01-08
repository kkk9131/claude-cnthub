# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-07
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

Phase 1〜1.7 完了: 基盤構築、Plugin機能、Smart Export、Context Management、UI統合
詳細は [ARCHIVE.md](./ARCHIVE.md) 参照

---

## Phase 2: System Context 可視化 `cc:完了`

> 目的: Skills, Hooks, MCP, Rules をノードビューで可視化

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| SYS-01 | System Context 読み取り API | 🔴 High | `cc:完了` |
| SYS-02 | Skills 一覧取得 | 🔴 High | `cc:完了` |
| SYS-03 | Hooks 一覧取得 | 🔴 High | `cc:完了` |
| SYS-04 | MCP Servers 一覧取得 | 🟡 Medium | `cc:完了` |
| SYS-05 | CLAUDE.md / Rules 読み取り | 🟡 Medium | `cc:完了` |
| SYS-06 | UI: Sessions/System 切り替えタブ | 🔴 High | `cc:完了` |
| SYS-07 | UI: System ノードビュー | 🔴 High | `cc:完了` |
| SYS-08 | UI: プロジェクト接続（共有）機能 | 🟡 Medium | `cc:完了` |

---

## Phase 3: 最適化エージェント `pm:TODO`

> 目的: Claude Agent SDK で設定ファイルを分析・最適化

```
[最適化] → 調査 → プラン提示 → 承認 → 実行 → 確認/ロールバック
```

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| OPT-01 | 最適化エージェント基盤 | 🔴 High | `pm:TODO` |
| OPT-02 | Skills 分析・統合提案 | 🔴 High | `pm:TODO` |
| OPT-03 | Hooks 効率化提案 | 🟡 Medium | `pm:TODO` |
| OPT-04 | MCP → Skill 化変換 | 🟡 Medium | `pm:TODO` |
| OPT-05 | CLAUDE.md 段階的開示化 | 🔴 High | `pm:TODO` |
| OPT-06 | UI: 最適化ボタン・プログレス | 🔴 High | `pm:TODO` |
| OPT-07 | UI: プラン確認・承認フロー | 🔴 High | `pm:TODO` |
| OPT-08 | UI: ロールバック機能 | 🟡 Medium | `pm:TODO` |
| OPT-09 | CLI: /cnthub:optimize | 🟡 Medium | `pm:TODO` |

---

## Phase 4: セッションコンテキスト強化 `pm:TODO`

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| CTX-01 | プロジェクト横断検索 | 🟡 Medium | `pm:TODO` |
| CTX-02 | やり取りパターン保存・再現 | 🟢 Low | `pm:TODO` |
| CTX-03 | コンテキスト圧縮・要約 | 🟢 Low | `pm:TODO` |

---

## Phase 5: Cross-LLM 連携 `将来`

| ID | タスク | 状態 |
|----|--------|------|
| L-01 | ChatGPT Adapter | 将来 |
| L-02 | Codex Adapter | 将来 |
| L-03 | コンテキスト転送 UI | 将来 |

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

---

## 参照

- [01-requirements.md](./Agent-docs/01-requirements.md) - 要件定義
- [ARCHIVE.md](./ARCHIVE.md) - 完了済みタスク詳細
