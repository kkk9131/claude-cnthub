import { describe, it, expect } from "vitest";
import {
  API_PORT,
  WEB_PORT,
  HOOK_SERVER_PORT,
  SESSION_STATUS,
  MESSAGE_TYPE,
  WORK_ITEM_STATUS,
  EMBEDDING_DIMENSIONS,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  ERROR_CODE,
} from "../constants";

describe("Constants", () => {
  describe("Server Ports", () => {
    it("should have correct API port", () => {
      expect(API_PORT).toBe(3001);
    });

    it("should have correct WEB port", () => {
      expect(WEB_PORT).toBe(5173);
    });

    it("should have correct HOOK_SERVER port", () => {
      expect(HOOK_SERVER_PORT).toBe(37778);
    });
  });

  describe("SESSION_STATUS", () => {
    it("should have all required status values", () => {
      expect(SESSION_STATUS.IDLE).toBe("idle");
      expect(SESSION_STATUS.PROCESSING).toBe("processing");
      expect(SESSION_STATUS.COMPLETED).toBe("completed");
      expect(SESSION_STATUS.ERROR).toBe("error");
    });

    it("should have exactly 4 status values", () => {
      expect(Object.keys(SESSION_STATUS)).toHaveLength(4);
    });
  });

  describe("MESSAGE_TYPE", () => {
    it("should have all required message types", () => {
      expect(MESSAGE_TYPE.USER).toBe("user");
      expect(MESSAGE_TYPE.ASSISTANT).toBe("assistant");
      expect(MESSAGE_TYPE.SYSTEM).toBe("system");
      expect(MESSAGE_TYPE.TOOL_USE).toBe("tool_use");
      expect(MESSAGE_TYPE.TOOL_RESULT).toBe("tool_result");
      expect(MESSAGE_TYPE.THINKING).toBe("thinking");
      expect(MESSAGE_TYPE.ERROR).toBe("error");
    });
  });

  describe("WORK_ITEM_STATUS", () => {
    it("should have all required work item statuses", () => {
      expect(WORK_ITEM_STATUS.PLANNING).toBe("planning");
      expect(WORK_ITEM_STATUS.IN_PROGRESS).toBe("in_progress");
      expect(WORK_ITEM_STATUS.REVIEW).toBe("review");
      expect(WORK_ITEM_STATUS.COMPLETED).toBe("completed");
      expect(WORK_ITEM_STATUS.BLOCKED).toBe("blocked");
    });
  });

  describe("Vector Embedding", () => {
    it("should have correct embedding dimensions for sqlite-vec", () => {
      expect(EMBEDDING_DIMENSIONS).toBe(384);
    });
  });

  describe("Pagination", () => {
    it("should have sensible default page size", () => {
      expect(DEFAULT_PAGE_SIZE).toBe(20);
      expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
    });

    it("should have max page size greater than default", () => {
      expect(MAX_PAGE_SIZE).toBe(100);
      expect(MAX_PAGE_SIZE).toBeGreaterThan(DEFAULT_PAGE_SIZE);
    });
  });

  describe("ERROR_CODE", () => {
    it("should have all required error codes", () => {
      expect(ERROR_CODE.VALIDATION_ERROR).toBe("VALIDATION_ERROR");
      expect(ERROR_CODE.SESSION_NOT_FOUND).toBe("SESSION_NOT_FOUND");
      expect(ERROR_CODE.WORK_ITEM_NOT_FOUND).toBe("WORK_ITEM_NOT_FOUND");
      expect(ERROR_CODE.SESSION_BUSY).toBe("SESSION_BUSY");
      expect(ERROR_CODE.INTERNAL_ERROR).toBe("INTERNAL_ERROR");
    });
  });
});
