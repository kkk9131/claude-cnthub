import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ChatIcon, ClockIcon, ChevronRightIcon } from "./icons";

interface Session {
  id: string;
  title: string;
  status: "active" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

export function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch("/api/sessions");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      // Sanitize error message - don't expose technical details
      setError("Unable to load sessions. Please try again.");
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleRetry = useCallback(() => {
    fetchSessions();
  }, [fetchSessions]);

  if (loading) {
    return <SessionListSkeleton />;
  }

  if (error) {
    return (
      <div className="card text-center py-8" role="alert">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={handleRetry} className="btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="card text-center py-12">
        <div aria-hidden="true">
          <ChatIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          No sessions yet
        </h3>
        <p className="text-gray-500 mb-6">
          Start a new session to begin tracking your work
        </p>
        <button className="btn-primary">Create New Session</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Sessions</h2>
        <span
          className="text-sm text-gray-500"
          aria-label={`${sessions.length} sessions total`}
        >
          {sessions.length} total
        </span>
      </div>

      <div className="grid gap-3" role="list" aria-label="Session list">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: Session;
}

const statusLabels: Record<Session["status"], string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

const SessionCard = memo(function SessionCard({ session }: SessionCardProps) {
  const statusColors = useMemo(
    () => ({
      active: "bg-green-500",
      completed: "bg-blue-500",
      archived: "bg-gray-500",
    }),
    []
  );

  const formattedDate = useMemo(
    () =>
      new Date(session.updatedAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [session.updatedAt]
  );

  return (
    <button
      className="card hover:bg-gray-800/50 transition-colors w-full text-left group"
      role="listitem"
      aria-label={`Open session: ${session.title}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${statusColors[session.status]}`}
              role="status"
              aria-label={`Status: ${statusLabels[session.status]}`}
            />
            <h3 className="font-medium text-gray-100 truncate">
              {session.title}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <time dateTime={session.updatedAt}>{formattedDate}</time>
            </span>
            {session.messageCount !== undefined && (
              <span className="flex items-center gap-1">
                <ChatIcon className="w-4 h-4" />
                {session.messageCount} messages
              </span>
            )}
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
      </div>
    </button>
  );
});

function SessionListSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading sessions">
      <div className="flex items-center justify-between">
        <div className="h-7 w-24 bg-gray-800 rounded animate-pulse" />
        <div className="h-5 w-16 bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="grid gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-gray-700 rounded-full" />
                  <div className="h-5 w-48 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
