/**
 * Transcript Parser のテスト
 *
 * Claude Code のトランスクリプトファイル（JSONL）を解析し、
 * Message 型に変換する機能を検証。
 */

import { describe, it, expect } from "vitest";
import { homedir } from "os";

// テスト対象モジュール
import {
  validateTranscriptPath,
  parseTranscriptContent,
} from "./transcript-parser";

// テスト用のトランスクリプトデータ
const createMockTranscriptContent = (): string => {
  const lines = [
    JSON.stringify({
      type: "user",
      message: { role: "user", content: "認証機能を実装してください" },
      timestamp: "2024-12-28T10:00:00Z",
      uuid: "uuid-1",
    }),
    JSON.stringify({
      type: "assistant",
      message: {
        role: "assistant",
        content: [{ type: "text", text: "JWT認証を実装します。" }],
      },
      timestamp: "2024-12-28T10:01:00Z",
      uuid: "uuid-2",
    }),
    JSON.stringify({
      type: "assistant",
      message: {
        role: "assistant",
        content: [
          {
            type: "tool_use",
            id: "tool-1",
            name: "Write",
            input: { file_path: "src/auth.ts" },
          },
        ],
      },
      timestamp: "2024-12-28T10:02:00Z",
      uuid: "uuid-3",
    }),
    // sidechain エントリ（スキップされるべき）
    JSON.stringify({
      type: "assistant",
      message: { role: "assistant", content: "This is a sidechain message" },
      isSidechain: true,
      timestamp: "2024-12-28T10:03:00Z",
      uuid: "uuid-4",
    }),
  ];
  return lines.join("\n");
};

describe("Transcript Parser", () => {
  describe("validateTranscriptPath", () => {
    it("無効なパスを拒否する（null/undefined）", () => {
      const result = validateTranscriptPath(null as unknown as string);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Invalid file path");
    });

    it("空文字列を拒否する", () => {
      const result = validateTranscriptPath("");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Invalid file path");
    });

    it("~/.claude 外のパスを拒否する", () => {
      const result = validateTranscriptPath("/tmp/test.jsonl");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Path outside allowed directory");
    });

    it(".jsonl 以外の拡張子を拒否する", () => {
      const home = homedir();
      const result = validateTranscriptPath(`${home}/.claude/test.json`);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Invalid file extension");
    });

    it("存在しないファイルを拒否する", () => {
      const home = homedir();
      const result = validateTranscriptPath(
        `${home}/.claude/nonexistent.jsonl`
      );
      expect(result.valid).toBe(false);
      expect(result.error).toBe("File does not exist");
    });
  });

  describe("parseTranscriptContent", () => {
    it("有効なトランスクリプトをパースできる", () => {
      const content = createMockTranscriptContent();
      const messages = parseTranscriptContent(content, "sess-1");

      // sidechain を除いた3件がパースされる
      expect(messages.length).toBe(3);
      expect(messages[0].type).toBe("user");
      expect(messages[0].content).toBe("認証機能を実装してください");
      expect(messages[1].type).toBe("assistant");
      expect(messages[2].type).toBe("tool_use");
    });

    it("sidechain エントリをスキップする", () => {
      const lines = [
        JSON.stringify({
          type: "user",
          message: { role: "user", content: "Hello" },
          timestamp: "2024-12-28T10:00:00Z",
        }),
        JSON.stringify({
          type: "assistant",
          message: { role: "assistant", content: "Sidechain response" },
          isSidechain: true,
          timestamp: "2024-12-28T10:01:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      // sidechain がスキップされて1件のみ
      expect(messages.length).toBe(1);
      expect(messages[0].type).toBe("user");
    });

    it("空のトランスクリプトから空配列を返す", () => {
      const messages = parseTranscriptContent("", "sess-1");

      expect(messages).toEqual([]);
    });

    it("不正なJSONLを含む行をスキップする", () => {
      const lines = [
        JSON.stringify({
          type: "user",
          message: { role: "user", content: "Valid message" },
          timestamp: "2024-12-28T10:00:00Z",
        }),
        "this is not valid json",
        JSON.stringify({
          type: "assistant",
          message: {
            role: "assistant",
            content: [{ type: "text", text: "Another valid" }],
          },
          timestamp: "2024-12-28T10:01:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      // 不正な行をスキップして2件
      expect(messages.length).toBe(2);
    });

    it("各メッセージに正しいセッションIDが設定される", () => {
      const lines = [
        JSON.stringify({
          type: "user",
          message: { role: "user", content: "Test" },
          timestamp: "2024-12-28T10:00:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "my-session-id");

      expect(messages[0].sessionId).toBe("my-session-id");
    });

    it("tool_result メッセージを正しく処理する", () => {
      const lines = [
        JSON.stringify({
          type: "assistant",
          message: {
            role: "assistant",
            content: [
              {
                type: "tool_result",
                content: "File created successfully",
              },
            ],
          },
          timestamp: "2024-12-28T10:00:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      expect(messages.length).toBe(1);
      expect(messages[0].content).toBe("File created successfully");
    });

    it("ツール使用情報をJSON形式で保持する", () => {
      const lines = [
        JSON.stringify({
          type: "assistant",
          message: {
            role: "assistant",
            content: [
              {
                type: "tool_use",
                name: "Write",
                input: { file_path: "src/test.ts", content: "test" },
              },
            ],
          },
          timestamp: "2024-12-28T10:00:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      expect(messages.length).toBe(1);
      expect(messages[0].type).toBe("tool_use");
      const parsedContent = JSON.parse(messages[0].content);
      expect(parsedContent.tool).toBe("Write");
      expect(parsedContent.input.file_path).toBe("src/test.ts");
    });

    it("タイムスタンプが正しくパースされる", () => {
      const lines = [
        JSON.stringify({
          type: "user",
          message: { role: "user", content: "Test" },
          timestamp: "2024-12-28T10:00:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      expect(messages[0].timestamp).toBeInstanceOf(Date);
      expect(messages[0].timestamp.toISOString()).toBe(
        "2024-12-28T10:00:00.000Z"
      );
    });

    it("複数のテキストブロックを結合する", () => {
      const lines = [
        JSON.stringify({
          type: "assistant",
          message: {
            role: "assistant",
            content: [
              { type: "text", text: "First part." },
              { type: "text", text: "Second part." },
            ],
          },
          timestamp: "2024-12-28T10:00:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      expect(messages.length).toBe(1);
      expect(messages[0].content).toBe("First part.\nSecond part.");
    });

    it("空のコンテンツを持つエントリをスキップする", () => {
      const lines = [
        JSON.stringify({
          type: "assistant",
          message: {
            role: "assistant",
            content: [{ type: "text", text: "" }],
          },
          timestamp: "2024-12-28T10:00:00Z",
        }),
        JSON.stringify({
          type: "user",
          message: { role: "user", content: "Valid content" },
          timestamp: "2024-12-28T10:01:00Z",
        }),
      ];
      const content = lines.join("\n");

      const messages = parseTranscriptContent(content, "sess-1");

      expect(messages.length).toBe(1);
      expect(messages[0].content).toBe("Valid content");
    });
  });
});
