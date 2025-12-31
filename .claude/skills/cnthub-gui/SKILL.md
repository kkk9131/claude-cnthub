---
name: cnthub-gui
description: Web GUIを開いてセッション一覧・検索・マージ画面にアクセス。Use when user mentions /cnthub:gui, GUI, Web UI, 画面を開く, ダッシュボード, open UI, open dashboard.
allowed-tools: Bash
---

# cnthub:gui - Web GUI 起動スキル

Web GUI を開いて、セッション一覧・検索・マージ画面にアクセスします。

## 使用方法

```
/cnthub:gui              # ダッシュボード（セッション一覧）を開く
/cnthub:gui sessions     # セッション一覧を開く
/cnthub:gui search       # 検索画面を開く
/cnthub:gui merge        # マージ画面を開く
```

## 画面一覧

| 画面 | URL | 説明 |
|------|-----|------|
| ダッシュボード | `http://localhost:5173` | セッション一覧・概要 |
| セッション一覧 | `http://localhost:5173/sessions` | 全セッションの管理 |
| 検索 | `http://localhost:5173/search` | セマンティック検索 |
| マージ | `http://localhost:5173/merge` | セッションのマージ |

## 使用例

### ダッシュボードを開く

```
/cnthub:gui
```

### 検索画面を直接開く

```
/cnthub:gui search
```

### マージ画面を開く

```
/cnthub:gui merge
```

## 実行手順

このスキルが呼び出されたら、以下の手順で実行する:

### 1. 引数のパース

ユーザー入力から画面指定を抽出:
- `sessions`: セッション一覧
- `search`: 検索画面
- `merge`: マージ画面
- 指定なし: ダッシュボード（トップページ）

### 2. サーバー起動確認

```bash
# APIサーバーの状態確認
curl -s http://localhost:3048/api/health > /dev/null 2>&1 && echo "API: Running" || echo "API: Not running"

# Webサーバーの状態確認
curl -s http://localhost:5173 > /dev/null 2>&1 && echo "Web: Running" || echo "Web: Not running"
```

サーバーが起動していない場合:
```bash
# 開発サーバーを起動
cd /Users/kazuto/Desktop/claude-cnthub && bun run dev &
```

### 3. ブラウザで開く

```bash
# macOS
open http://localhost:5173

# セッション一覧
open http://localhost:5173/sessions

# 検索画面
open http://localhost:5173/search

# マージ画面
open http://localhost:5173/merge
```

### 4. 結果の報告

成功時:
```
[cnthub:gui] Web GUI を開きました
- URL: http://localhost:5173/search
- 画面: 検索
```

サーバー未起動時:
```
[cnthub:gui] サーバーが起動していません
- 対処法: `bun run dev` を実行してサーバーを起動してください
```

## 前提条件

- 開発サーバーが起動していること
  - API: `http://localhost:3048`
  - Web: `http://localhost:5173`
- 起動していない場合は `bun run dev` で起動

## トラブルシューティング

| 問題 | 原因 | 対処法 |
|------|------|--------|
| ページが開かない | サーバー未起動 | `bun run dev` を実行 |
| 接続拒否 | ポートが使用中 | 他のプロセスを終了 |
| 画面が表示されない | ビルドエラー | `bun run build` でエラー確認 |

## 関連スキル

- `/cnthub:add` - コンテキストを追加
- `/cnthub:search` - CLI で検索（GUI 不要）
- `/cnthub:context` - プロジェクトコンテキストを取得

## 参照

- Frontend実装: `packages/web/src/`
- ルーティング: `packages/web/src/App.tsx`
- 開発サーバー設定: `packages/web/vite.config.ts`
