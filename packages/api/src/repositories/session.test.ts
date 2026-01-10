/**
 * セッションリポジトリ テスト
 *
 * TDD: Red-Green-Refactor
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { closeDatabase, runMigrations, execute } from "../db";
import { createSession, getSessionById, updateSessionTokens } from "./session";

// テスト用: インメモリDBを使用
process.env.DATABASE_PATH = ":memory:";

describe("Session Repository", () => {
  beforeAll(async () => {
    process.env.DATABASE_PATH = ":memory:";
    await runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    // 各テスト前にデータをクリア
    execute("DELETE FROM messages");
    execute("DELETE FROM sessions");
  });

  describe("updateSessionTokens", () => {
    it("セッションのトークン数を累積更新できる", async () => {
      // Arrange: セッションを作成
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      // Act: トークン数を更新
      const updated = updateSessionTokens(session.sessionId, {
        inputTokens: 100,
        outputTokens: 50,
      });

      // Assert: トークン数が更新されている
      expect(updated).not.toBeNull();
      expect(updated!.inputTokens).toBe(100);
      expect(updated!.outputTokens).toBe(50);
    });

    it("トークン数を累積できる", async () => {
      // Arrange: セッションを作成
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      // Act: 2回トークン数を更新
      updateSessionTokens(session.sessionId, {
        inputTokens: 100,
        outputTokens: 50,
      });
      const updated = updateSessionTokens(session.sessionId, {
        inputTokens: 200,
        outputTokens: 100,
      });

      // Assert: トークン数が累積されている
      expect(updated).not.toBeNull();
      expect(updated!.inputTokens).toBe(300); // 100 + 200
      expect(updated!.outputTokens).toBe(150); // 50 + 100
    });

    it("存在しないセッションにはnullを返す", async () => {
      // Act
      const updated = updateSessionTokens("ch_ss_9999", {
        inputTokens: 100,
        outputTokens: 50,
      });

      // Assert
      expect(updated).toBeNull();
    });

    it("Claude Code セッションID でもトークン更新できる", async () => {
      // Arrange: セッションを作成して Claude Code ID を紐付け
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });
      execute(
        "UPDATE sessions SET claude_session_id = ? WHERE session_id = ?",
        "claude-session-123",
        session.sessionId
      );

      // Act: Claude Code セッションID でトークン数を更新
      const updated = updateSessionTokens("claude-session-123", {
        inputTokens: 100,
        outputTokens: 50,
      });

      // Assert
      expect(updated).not.toBeNull();
      expect(updated!.inputTokens).toBe(100);
      expect(updated!.outputTokens).toBe(50);
    });

    it("初期値が0の場合でも正しく累積できる", async () => {
      // Arrange: セッションを作成（トークン数は0）
      const session = createSession({
        name: "Test Session",
        workingDir: "/tmp/test",
      });

      // Act: トークン数を更新
      const updated = updateSessionTokens(session.sessionId, {
        inputTokens: 1000,
        outputTokens: 500,
      });

      // Assert
      expect(updated).not.toBeNull();
      expect(updated!.inputTokens).toBe(1000);
      expect(updated!.outputTokens).toBe(500);

      // 再取得して確認
      const fetched = getSessionById(session.sessionId);
      expect(fetched?.inputTokens).toBe(1000);
      expect(fetched?.outputTokens).toBe(500);
    });
  });
});
