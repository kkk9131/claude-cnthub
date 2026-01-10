/**
 * ヘルプモーダル
 *
 * 操作方法やショートカットを表示
 */

import { XMarkIcon, QuestionMarkCircleIcon } from "./icons";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpSection {
  title: string;
  items: { label: string; description: string }[];
}

const helpSections: HelpSection[] = [
  {
    title: "セッション管理",
    items: [
      {
        label: "セッション一覧",
        description: "左サイドバーで全セッションを確認",
      },
      {
        label: "セッション詳細",
        description: "セッションをクリックして詳細を表示",
      },
      {
        label: "セッション削除",
        description: "セッション右クリックまたはゴミ箱アイコン",
      },
    ],
  },
  {
    title: "ノードエディタ",
    items: [
      { label: "ノード追加", description: "セッションをドラッグ&ドロップ" },
      { label: "ノード接続", description: "ノードからノードへドラッグ" },
      { label: "接続削除", description: "接続線をクリックして削除" },
      {
        label: "移動・ズーム",
        description: "ドラッグで移動、スクロールでズーム",
      },
    ],
  },
  {
    title: "検索",
    items: [
      {
        label: "セマンティック検索",
        description: "ヘッダーの検索バーで自然言語検索",
      },
      {
        label: "フィルタリング",
        description: "ステータスやプロジェクトで絞り込み",
      },
    ],
  },
  {
    title: "Claude Code コマンド",
    items: [
      {
        label: "/cnthub:export",
        description: "現在のセッションをエクスポート",
      },
      {
        label: "/cnthub:get",
        description: "過去のセッションからコンテキストを取得",
      },
    ],
  },
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダル */}
      <div className="relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[560px] max-h-[80vh] overflow-hidden border border-[var(--border-default)]">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <QuestionMarkCircleIcon className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              操作ガイド
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="space-y-6">
            {helpSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-lg"
                    >
                      <span className="text-sm font-medium text-[var(--text-primary)] min-w-[120px]">
                        {item.label}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary-hover)] transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
