import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const MAX_MESSAGE_LENGTH = 10000;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  error?: boolean;
}

interface ChatViewProps {
  sessionId: string;
}

export function ChatView({ sessionId }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setError(null);
        const response = await fetch(`/api/sessions/${sessionId}/messages`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        setError("Unable to load messages. Please try again.");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_MESSAGE_LENGTH) {
        setInput(value);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || sending) return;

      const userMessage = input.trim();

      // Validate message length
      if (userMessage.length > MAX_MESSAGE_LENGTH) {
        setError(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`);
        return;
      }

      setInput("");
      setSending(true);
      setError(null);

      // Optimistic update
      const tempId = `temp-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: tempId,
          role: "user",
          content: userMessage,
          createdAt: new Date().toISOString(),
        },
      ]);

      try {
        const response = await fetch(`/api/sessions/${sessionId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: userMessage }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();
        setMessages((prev) =>
          prev.filter((m) => m.id !== tempId).concat(data.messages)
        );
      } catch (err) {
        console.error("Error sending message:", err);
        // Mark message as failed instead of removing
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, error: true } : m))
        );
        setError("Failed to send message. Please try again.");
      } finally {
        setSending(false);
      }
    },
    [input, sending, sessionId]
  );

  const handleRetry = useCallback(() => {
    setError(null);
    window.location.reload();
  }, []);

  if (loading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="p-3 bg-red-900/50 border-b border-red-800 text-red-200 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={handleRetry}
            className="text-red-300 hover:text-red-100 underline"
          >
            Retry
          </button>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-800"
        aria-label="Send message"
      >
        <div className="flex gap-3">
          <label htmlFor="chat-input" className="sr-only">
            Type your message
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="input flex-1"
            disabled={sending}
            maxLength={MAX_MESSAGE_LENGTH}
            aria-describedby="char-count"
          />
          <button
            type="submit"
            className="btn-primary px-6"
            disabled={!input.trim() || sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
        {input.length > MAX_MESSAGE_LENGTH * 0.9 && (
          <p id="char-count" className="text-xs text-gray-500 mt-1">
            {input.length}/{MAX_MESSAGE_LENGTH} characters
          </p>
        )}
      </form>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = memo(function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  const formattedTime = useMemo(
    () =>
      new Date(message.createdAt).toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [message.createdAt]
  );

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      role="article"
      aria-label={`Message from ${isUser ? "you" : "assistant"}`}
    >
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${
            message.error
              ? "bg-red-900/50 border border-red-700 text-red-200 rounded-br-md"
              : isUser
                ? "bg-primary-600 text-white rounded-br-md"
                : "bg-gray-800 text-gray-100 rounded-bl-md"
          }
        `}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        {message.error && (
          <span className="text-xs text-red-400 block mt-1">
            Failed to send
          </span>
        )}
        <span
          className={`
            text-xs mt-1 block
            ${message.error ? "text-red-400" : isUser ? "text-primary-200" : "text-gray-500"}
          `}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
});

function EmptyChat() {
  return (
    <div className="flex items-center justify-center h-full text-center">
      <div>
        <div
          className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
          aria-hidden="true"
        >
          <span className="text-3xl">💬</span>
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          Start the conversation
        </h3>
        <p className="text-gray-500">Type a message below to begin</p>
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div
      className="flex flex-col h-full"
      aria-busy="true"
      aria-label="Loading chat"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <div className="bg-gray-800 rounded-2xl px-4 py-3 w-64 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <div className="input flex-1 h-10 bg-gray-800 animate-pulse" />
          <div className="btn-primary w-20 h-10 bg-gray-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
