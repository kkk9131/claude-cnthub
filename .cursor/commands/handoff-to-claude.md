# /handoff-to-claude - Claude Code に実装を依頼

タスクを Claude Code に渡すコマンド。

## 使い方

```
/handoff-to-claude <タスクID>
```

## 実行内容

1. タスク ID から Plans.md / TASKS.md を参照
2. タスク詳細をまとめた引き継ぎ文書を生成
3. Plans.md のマーカーを `pm:TODO` → `cc:TODO` に更新

## 例

```
/handoff-to-claude I-01
```

## 出力例 (Claude Code にコピー)

```
🎯 Task Handoff: I-01

## タスク: サーバー統合 (Port 3048)

### 目的
複数ポートで動いているサーバーを Port 3048 に統合

### 完了条件
- [ ] Port 3048 で統合サーバー起動
- [ ] /hook/* エンドポイント動作
- [ ] /memories/* エンドポイント動作
- [ ] 既存テスト通過

### 参照
- TASKS.md: I-01 セクション
- Agent-docs/04-api.md: API 仕様

### ブランチ
feature/unified-server

---
👉 Claude Code で `/work I-01` を実行してください
```
