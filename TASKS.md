# Tasks.md - Phase 3: セッション品質・コンテキスト管理

> 作成日: 2026-01-10
> 関連: [Plans.md](./Plans.md)

## 概要

セッションの品質可視化、自動コンテキスト注入、ネガティブ学習機能を実装する。

---

## 設計決定（2026-01-10 セッションで決定）

### 1. 最適化エージェント: Agent SDK + Skills を使用

**理由**: 単純なプロンプト→テキスト生成ではなく、ファイル読み書き + 分析 + 対話が必要

```typescript
// 現在の要約（プロンプトのみ）
query({ prompt: "要約して", options: { allowedTools: [] } })

// 最適化エージェント（Skills使用）
query({
  prompt: "CLAUDE.mdを最適化して",
  options: {
    settingSources: ["user", "project"],  // スキル読み込み
    allowedTools: ["Skill", "Read", "Write"]
  }
})
```

### 2. コンテキスト注入: 1回だけ注入方式

**理由**: 毎回注入するとコンテキストが重複・肥大化

```
ノード接続時: Edge作成 → pending_inject に保存
1回目のプロンプト: コンテキスト注入 → pending削除
2回目以降: 何もしない（既に注入済み）
```

### 3. ノード削除時: /clear + 残りセッション復元

**理由**: LLMの会話は追記型のため、特定コンテキストのみ削除は不可能

```
Edge削除 → 残りセッションをpending保存 → /clear通知
ユーザー /clear → 次回プロンプトで残りのみ復元
```

### 4. バグセッション接続: 確認あり

**理由**: 完全自動だと不要なコンテキストが増える可能性

```
セマンティック検索 → 類似バグセッション発見
→ 「このセッションを参照しますか？」と確認
→ 承認時のみEdge作成
```

### 5. CLI/UI同期: 双方向

**理由**: CLIとUIで状態が異なると混乱

```
CLI /cnthub:get → Edge作成 + WebSocket通知 → UI反映
UI ノード接続 → Edge作成 → 次回プロンプトで注入
```

---

## 既存コード参照

| 機能 | 参照ファイル |
|------|-------------|
| トークン数（要約用） | `packages/api/src/services/summarizer.ts:calculateTokenCount()` |
| Edge管理 | `packages/api/src/routes/edges.ts`, `packages/api/src/repositories/edge.ts` |
| pending_inject | `packages/api/src/routes/inject.ts` |
| MCP Server | `plugin/scripts/mcp-server.js` |
| UserPromptSubmit Hook | `plugin/scripts/user-prompt-hook.js` |
| セッション要約 | `packages/api/src/services/summarizer.ts` |
| 観測分析 | `packages/api/src/services/observation-analyzer.ts` |
| WebSocket | `packages/api/src/websocket.ts` |
| NodeEditor UI | `packages/web/src/components/NodeEditor.tsx` |

---

## 並列実行グループ

```
Wave 1（並列実行可）
├── TOK-01: リアルトークン数表示
├── TOK-02: PostToolUse Hookでトークン累積
└── TOK-03: UI: カードにトークン数表示

Wave 2（Wave 1 完了後、並列実行可）
├── CLS-01: セッション重要度・分類機能
├── CLS-02: 失敗セッション自動検出
└── CLS-03: 🐛バグアイコン・マーキングUI

Wave 3（Wave 2 完了後、並列実行可）
├── INJ-01: ノード接続時の自動コンテキスト注入
├── INJ-02: CLI getとUI同期
└── INJ-03: ノード削除時のコンテキスト管理

Wave 4（Wave 3 完了後、並列実行可）
├── NEG-01: バグセッション自動接続
└── NEG-02: ネガティブコンテキストフォーマット
```

---

## Wave 1: トークン・品質可視化

### TOK-01: リアルトークン数表示

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🔴 High |

**要件**:
- トランスクリプトの `message.usage` からトークン数を取得
- input_tokens / output_tokens を分離表示
- リアルタイムで更新（processing中も）

**データソース**:
```json
"usage": {
  "input_tokens": 3,
  "cache_creation_input_tokens": 39971,
  "cache_read_input_tokens": 0,
  "output_tokens": 1
}
```

**変更ファイル**:
- `packages/api/src/db/migrations/` - sessions テーブルに `input_tokens`, `output_tokens` カラム追加
- `packages/api/src/repositories/session.ts` - トークン数更新関数

---

### TOK-02: PostToolUse Hookでトークン累積

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🔴 High |
| **依存** | TOK-01 |

**要件**:
- PostToolUse Hook でトランスクリプトを読み取り
- 最新エントリの usage を取得
- セッションのトークン数を累積更新

**変更ファイル**:
- `plugin/scripts/post-tooluse-hook.js`
- `packages/api/src/routes/hooks.ts` - トークン更新エンドポイント

---

### TOK-03: UI: カードにトークン数表示

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🔴 High |
| **依存** | TOK-01 |

**要件**:
- セッションカード右上にリアルトークン数表示
- `in: 1.2k / out: 500` 形式で表示
- processing中はリアルタイム更新

**変更ファイル**:
- `packages/web/src/components/NodeEditor.tsx`
- `packages/api/src/routes/sessions.ts` - レスポンスにトークン数含める

---

## Wave 2: セッション分類・マーキング

### CLS-01: セッション重要度・分類機能

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🔴 High |

**要件**:
- 要約生成時に重要度を自動判定（高/中/低）
- 分類カテゴリ: 機能追加、バグ修正、リファクタリング、調査、その他
- UIで重要度フィルタリング

**変更ファイル**:
- `packages/api/src/services/summarizer.ts` - 重要度判定追加
- `packages/api/src/db/migrations/` - sessions テーブルに `importance`, `category` カラム追加

---

### CLS-02: 失敗セッション自動検出

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🔴 High |

**要件**:
- トランスクリプトから失敗パターンを検出:
  - エラーメッセージの繰り返し
  - 同じファイルを何度も編集
  - テスト失敗 → 修正 → 再失敗のループ
  - 「失敗」「エラー」「やり直し」等のキーワード
- `has_issues` フラグを設定

**変更ファイル**:
- `packages/api/src/services/observation-analyzer.ts` - 失敗検出ロジック
- `packages/api/src/db/migrations/` - sessions テーブルに `has_issues`, `issue_type` カラム追加

---

### CLS-03: 🐛バグアイコン・マーキングUI

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🔴 High |
| **依存** | CLS-02 |

**要件**:
- 失敗セッションに 🐛 アイコン表示
- ホバーで失敗タイプを表示
- フィルタで失敗セッションのみ表示

**変更ファイル**:
- `packages/web/src/components/NodeEditor.tsx`
- `packages/web/src/components/ViewerSidebar.tsx`

---

## Wave 3: 自動コンテキスト注入

### INJ-01: ノード接続時の自動コンテキスト注入

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🔴 High |

**要件**:
- UIでノード接続時に Edge 作成
- 接続セッションの要約を `pending_inject` に保存
- 次回の UserPromptSubmit 時に1回だけ注入
- 注入後は pending から削除（重複防止）

**フロー**:
```
UI: ノード接続
    ↓
API: POST /edges → Edge作成 + pending_inject保存
    ↓
次回の UserPromptSubmit Hook
    ↓
Hook: pending_inject 確認 → 1回だけ注入 → pending削除
```

**変更ファイル**:
- `packages/api/src/routes/edges.ts` - Edge作成時にpending保存
- `plugin/scripts/user-prompt-hook.js` - pending注入ロジック

---

### INJ-02: CLI getとUI同期

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🔴 High |

**要件**:
- `/cnthub:get` でセッション取得時に Edge も作成
- WebSocket で UI に `edge_created` イベント送信
- UI がノード接続を自動反映

**フロー**:
```
CLI: /cnthub:get でセッション選択
    ↓
MCP: inject_context 呼び出し
    ↓
API: コンテキスト返却 + Edge作成
    ↓
API: WebSocket で edge_created 送信
    ↓
UI: ノード接続を描画
```

**変更ファイル**:
- `plugin/scripts/mcp-server.js` - inject_context でEdge作成
- `packages/api/src/websocket.ts` - edge_created イベント
- `packages/web/src/components/NodeEditor.tsx` - WebSocket受信でノード更新

---

### INJ-03: ノード削除時のコンテキスト管理

| 項目 | 内容 |
|------|------|
| **状態** | `cc:TODO` |
| **優先度** | 🟡 Medium |

**要件**:
- UIでノード接続削除時
- 残りの接続セッションを `pending_inject` に保存
- UIに `/clear` を実行するよう通知
- 次回プロンプト時に残りのセッションのみ復元

**フロー**:
```
UI: Edge削除
    ↓
API: Edge削除 + 残りセッションをpending保存
    ↓
UI: 「/clear を実行してください」と通知
    ↓
ユーザー: /clear 実行
    ↓
次回プロンプト時: 残りセッションのみ自動復元
```

**変更ファイル**:
- `packages/api/src/routes/edges.ts` - 削除時にpending保存
- `packages/web/src/components/NodeEditor.tsx` - /clear通知UI

---

## Wave 4: ネガティブ学習 ✅

### NEG-01: バグセッション自動接続

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🟡 Medium |
| **依存** | CLS-02, INJ-01 |

**要件**:
- UserPromptSubmit 時に新タスクを検出
- セマンティック検索で類似の失敗セッションを検索
- 類似度が高い場合、ユーザーに確認
- 承認されたら自動でEdge接続

**フロー**:
```
UserPromptSubmit Hook: 新タスク検出
    ↓
セマンティック検索: has_issues=true のセッションから検索
    ↓
類似度 > 閾値の場合
    ↓
UI/CLI: 「このセッションを参照しますか？」と確認
    ↓
承認 → Edge作成 + ネガティブコンテキスト注入
```

**変更ファイル**:
- `plugin/scripts/user-prompt-hook.js` - 失敗セッション検索
- `packages/api/src/routes/search.ts` - has_issues フィルタ追加

---

### NEG-02: ネガティブコンテキストフォーマット

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🟡 Medium |
| **依存** | NEG-01 |

**要件**:
- 失敗セッションのコンテキストを特別フォーマットで注入
- 「この方法は失敗した」と明示
- 失敗原因を含める

**フォーマット例**:
```markdown
# ⚠️ 過去の失敗事例（参照用）

## セッション: JWT認証の実装 (2026-01-08)

**失敗タイプ**: 同じエラーの繰り返し

**失敗内容**:
トークン検証のタイミングでミドルウェアの順序を間違えた。
認証ミドルウェアがルート設定より後に適用され、認証がスキップされた。

**教訓**:
ミドルウェアは必ずルート設定の前に適用すること。

---

この情報は参考として提供されています。同じ失敗を避けるために活用してください。
```

**変更ファイル**:
- `packages/api/src/services/context.ts` - ネガティブコンテキストフォーマット

---

## 完了条件

- [ ] 全タスク `cc:完了`
- [ ] テスト通過
- [ ] ビルド成功
- [ ] ドキュメント更新

---

## 参照

- [Plans.md](./Plans.md) - 全体計画
- [ARCHIVE.md](./ARCHIVE.md) - 完了済みタスク
