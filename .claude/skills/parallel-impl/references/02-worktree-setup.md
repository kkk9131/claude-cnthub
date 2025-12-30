# Worktree 準備 (Phase 2)

## ブランチ命名規則

```
feature/{phase}-{description}-{YYYYMMDD}
例: feature/phase6-disclosure-20251231
```

## Worktree 作成

```bash
# 各フェーズ用に作成
git worktree add ../{project}-{phase} -b {branch}

# 例
git worktree add ../claude-cnthub-phase6 -b feature/phase6-disclosure-20251231
git worktree add ../claude-cnthub-phase7 -b feature/phase7-merge-20251231
```

## 設定コピー

```bash
# 必須ファイルをコピー
cp -r .claude/ ../{project}-{phase}/
cp .env* ../{project}-{phase}/ 2>/dev/null || true
cp package.json bun.lock ../{project}-{phase}/ 2>/dev/null || true
```

## 依存シグナルファイル初期化

```bash
mkdir -p ../{project}-{phase}/.claude/state
touch ../{project}-{phase}/.claude/state/dependency-signals.txt
```

## 依存監視フック設置

`.claude/hooks/post-edit.sh` に追加:

```bash
# 動的依存ルール
DEPENDENCY_RULES='L-04:M-03'

# Plans.md 更新時にシグナル発行
if grep -q "\[x\].*${TASK_ID}" Plans.md 2>/dev/null; then
  SIGNAL_FILE=".claude/state/dependency-signals.txt"
  echo "${TASK_ID}_COMPLETE:$(date +%Y-%m-%dT%H:%M:%S)" >> "$SIGNAL_FILE"
fi
```

## 検証

```bash
# Worktree 一覧確認
git worktree list

# 出力例:
# /Users/user/project          abc1234 [master]
# /Users/user/project-phase6   def5678 [feature/phase6-...]
# /Users/user/project-phase7   ghi9012 [feature/phase7-...]
```
