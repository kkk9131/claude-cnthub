# /project-overview - プロジェクト全体像

プロジェクトの現状を把握するためのコマンド。

## 実行内容

1. CLAUDE.md からプロジェクト概要を読み込み
2. Plans.md から進捗状況を確認
3. TASKS.md から並列実装可能タスクを確認
4. Agent-docs/ から詳細仕様を参照

## 参照ファイル

- `CLAUDE.md` - 技術スタック・ルール
- `Plans.md` - フェーズ別タスク
- `TASKS.md` - 並列実装チケット
- `Agent-docs/01-requirements.md` - 要件定義

## 出力例

```
📊 Project Overview: claude-cnthub

### ビジョン
Phase 1: Claude Code Plugin (現在)
Phase 2: Cross-LLM 連携 (計画)

### 進捗
- Phase 1-7: ✅ 完了
- Phase 1-A〜E: 🔄 進行中 (0/17)

### 次の優先タスク
1. I-01 - サーバー統合
2. I-03 - 新セッション ID
```
