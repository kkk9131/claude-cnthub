/**
 * タグ自動抽出サービステスト (L-05)
 *
 * AI を使用して要約からタグを自動抽出する機能のテスト
 */

import { describe, it, expect } from "vitest";
import {
  extractTags,
  extractTagsFromSummary,
  extractTagsFallback,
  type TagExtractionOptions,
} from "./auto-tagging";
import type { ExtendedSessionSummary } from "@claude-cnthub/shared";

describe("Auto-tagging Service (L-05)", () => {
  describe("extractTagsFallback", () => {
    it("should extract tags from topics", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: ["api", "authentication", "jwt"],
        shortSummary: "Implemented authentication",
        detailedSummary: "Added JWT-based authentication",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);

      expect(tags).toContain("api");
      expect(tags).toContain("authentication");
      expect(tags).toContain("jwt");
    });

    it("should extract tags from key decisions", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: [],
        shortSummary: "Added feature",
        detailedSummary: "Implemented new feature",
        keyDecisions: ["Use TypeScript", "Choose React for UI"],
        filesModified: [],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);

      expect(tags).toContain("typescript");
      expect(tags).toContain("react");
    });

    it("should extract tags from file paths", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: [],
        shortSummary: "Updated API",
        detailedSummary: "Modified API routes",
        keyDecisions: [],
        filesModified: [
          "packages/api/src/routes/sessions.ts",
          "packages/web/src/components/Button.tsx",
        ],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);

      expect(tags).toContain("api");
      expect(tags).toContain("routes");
      expect(tags).toContain("web");
      expect(tags).toContain("components");
    });

    it("should limit tags to maxTags option", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
        shortSummary: "Test",
        detailedSummary: "Test",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary, {
        maxTags: 3,
      });

      expect(tags.length).toBeLessThanOrEqual(3);
    });

    it("should normalize tags to lowercase", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: ["API", "Authentication", "JWT"],
        shortSummary: "Test",
        detailedSummary: "Test",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);

      expect(tags).toEqual(
        expect.arrayContaining(["api", "authentication", "jwt"])
      );
    });

    it("should remove duplicate tags", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: ["api", "API", "Api"],
        shortSummary: "API work",
        detailedSummary: "More API work",
        keyDecisions: ["Use API"],
        filesModified: ["api/route.ts"],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);
      const apiCount = tags.filter((t) => t === "api").length;

      expect(apiCount).toBe(1);
    });

    it("should return empty array for empty summary", () => {
      const summary: Partial<ExtendedSessionSummary> = {
        topics: [],
        shortSummary: "",
        detailedSummary: "",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
      };

      const tags = extractTagsFallback(summary as ExtendedSessionSummary);

      expect(tags).toEqual([]);
    });
  });

  describe("extractTagsFromSummary", () => {
    it("should extract common technical terms", () => {
      const shortSummary = "Implemented REST API with authentication";
      const detailedSummary =
        "Added JWT-based authentication using OAuth2 flow. Also added rate limiting middleware.";

      const tags = extractTagsFromSummary(shortSummary, detailedSummary);

      expect(tags).toContain("rest");
      expect(tags).toContain("api");
      expect(tags).toContain("authentication");
      expect(tags).toContain("jwt");
      expect(tags).toContain("oauth2");
    });

    it("should extract feature-related terms", () => {
      const shortSummary = "Added dark mode toggle";
      const detailedSummary =
        "Implemented dark mode feature with CSS variables and local storage persistence.";

      const tags = extractTagsFromSummary(shortSummary, detailedSummary);

      expect(tags).toContain("dark-mode");
      expect(tags).toContain("css");
    });

    it("should extract framework/library names", () => {
      const shortSummary = "Updated React components";
      const detailedSummary =
        "Refactored components using TypeScript and Tailwind CSS";

      const tags = extractTagsFromSummary(shortSummary, detailedSummary);

      expect(tags).toContain("react");
      expect(tags).toContain("typescript");
      expect(tags).toContain("tailwind");
    });
  });

  describe("extractTags", () => {
    it("should use fallback when AI extraction fails", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        topics: ["api", "test"],
        shortSummary: "Test summary",
        detailedSummary: "Detailed test summary",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
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
      const tags = await extractTags(summary as ExtendedSessionSummary, {
        useAI: false,
      });

      expect(tags).toContain("api");
      expect(tags).toContain("test");
    });

    it("should respect maxTags option", async () => {
      const summary: Partial<ExtendedSessionSummary> = {
        summaryId: "sum_1",
        sessionId: "sess_1",
        topics: ["tag1", "tag2", "tag3", "tag4", "tag5"],
        shortSummary: "Test",
        detailedSummary: "Test",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        originalTokenCount: 100,
        summaryTokenCount: 10,
        compressionRatio: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      const options: TagExtractionOptions = { maxTags: 3, useAI: false };
      const tags = await extractTags(
        summary as ExtendedSessionSummary,
        options
      );

      expect(tags.length).toBeLessThanOrEqual(3);
    });
  });
});
