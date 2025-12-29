/**
 * セマンティック検索ページ
 *
 * 過去のセッションをセマンティック検索で探す。
 */
import { useEffect, useCallback, useState, FormEvent, memo } from "react";
import { Link } from "react-router-dom";
import { useSearchStore, SearchResult } from "../stores/searchStore";
import {
  SearchIcon,
  FolderIcon,
  CalendarIcon,
  ExclamationCircleIcon,
} from "../components/icons";

export function SearchPage() {
  const {
    query,
    setQuery,
    results,
    totalResults,
    isSearching,
    error,
    status,
    isLoadingStatus,
    search,
    fetchStatus,
    clearResults,
  } = useSearchStore();

  const [inputValue, setInputValue] = useState(query);

  // 初回マウント時にステータスを取得
  useEffect(() => {
    fetchStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 検索実行
  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        await search(inputValue);
      }
    },
    [inputValue, search]
  );

  // 検索クリア
  const handleClear = useCallback(() => {
    setInputValue("");
    clearResults();
  }, [clearResults]);

  // 関連スコアをパーセンテージ表示
  const formatScore = (score: number) => Math.round(score * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Search
        </h1>
        <p className="text-[var(--text-muted)] mt-1">
          Search your past sessions semantically
        </p>
      </header>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for topics, concepts, or keywords..."
            className="input pl-10 pr-20"
            disabled={!status?.available}
            aria-label="Search query"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-2">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={isSearching || !status?.available || !inputValue.trim()}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* ステータス表示 */}
      {isLoadingStatus ? (
        <div className="text-center py-8 text-[var(--text-muted)]">
          Loading search status...
        </div>
      ) : !status?.available ? (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-900">
                Search not available
              </h3>
              <p className="text-sm text-yellow-700 mt-1">{status?.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 検索結果 */}
          {error && (
            <div className="card bg-red-50 border-red-200 mb-6">
              <div className="flex items-center gap-2 text-red-600">
                <ExclamationCircleIcon className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-[var(--text-muted)]">
                  Results ({totalResults} found)
                </h2>
              </div>

              <div className="space-y-3">
                {results.map((result) => (
                  <SearchResultCard key={result.sessionId} result={result} />
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && !isSearching && !error && (
            <div className="text-center py-12">
              <SearchIcon className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--text-primary)]">
                No results found
              </h3>
              <p className="text-[var(--text-muted)] mt-1">
                Try different keywords or phrases
              </p>
            </div>
          )}

          {!query && results.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--text-primary)]">
                Search your sessions
              </h3>
              <p className="text-[var(--text-muted)] mt-1">
                Enter a query to find relevant past sessions
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-4">
                {status.indexedCount} sessions indexed
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** 検索結果カード */
const SearchResultCard = memo(function SearchResultCard({ result }: { result: SearchResult }) {
  const formatScore = (score: number) => Math.round(score * 100);

  return (
    <Link to={`/sessions/${result.sessionId}`} className="block">
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[var(--text-primary)] truncate">
              {result.sessionName}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
              {result.shortSummary}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                result.relevanceScore > 0.8
                  ? "bg-green-100 text-green-800"
                  : result.relevanceScore > 0.5
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {formatScore(result.relevanceScore)}% match
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});
