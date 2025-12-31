# /start-session - セッション開始

1日の作業開始時に実行。Plans.md を確認し、今日のタスクを把握。

## 実行内容

1. Plans.md を読み込み
2. 進行中タスク (`cc:WIP`) を確認
3. 未着手タスク (`cc:TODO`) を確認
4. 今日の作業候補を提示

## 出力例

```
📋 Today's Tasks

### 進行中
- [ ] I-01: サーバー統合 (cc:WIP)

### 次の候補
- [ ] I-03: 新セッション ID 体系 (cc:TODO)
- [ ] P-01: Project 型定義 (cc:TODO)

💡 「/handoff-to-claude I-01」で Claude Code に依頼
```
