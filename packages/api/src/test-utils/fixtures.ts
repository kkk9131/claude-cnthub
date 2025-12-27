import type {
  Session,
  CreateSessionRequest,
  Message,
  SessionSummary,
  WorkItem,
} from "@claude-cnthub/shared";

// Session Fixtures
export const createSessionFixture = (
  overrides: Partial<Session> = {},
): Session => ({
  sessionId: "sess_test123",
  name: "Test Session",
  workingDir: "/tmp/test",
  status: "idle",
  continueChat: false,
  dangerouslySkipPermissions: false,
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
  ...overrides,
});

export const createSessionRequestFixture = (
  overrides: Partial<CreateSessionRequest> = {},
): CreateSessionRequest => ({
  name: "Test Session",
  workingDir: "/tmp/test",
  ...overrides,
});

// Message Fixtures
export const createMessageFixture = (
  overrides: Partial<Message> = {},
): Message => ({
  messageId: "msg_test123",
  sessionId: "sess_test123",
  type: "user",
  content: "Test message content",
  timestamp: new Date("2024-01-01T00:00:00Z"),
  ...overrides,
});

export const messageFixtures: Message[] = [
  createMessageFixture({ type: "user", content: "Hello" }),
  createMessageFixture({
    messageId: "msg_test456",
    type: "assistant",
    content: "Hi there!",
  }),
];

// Summary Fixtures
export const createSummaryFixture = (
  overrides: Partial<SessionSummary> = {},
): SessionSummary => ({
  summaryId: "sum_test123",
  sessionId: "sess_test123",
  shortSummary: "Test session summary",
  detailedSummary: "This is a detailed summary of the test session.",
  keyDecisions: ["Decision 1", "Decision 2"],
  filesModified: ["src/test.ts"],
  toolsUsed: ["Write", "Read"],
  topics: ["testing", "setup"],
  originalTokenCount: 1000,
  summaryTokenCount: 100,
  compressionRatio: 10,
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
  ...overrides,
});

// Work Item Fixtures
export const createWorkItemFixture = (
  overrides: Partial<WorkItem> = {},
): WorkItem => ({
  workItemId: "wi_test123",
  name: "Test Work Item",
  status: "planning",
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-01T00:00:00Z"),
  ...overrides,
});
