import { vi } from "vitest";
import { EMBEDDING_DIMENSIONS } from "@claude-cnthub/shared";

// Claude Agent SDK Mock
export const mockClaudeAgent = {
  query: vi.fn().mockResolvedValue({
    content: "Mocked Claude response",
  }),
  generateEmbedding: vi
    .fn()
    .mockResolvedValue(new Array(EMBEDDING_DIMENSIONS).fill(0.1)),
};

// Database Mock
export const createMockDatabase = () => ({
  run: vi.fn(),
  get: vi.fn(),
  all: vi.fn(),
  exec: vi.fn(),
  prepare: vi.fn().mockReturnValue({
    run: vi.fn(),
    get: vi.fn(),
    all: vi.fn(),
  }),
  close: vi.fn(),
});

// WebSocket Mock
export const createMockSocket = () => ({
  emit: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  disconnect: vi.fn(),
  connected: true,
});

// ID Generator Mock
export const mockIdGenerator = {
  generateSessionId: vi.fn().mockReturnValue("sess_mock123"),
  generateMessageId: vi.fn().mockReturnValue("msg_mock123"),
  generateSummaryId: vi.fn().mockReturnValue("sum_mock123"),
  generateWorkItemId: vi.fn().mockReturnValue("wi_mock123"),
};

// Reset all mocks helper
export const resetAllMocks = () => {
  vi.clearAllMocks();
};
