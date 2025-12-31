import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  ID_PREFIXES,
  generateSequentialId,
  parseId,
  isValidId,
  ID_LENGTH,
  getNextSequence,
} from "../utils/id-generator";

describe("ID Generator", () => {
  describe("ID_PREFIXES", () => {
    it("should have correct prefixes for all entity types", () => {
      expect(ID_PREFIXES.SESSION).toBe("ch_ss");
      expect(ID_PREFIXES.MERGE).toBe("ch_mg");
      expect(ID_PREFIXES.PROJECT).toBe("ch_pj");
      expect(ID_PREFIXES.OBSERVATION).toBe("ch_ob");
    });

    it("should have exactly 4 entity types", () => {
      expect(Object.keys(ID_PREFIXES)).toHaveLength(4);
    });
  });

  describe("ID_LENGTH", () => {
    it("should be 4 digits", () => {
      expect(ID_LENGTH).toBe(4);
    });
  });

  describe("generateSequentialId", () => {
    it("should generate ID with correct prefix for session", () => {
      const id = generateSequentialId("SESSION", 1);
      expect(id).toBe("ch_ss_0001");
    });

    it("should generate ID with correct prefix for merge", () => {
      const id = generateSequentialId("MERGE", 1);
      expect(id).toBe("ch_mg_0001");
    });

    it("should generate ID with correct prefix for project", () => {
      const id = generateSequentialId("PROJECT", 1);
      expect(id).toBe("ch_pj_0001");
    });

    it("should generate ID with correct prefix for observation", () => {
      const id = generateSequentialId("OBSERVATION", 1);
      expect(id).toBe("ch_ob_0001");
    });

    it("should zero-pad sequence numbers correctly", () => {
      expect(generateSequentialId("SESSION", 1)).toBe("ch_ss_0001");
      expect(generateSequentialId("SESSION", 12)).toBe("ch_ss_0012");
      expect(generateSequentialId("SESSION", 123)).toBe("ch_ss_0123");
      expect(generateSequentialId("SESSION", 1234)).toBe("ch_ss_1234");
    });

    it("should handle sequence number 9999", () => {
      const id = generateSequentialId("SESSION", 9999);
      expect(id).toBe("ch_ss_9999");
    });

    it("should throw error for sequence number 0", () => {
      expect(() => generateSequentialId("SESSION", 0)).toThrow(
        "Sequence number must be between 1 and 9999"
      );
    });

    it("should throw error for negative sequence number", () => {
      expect(() => generateSequentialId("SESSION", -1)).toThrow(
        "Sequence number must be between 1 and 9999"
      );
    });

    it("should throw error for sequence number > 9999", () => {
      expect(() => generateSequentialId("SESSION", 10000)).toThrow(
        "Sequence number must be between 1 and 9999"
      );
    });

    it("should throw error for invalid entity type", () => {
      // @ts-expect-error Testing invalid input
      expect(() => generateSequentialId("INVALID", 1)).toThrow(
        "Invalid entity type: INVALID"
      );
    });
  });

  describe("parseId", () => {
    it("should parse valid session ID", () => {
      const result = parseId("ch_ss_0042");
      expect(result).toEqual({
        entityType: "SESSION",
        prefix: "ch_ss",
        sequence: 42,
      });
    });

    it("should parse valid merge ID", () => {
      const result = parseId("ch_mg_0001");
      expect(result).toEqual({
        entityType: "MERGE",
        prefix: "ch_mg",
        sequence: 1,
      });
    });

    it("should parse valid project ID", () => {
      const result = parseId("ch_pj_1234");
      expect(result).toEqual({
        entityType: "PROJECT",
        prefix: "ch_pj",
        sequence: 1234,
      });
    });

    it("should parse valid observation ID", () => {
      const result = parseId("ch_ob_9999");
      expect(result).toEqual({
        entityType: "OBSERVATION",
        prefix: "ch_ob",
        sequence: 9999,
      });
    });

    it("should return null for invalid ID format", () => {
      expect(parseId("invalid")).toBeNull();
      expect(parseId("ch_ss_")).toBeNull();
      expect(parseId("ch_ss_abc")).toBeNull();
      expect(parseId("ch_ss_123")).toBeNull(); // Too short
      expect(parseId("ch_ss_12345")).toBeNull(); // Too long
    });

    it("should return null for unknown prefix", () => {
      expect(parseId("ch_xx_0001")).toBeNull();
    });

    it("should return null for legacy UUID format", () => {
      expect(parseId("sess-550e8400-e29b-41d4-a716-446655440000")).toBeNull();
    });
  });

  describe("isValidId", () => {
    it("should return true for valid session ID", () => {
      expect(isValidId("ch_ss_0001")).toBe(true);
      expect(isValidId("ch_ss_9999")).toBe(true);
    });

    it("should return true for valid merge ID", () => {
      expect(isValidId("ch_mg_0001")).toBe(true);
    });

    it("should return true for valid project ID", () => {
      expect(isValidId("ch_pj_0001")).toBe(true);
    });

    it("should return true for valid observation ID", () => {
      expect(isValidId("ch_ob_0001")).toBe(true);
    });

    it("should return false for invalid IDs", () => {
      expect(isValidId("invalid")).toBe(false);
      expect(isValidId("")).toBe(false);
      expect(isValidId("ch_ss_0000")).toBe(false); // 0 is invalid
      expect(isValidId("ch_xx_0001")).toBe(false); // Unknown prefix
    });

    it("should optionally validate specific entity type", () => {
      expect(isValidId("ch_ss_0001", "SESSION")).toBe(true);
      expect(isValidId("ch_ss_0001", "MERGE")).toBe(false);
      expect(isValidId("ch_mg_0001", "MERGE")).toBe(true);
    });
  });

  describe("getNextSequence", () => {
    it("should return 1 for empty existing IDs array", () => {
      expect(getNextSequence([])).toBe(1);
    });

    it("should return next sequence after max existing ID", () => {
      expect(getNextSequence(["ch_ss_0001"])).toBe(2);
      expect(getNextSequence(["ch_ss_0001", "ch_ss_0005"])).toBe(6);
      expect(getNextSequence(["ch_ss_0100", "ch_ss_0050", "ch_ss_0075"])).toBe(
        101
      );
    });

    it("should ignore invalid IDs in the array", () => {
      expect(getNextSequence(["invalid", "ch_ss_0003", "not-an-id"])).toBe(4);
    });

    it("should handle mixed entity types", () => {
      // Should only consider the sequences, regardless of entity type
      expect(getNextSequence(["ch_ss_0001", "ch_mg_0002", "ch_ob_0003"])).toBe(
        4
      );
    });

    it("should throw error if max sequence is 9999", () => {
      expect(() => getNextSequence(["ch_ss_9999"])).toThrow(
        "Maximum sequence number (9999) reached"
      );
    });
  });
});
