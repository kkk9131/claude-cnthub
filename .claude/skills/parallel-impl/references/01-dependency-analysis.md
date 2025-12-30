# 依存分析 (Phase 1)

## 入力ソース

```
Plans.md または Tasks.md のテーブル形式:
| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| L-01 | SessionIndex 型定義 | - | feature/... |
| L-02 | Level 0 API | L-01 | feature/... |
```

## 解析ロジック

### 1. タスク抽出（正規表現）

```javascript
// テーブル行からID・依存を抽出
/\|\s*([A-Z]-\d+)\s*\|.*\|\s*([A-Z]-\d+(?:,\s*[A-Z]-\d+)*)?\s*\|/
```

### 2. 依存グラフ構築

```typescript
type DependencyGraph = Map<string, string[]>;

// 例:
{
  "L-01": [],           // 依存なし
  "L-02": ["L-01"],     // L-01 に依存
  "M-03": ["M-02", "L-04"]  // クロスフェーズ依存
}
```

### 3. 並列可能グループ特定

```
Group A (依存なし):     [L-01, L-04, M-01, P-01]
Group B (Group A 依存): [L-02, L-03, M-02, ...]
```

## クロスフェーズ依存の検出

異なるフェーズ間の依存を特定:

```typescript
function detectCrossPhase(graph: DependencyGraph): CrossDep[] {
  return entries.filter(([task, deps]) =>
    deps.some(d => getPhase(d) !== getPhase(task))
  );
}
```

## 出力

```yaml
analysis:
  phases:
    - id: phase6
      tasks: [L-01, L-02, L-03, L-04, L-05, L-06]
      independent: [L-01, L-04]
    - id: phase7
      tasks: [M-01, M-02, M-03, M-04, M-05, M-06]
      independent: [M-01]
  cross_dependencies:
    - from: L-04
      to: M-03
  parallel_groups:
    - [phase6, phase7]  # 並列実行可能
```
