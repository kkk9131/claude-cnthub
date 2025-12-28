---
name: tdd-workflow
description: TDD開発ワークフロー。テスト作成→実装→テスト実行→レビュー→修正→PR作成の流れ。Use when implementing features, fixing bugs, or when user mentions TDD, テスト駆動, test-driven.
allowed-tools: Read, Edit, Write, Bash, Grep, Glob
---

# TDD Development Workflow

claude-cnthubプロジェクトのTDD開発ワークフローです。

## ワークフロー概要

```
[1. テスト設計] → [2. テスト作成] → [3. 実装] → [4. テスト実行]
                                                      ↓
[7. PR作成] ← [6. 要約・記録] ← [5. レビュー] ← [全パス?]
                                      ↓ 問題あり
                                 [修正] → [4へ戻る]
```

## 各フェーズの詳細

### 1. テスト設計
- 要件から受け入れ条件を明確化
- テストケースを洗い出し
- 境界値・異常系を含める

```typescript
// テストケース例
describe('SessionService', () => {
  describe('createSession', () => {
    it('should create session with valid input')
    it('should throw error when title is empty')
    it('should generate unique session ID')
  })
})
```

### 2. テスト作成（Red）
- 失敗するテストを先に書く
- 具体的な入力と期待出力を定義
- **禁止**: `expect(true).toBe(true)`のような意味のないテスト

```typescript
// ✅ 良いテスト
it('should create session with valid input', async () => {
  const input = { title: 'Test Session', userId: 'user-1' }
  const session = await service.createSession(input)

  expect(session.id).toBeDefined()
  expect(session.title).toBe('Test Session')
  expect(session.userId).toBe('user-1')
})

// ❌ 悪いテスト
it('should work', () => {
  expect(true).toBe(true)
})
```

### 3. 実装（Green）
- テストを通す最小限の実装
- **禁止**: テスト用のハードコード
- **禁止**: `if(testMode)`のような条件分岐

### 4. テスト実行
```bash
bun test                    # 全テスト
bun test <path>             # 特定ファイル
bun test --watch            # ウォッチモード
```

### 5. レビュー
- reviewerサブエージェントを使用
- コード品質・セキュリティ・パフォーマンスをチェック

### 6. 要約・記録
フェーズ完了時に記録：

```markdown
# Phase N: [フェーズ名]

## 完了タスク
- [x] タスク1
- [x] タスク2

## 技術決定
- 決定事項とその理由

## 学んだこと
- 発見・知見

## 次のアクション
- 次フェーズで行うこと
```

保存先: `.claude/memory/phase-summaries/phase-N.md`

### 7. PR作成
```bash
git add .
git commit -m "feat: 機能の説明"
gh pr create --title "タイトル" --body "説明"
```

## コマンド一覧

| コマンド | 用途 |
|---------|------|
| `bun test` | テスト実行 |
| `bun run lint` | リント |
| `bun run format` | フォーマット |
| `bun run build` | ビルド |

## チェックリスト

実装完了時の確認事項：

- [ ] 全テストがパス
- [ ] 新機能のテストカバレッジ確保
- [ ] 型エラーなし
- [ ] リントエラーなし
- [ ] レビュー指摘対応完了
- [ ] phase-summary作成
