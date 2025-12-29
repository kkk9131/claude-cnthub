import { useCallback, useEffect, useMemo, useState } from "react";

interface Summary {
  id: string;
  sessionId: string;
  content: string;
  decisions: string[];
  changedFiles: string[];
  createdAt: string;
}

interface SummaryPanelProps {
  sessionId: string;
}

export function SummaryPanel({ sessionId }: SummaryPanelProps) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setError(null);
        const response = await fetch(`/api/sessions/${sessionId}/summary`);
        if (response.ok) {
          const data = await response.json();
          setSummary(data.summary);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        // Don't show error for initial fetch - just means no summary yet
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [sessionId]);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    try {
      const response = await fetch(`/api/sessions/${sessionId}/summarize`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }
      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [sessionId]);

  const formattedDate = useMemo(() => {
    if (!summary) return "";
    return new Date(summary.createdAt).toLocaleString("ja-JP");
  }, [summary?.createdAt]);

  if (loading) {
    return <SummarySkeleton />;
  }

  if (!summary) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4">
          Summary
        </h3>
        {error && (
          <p className="text-red-600 text-sm mb-4" role="alert">
            {error}
          </p>
        )}
        <div className="text-center py-6">
          <p className="text-[var(--text-muted)] mb-4">
            No summary available yet
          </p>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[var(--text-primary)]">
          Summary
        </h3>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="btn-secondary text-sm"
        >
          {generating ? "Updating..." : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="prose prose-sm max-w-none">
        <p className="text-[var(--text-secondary)] whitespace-pre-wrap">
          {summary.content}
        </p>
      </div>

      {summary.decisions && summary.decisions.length > 0 && (
        <section aria-labelledby="decisions-heading">
          <h4
            id="decisions-heading"
            className="text-sm font-medium text-[var(--text-secondary)] mb-2"
          >
            Decisions
          </h4>
          <ul className="space-y-1">
            {summary.decisions.map((decision, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
              >
                <span className="text-primary-500" aria-hidden="true">
                  •
                </span>
                {decision}
              </li>
            ))}
          </ul>
        </section>
      )}

      {summary.changedFiles && summary.changedFiles.length > 0 && (
        <section aria-labelledby="files-heading">
          <h4
            id="files-heading"
            className="text-sm font-medium text-[var(--text-secondary)] mb-2"
          >
            Changed Files
          </h4>
          <div className="flex flex-wrap gap-2" role="list">
            {summary.changedFiles.map((file, i) => (
              <code
                key={i}
                role="listitem"
                className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded text-xs text-[var(--text-primary)] font-mono"
              >
                {file}
              </code>
            ))}
          </div>
        </section>
      )}

      <div className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
        <time dateTime={summary.createdAt}>Last updated: {formattedDate}</time>
      </div>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div
      className="card space-y-4"
      aria-busy="true"
      aria-label="Loading summary"
    >
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-[var(--bg-elevated)] rounded animate-pulse" />
        <div className="h-8 w-20 bg-[var(--bg-elevated)] rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-[var(--bg-elevated)] rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-[var(--bg-elevated)] rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-[var(--bg-elevated)] rounded animate-pulse" />
      </div>
    </div>
  );
}
