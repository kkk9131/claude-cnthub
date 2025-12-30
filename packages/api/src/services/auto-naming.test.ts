/**
 * セッション自動命名サービステスト (L-06)
 *
 * AI を使用してセッションに意味のある名前を自動生成する機能のテスト
 */

import { describe, it, expect } from "vitest";
import {
  generateSessionName,
  generateSessionNameFallback,
  type SessionNamingOptions,
} from "./auto-naming";
import type { ExtendedSessionSummary, Session } from "@claude-cnthub/shared";

describe("Auto-naming Service (L-06)", () => {
  describe("generateSessionNameFallback", () => {
    it("should generate name from short summary", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: "Implemented user authentication with JWT tokens",
        detailedSummary: "Details here",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should truncate long summaries", () => {
      const longSummary =
        "This is a very long summary that describes many things in great detail and should be truncated to fit within the maximum length allowed for session names";
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: longSummary,
        detailedSummary: "Details",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should use first topic when summary is empty", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: "",
        detailedSummary: "",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: ["authentication", "api"],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name.toLowerCase()).toContain("authentication");
    });

    it("should use first file path when summary and topics are empty", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: "",
        detailedSummary: "",
        keyDecisions: [],
        filesModified: ["packages/api/src/routes/sessions.ts"],
        toolsUsed: [],
        topics: [],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name.toLowerCase()).toContain("sessions");
    });

    it("should return default name when all fields are empty", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: "",
        detailedSummary: "",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(0);
    });

    it("should capitalize first letter", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        shortSummary: "implemented authentication",
        detailedSummary: "Details",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
      };

      const name = generateSessionNameFallback(
        summary as ExtendedSessionSummary
      );

      expect(name[0]).toBe(name[0].toUpperCase());
    });
  });

  describe("generateSessionName", () => {
    it("should use fallback when AI generation fails", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        shortSummary: "Added user login feature",
        detailedSummary: "Implemented login with email and password",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
        originalTokenCount: 100,
        summaryTokenCount: 10,
        compressionRatio: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      // Use useAI: false to test fallback path
      const name = await generateSessionName(
        summary as ExtendedSessionSummary,
        { useAI: false }
      );

      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(0);
    });

    it("should respect maxLength option", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        shortSummary:
          "This is a very long summary that would normally exceed the maximum length",
        detailedSummary: "Details",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
        originalTokenCount: 100,
        summaryTokenCount: 10,
        compressionRatio: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      const options: SessionNamingOptions = { maxLength: 30, useAI: false };
      const name = await generateSessionName(
        summary as ExtendedSessionSummary,
        options
      );

      expect(name.length).toBeLessThanOrEqual(30);
    });

    it("should use session.task when provided", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        shortSummary: "",
        detailedSummary: "",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
        originalTokenCount: 100,
        summaryTokenCount: 10,
        compressionRatio: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      const session: Partial<Session> = {
        sessionId: "sess_1",
        name: "Test Session",
        task: "Implement dark mode toggle",
        status: "completed",
        workingDir: "/tmp",
        continueChat: false,
        dangerouslySkipPermissions: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const name = await generateSessionName(
        summary as ExtendedSessionSummary,
        { session: session as Session, useAI: false }
      );

      expect(name.toLowerCase()).toContain("dark");
    });
  });

  describe("name format", () => {
    it("should not contain special characters except hyphen", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        shortSummary: "Fixed bug in auth/login module [URGENT]!",
        detailedSummary: "Details",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
        originalTokenCount: 100,
        summaryTokenCount: 10,
        compressionRatio: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      const name = await generateSessionName(
        summary as ExtendedSessionSummary,
        { useAI: false }
      );

      // Only allow alphanumeric, spaces, and hyphens
      expect(name).toMatch(/^[a-zA-Z0-9\s\-]+$/);
    });
  });
});
