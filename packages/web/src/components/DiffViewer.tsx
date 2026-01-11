/**
 * Diff ビューアーコンポーネント
 *
 * 変更前後のコンテンツを比較表示する
 */

import { useMemo } from "react";

interface DiffViewerProps {
  /** 元のコンテンツ */
  original: string;
  /** 変更後のコンテンツ */
  modified: string;
  /** ファイル名（表示用） */
  fileName?: string;
}

interface DiffLine {
  type: "unchanged" | "added" | "removed";
  content: string;
  lineNumber: { original?: number; modified?: number };
}

/**
 * シンプルな行単位のDiff計算
 */
function computeDiff(original: string, modified: string): DiffLine[] {
  const originalLines = original.split("\n");
  const modifiedLines = modified.split("\n");
  const diffLines: DiffLine[] = [];

  // LCS (Longest Common Subsequence) の簡易実装
  const lcs = computeLCS(originalLines, modifiedLines);

  let origIdx = 0;
  let modIdx = 0;
  let lcsIdx = 0;

  while (origIdx < originalLines.length || modIdx < modifiedLines.length) {
    if (
      lcsIdx < lcs.length &&
      origIdx < originalLines.length &&
      originalLines[origIdx] === lcs[lcsIdx]
    ) {
      if (
        modIdx < modifiedLines.length &&
        modifiedLines[modIdx] === lcs[lcsIdx]
      ) {
        // 共通行
        diffLines.push({
          type: "unchanged",
          content: lcs[lcsIdx],
          lineNumber: { original: origIdx + 1, modified: modIdx + 1 },
        });
        origIdx++;
        modIdx++;
        lcsIdx++;
      } else {
        // 追加行
        diffLines.push({
          type: "added",
          content: modifiedLines[modIdx],
          lineNumber: { modified: modIdx + 1 },
        });
        modIdx++;
      }
    } else if (origIdx < originalLines.length) {
      // 削除行
      diffLines.push({
        type: "removed",
        content: originalLines[origIdx],
        lineNumber: { original: origIdx + 1 },
      });
      origIdx++;
    } else if (modIdx < modifiedLines.length) {
      // 追加行
      diffLines.push({
        type: "added",
        content: modifiedLines[modIdx],
        lineNumber: { modified: modIdx + 1 },
      });
      modIdx++;
    }
  }

  return diffLines;
}

/**
 * LCS (Longest Common Subsequence) 計算
 */
function computeLCS(arr1: string[], arr2: string[]): string[] {
  const m = arr1.length;
  const n = arr2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 逆追跡でLCSを構築
  const lcs: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

export function DiffViewer({ original, modified, fileName }: DiffViewerProps) {
  const diffLines = useMemo(
    () => computeDiff(original, modified),
    [original, modified]
  );

  const stats = useMemo(() => {
    const added = diffLines.filter((l) => l.type === "added").length;
    const removed = diffLines.filter((l) => l.type === "removed").length;
    return { added, removed };
  }, [diffLines]);

  return (
    <div className="bg-[var(--bg-base)] rounded-lg overflow-hidden border border-[var(--border-default)]">
      {/* ヘッダー */}
      {fileName && (
        <div className="px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between">
          <span className="text-sm font-mono text-[var(--text-secondary)]">
            {fileName}
          </span>
          <div className="flex gap-3 text-xs">
            <span className="text-green-400">+{stats.added}</span>
            <span className="text-red-400">-{stats.removed}</span>
          </div>
        </div>
      )}

      {/* Diff 表示 */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <tbody>
            {diffLines.map((line, index) => (
              <tr
                key={index}
                className={`
                  ${line.type === "added" ? "bg-green-500/10" : ""}
                  ${line.type === "removed" ? "bg-red-500/10" : ""}
                `}
              >
                {/* 行番号 */}
                <td className="w-10 px-2 py-0.5 text-right text-[var(--text-muted)] select-none border-r border-[var(--border-subtle)]">
                  {line.lineNumber.original || ""}
                </td>
                <td className="w-10 px-2 py-0.5 text-right text-[var(--text-muted)] select-none border-r border-[var(--border-subtle)]">
                  {line.lineNumber.modified || ""}
                </td>

                {/* 変更タイプ */}
                <td className="w-6 px-1 py-0.5 text-center select-none">
                  {line.type !== "unchanged" && (
                    <span
                      className={
                        line.type === "added"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {line.type === "added" ? "+" : "-"}
                    </span>
                  )}
                </td>

                {/* コンテンツ */}
                <td className="px-2 py-0.5 whitespace-pre text-[var(--text-primary)]">
                  {line.content || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
