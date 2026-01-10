import { describe, it, expect } from "vitest";
import type {
  Session,
  SessionStatus,
  CreateSessionRequest,
  Message,
  MessageType,
  WorkItem,
  WorkItemStatus,
} from "../index";

describe("Type Definitions", () => {
  describe("Session", () => {
    it("should allow valid session object", () => {
      const session: Session = {
        sessionId: "sess_123",
        name: "Test Session",
        workingDir: "/path/to/project",
        status: "idle",
        continueChat: false,
        dangerouslySkipPermissions: false,
        inputTokens: 0,
        outputTokens: 0,
        hasIssues: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(session.sessionId).toBe("sess_123");
      expect(session.status).toBe("idle");
    });

    it("should allow optional fields", () => {
      const session: Session = {
        sessionId: "sess_123",
        name: "Test Session",
        workingDir: "/path/to/project",
        status: "processing",
        task: "Implement feature X",
        claudeSessionId: "claude_abc",
        workItemId: "wi_123",
        projectId: "proj_456",
        continueChat: true,
        dangerouslySkipPermissions: false,
        inputTokens: 100,
        outputTokens: 200,
        hasIssues: false,
        error: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(session.task).toBe("Implement feature X");
      expect(session.workItemId).toBe("wi_123");
    });
  });

  describe("SessionStatus", () => {
    it("should only allow valid status values", () => {
      const validStatuses: SessionStatus[] = [
        "idle",
        "processing",
        "completed",
        "error",
      ];

      validStatuses.forEach((status) => {
        expect(["idle", "processing", "completed", "error"]).toContain(status);
      });
    });
  });

  describe("CreateSessionRequest", () => {
    it("should require name and workingDir", () => {
      const request: CreateSessionRequest = {
        name: "New Session",
        workingDir: "/path/to/project",
      };

      expect(request.name).toBe("New Session");
      expect(request.workingDir).toBe("/path/to/project");
    });

    it("should allow optional fields", () => {
      const request: CreateSessionRequest = {
        name: "New Session",
        workingDir: "/path/to/project",
        task: "Build something",
        workItemId: "wi_123",
        continueChat: true,
        enableContextInjection: true,
      };

      expect(request.task).toBe("Build something");
      expect(request.enableContextInjection).toBe(true);
    });
  });

  describe("Message", () => {
    it("should allow valid message object", () => {
      const message: Message = {
        messageId: "msg_123",
        sessionId: "sess_123",
        type: "user",
        content: "Hello, Claude!",
        compressed: false,
        timestamp: new Date(),
      };

      expect(message.type).toBe("user");
      expect(message.content).toBe("Hello, Claude!");
    });

    it("should allow all message types", () => {
      const messageTypes: MessageType[] = [
        "user",
        "assistant",
        "system",
        "tool_use",
        "tool_result",
        "thinking",
        "error",
      ];

      messageTypes.forEach((type) => {
        const message: Message = {
          messageId: "msg_123",
          sessionId: "sess_123",
          type,
          content: "test",
          compressed: false,
          timestamp: new Date(),
        };
        expect(message.type).toBe(type);
      });
    });
  });

  describe("WorkItem", () => {
    it("should allow valid work item object", () => {
      const workItem: WorkItem = {
        workItemId: "wi_123",
        name: "Implement authentication",
        status: "in_progress",
        tags: [],
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(workItem.name).toBe("Implement authentication");
      expect(workItem.status).toBe("in_progress");
    });

    it("should allow all work item statuses", () => {
      const statuses: WorkItemStatus[] = [
        "planning",
        "in_progress",
        "review",
        "completed",
        "blocked",
      ];

      statuses.forEach((status) => {
        const workItem: WorkItem = {
          workItemId: "wi_123",
          name: "Test",
          status,
          tags: [],
          priority: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        expect(workItem.status).toBe(status);
      });
    });
  });
});
