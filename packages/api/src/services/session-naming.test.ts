/**
 * セッション名生成サービステスト (API-02)
 *
 * 初回メッセージからセッション名を AI で生成する機能のテスト
 */

import { describe, it, expect } from "vitest";
import {
  generateNameFromMessage,
  generateNameFromMessageFallback,
  type MessageNamingOptions,
} from "./session-naming";

describe("Session Naming Service (API-02)", () => {
  describe("generateNameFromMessageFallback", () => {
    it("should generate name from message content", () => {
      const message = "ユーザー認証機能を実装してください";

      const name = generateNameFromMessageFallback(message);

      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should truncate long messages to 50 characters", () => {
      const longMessage =
        "これは非常に長いメッセージです。APIのエンドポイントを実装して、データベースとの連携を行い、フロントエンドとの通信も確立する必要があります。セキュリティ対策も忘れずに。";

      const name = generateNameFromMessageFallback(longMessage);

      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should respect custom maxLength option", () => {
      const message = "ユーザー認証機能を実装してください";

      const name = generateNameFromMessageFallback(message, { maxLength: 20 });

      expect(name.length).toBeLessThanOrEqual(20);
    });

    it("should handle empty message", () => {
      const message = "";

      const name = generateNameFromMessageFallback(message);

      expect(name).toBe("Untitled Session");
    });

    it("should handle whitespace-only message", () => {
      const message = "   \n\t  ";

      const name = generateNameFromMessageFallback(message);

      expect(name).toBe("Untitled Session");
    });

    it("should capitalize first letter", () => {
      const message = "implement user authentication";

      const name = generateNameFromMessageFallback(message);

      expect(name[0]).toBe(name[0].toUpperCase());
    });

    it("should clean up special characters", () => {
      const message = "Fix bug in [auth/login] module!!!";

      const name = generateNameFromMessageFallback(message);

      // Only allow alphanumeric, spaces, and hyphens
      expect(name).toMatch(
        /^[a-zA-Z0-9\s\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/
      );
    });

    it("should handle Japanese text", () => {
      const message = "ログイン機能のバグを修正";

      const name = generateNameFromMessageFallback(message);

      expect(name.length).toBeGreaterThan(0);
      expect(name).toContain("ログイン");
    });

    it("should handle mixed Japanese and English", () => {
      const message = "API endpoint for ユーザー管理";

      const name = generateNameFromMessageFallback(message);

      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });
  });

  describe("generateNameFromMessage", () => {
    it("should use fallback when useAI is false", async () => {
      const message = "Create new feature for user dashboard";

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should respect maxLength option", async () => {
      const message =
        "This is a long message that describes a complex feature request";

      const options: MessageNamingOptions = { maxLength: 25, useAI: false };
      const name = await generateNameFromMessage(message, options);

      expect(name.length).toBeLessThanOrEqual(25);
    });

    it("should return fallback name for empty message", async () => {
      const message = "";

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).toBe("Untitled Session");
    });

    it("should handle message with newlines", async () => {
      const message = `First line of the message
Second line with more details
Third line continues`;

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });

    it("should handle message with code blocks", async () => {
      const message = `Fix this code:
\`\`\`typescript
function test() {
  return true;
}
\`\`\``;

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).toBeDefined();
      expect(name.length).toBeGreaterThan(0);
      expect(name.length).toBeLessThanOrEqual(50);
    });
  });

  describe("name format validation", () => {
    it("should produce clean name without leading/trailing spaces", async () => {
      const message = "  Implement feature  ";

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).not.toMatch(/^\s/);
      expect(name).not.toMatch(/\s$/);
    });

    it("should produce name with single spaces only", async () => {
      const message = "Implement   feature   with   spaces";

      const name = await generateNameFromMessage(message, { useAI: false });

      expect(name).not.toMatch(/\s{2,}/);
    });
  });
});
