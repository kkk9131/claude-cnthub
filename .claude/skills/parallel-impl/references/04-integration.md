# 統合 (Phase 5)

## 1. 競合チェック

```bash
# 各 worktree の変更ファイル取得
cd ../{project}-{phase}
CHANGED=$(git diff main --name-only)

# 他の worktree と比較
for other in ../{project}-{other_phase}; do
  OTHER_CHANGED=$(cd $other && git diff main --name-only)
  CONFLICTS=$(comm -12 <(echo "$CHANGED" | sort) <(echo "$OTHER_CHANGED" | sort))

  if [ -n "$CONFLICTS" ]; then
    echo "⚠️ 競合検出: $CONFLICTS"
  fi
done
```

## 2. マージ戦略

### 競合なし → 自動マージ

```bash
git checkout main
git merge --no-ff feature/phase6-... -m "feat(phase6): Disclosure system"
git merge --no-ff feature/phase7-... -m "feat(phase7): Merge system"
```

### 競合あり → 手動解決

```
1. ユーザーに通知
2. 解決方法を提案:
   - rebase で順序調整
   - 手動マージ
   - 一方を優先
```

## 3. Worktree クリーンアップ

```bash
# Worktree 削除
git worktree remove ../{project}-phase6
git worktree remove ../{project}-phase7

# ブランチ削除（マージ済みの場合）
git branch -d feature/phase6-...
git branch -d feature/phase7-...

# 確認
git worktree list
git branch -a
```

## 4. Plans.md 更新

```bash
# 完了マーク追加
sed -i 's/Phase 6.*TODO/Phase 6 ✅/' Plans.md
sed -i 's/Phase 7.*TODO/Phase 7 ✅/' Plans.md
```

## 5. 完了レポート

```
✅ 並列実装完了

Phase 6: 段階的開示システム
  - L-01〜L-06 完了
  - コミット: abc1234, def5678, ...

Phase 7: マージシステム
  - M-01〜M-06 完了
  - コミット: ghi9012, jkl3456, ...

競合: なし
マージ先: main
```
