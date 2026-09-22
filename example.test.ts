import { describe, expect, it } from "vitest";

describe("addition", () => {
  it("doit additionner deux nombres", () => {
    const result = 2 + 3;

    expect(result).toBe(5);
  });
});