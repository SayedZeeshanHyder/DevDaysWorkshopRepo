import { describe, expect, it } from "vitest";
import type { CartItem, CheckoutDetails, Product } from "../types";
import { createOrder, isValidEmail, isValidPostalCode } from "./checkout";

const product: Product = {
  id: "test",
  title: "Test product",
  description: "",
  category: "home",
  price: 25,
  rating: 5,
  stock: 3,
  image: ""
};

const details: CheckoutDetails = {
  email: "buyer@example.org",
  postalCode: "12345",
  deliveryMethod: "standard"
};

const items: CartItem[] = [{ product, quantity: 1 }];

describe("checkout identity requirements", () => {
  it("accepts a standard customer contact address", () => {
    expect(isValidEmail("buyer@example.org")).toBe(true);
  });

  describe("delivery address requirements", () => {
    it("rejects a postal code containing non-numeric characters", () => {
      expect(isValidPostalCode("12A45")).toBe(false);
    });

    it("accepts a five-digit postal code", () => {
      expect(isValidPostalCode("12345")).toBe(true);
    });
  });

  it("rejects an incomplete contact address", () => {
    expect(isValidEmail("buyer@")).toBe(false);
    expect(isValidEmail("buyer.example.com")).toBe(false);
  });

  it("rejects zero-quantity and over-stock orders", () => {
    expect(() => createOrder(details, [{ product, quantity: 0 }], "")).toThrow(/quantities/i);
    expect(() => createOrder(details, [{ product, quantity: 4 }], "")).toThrow(/quantities/i);
    expect(() => createOrder(details, [
      { product, quantity: 2 },
      { product, quantity: 2 }
    ], "")).toThrow(/quantities/i);
  });

  it("creates an order for valid checkout details", () => {
    expect(createOrder(details, items, "").items).toEqual(items);
  });
});
