# /plan-with-cc - Claude Code と計画策定

Claude Code と協力して実装計画を立てるコマンド。

## 使い方

```
/plan-with-cc <やりたいこと>
```

## 実行フロー

1. 要件を Claude Code に伝達
2. Claude Code が技術調査・設計
3. Plans.md にタスクを追加
4. 依存関係・並列実行可能性を整理
5. TASKS.md に詳細チケットを追加

## 例

```
/plan-with-cc ツリービューでセッションをドラッグ&ドロップしてマージしたい
```

## 出力例

```
📝 Plan Created

### 新規タスク (Plans.md に追加)

G-01: ツリービューコンポーネント (pm:TODO)
G-02: ドラッグ&ドロップ基盤 (pm:TODO) ← G-01
G-03: マージ操作 UI (pm:TODO) ← G-02

### 並列実行可能
- G-01 は独立して着手可能
- G-02 は G-01 完了後

💡 「/handoff-to-claude G-01」で実装を依頼
```
