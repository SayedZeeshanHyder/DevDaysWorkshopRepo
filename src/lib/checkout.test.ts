import { describe, expect, it } from "vitest";
import { isValidEmail, isValidPostalCode } from "./checkout";

describe("checkout identity requirements", () => {
  it("accepts a standard customer contact address", () => {
    expect(isValidEmail("buyer@example.org")).toBe(true);
  });

  describe("delivery address requirements", () => {
    it("rejects a postal code containing non-numeric characters", () => {
      expect(isValidPostalCode("12A45")).toBe(false);
    });
  });

  it("rejects an incomplete contact address", () => {
    expect(isValidEmail("buyer@")).toBe(false);
    expect(isValidEmail("buyer.example.com")).toBe(false);
  });
});
