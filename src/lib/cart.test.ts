import { describe, expect, it } from "vitest";
import type { CartState, Product } from "../types";
import {
  addToCart,
  cartCount,
  discountAmount,
  removeFromCart,
  setQuantity,
  shippingAmount,
  subtotal,
  taxAmount
} from "./cart";

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

const state: CartState = { items: [{ product, quantity: 2 }], coupon: "" };

describe("basket behavior", () => {
  it("maintains quantities during repeat product interactions", () => {
    expect(addToCart(state, product).items[0].quantity).toBe(3);
  });

  it("does not add more units than are in stock", () => {
    const fullState = { ...state, items: [{ product, quantity: product.stock }] };
    expect(addToCart(fullState, product)).toBe(fullState);
  });

  it("preserves unrelated basket lines", () => {
    const other = { ...product, id: "other" };
    expect(removeFromCart({ ...state, items: [...state.items, { product: other, quantity: 1 }] }, "test").items)
      .toEqual([{ product: other, quantity: 1 }]);
  });

  it("presents an accurate basket summary", () => {
    expect(cartCount(state.items)).toBe(2);
  });

  it("calculates line amounts correctly", () => {
    expect(subtotal(state.items)).toBe(50);
  });

  it("applies eligible promotions", () => {
    expect(discountAmount(100, "NOT-A-CODE")).toBe(0);
    expect(discountAmount(100, "save10")).toBe(10);
  });

  it("applies delivery rules at the threshold", () => {
    expect(shippingAmount(99.99)).toBe(9.99);
    expect(shippingAmount(100)).toBe(0);
  });

  it("charges an express delivery fee at every order value", () => {
    expect(shippingAmount(25, "express")).toBe(19.99);
    expect(shippingAmount(150, "express")).toBe(19.99);
  });

  it("removes a line when its quantity becomes zero", () => {
    expect(setQuantity(state, "test", 0).items).toEqual([]);
  });

  it("caps quantities at available stock", () => {
    expect(setQuantity(state, "test", 20).items[0].quantity).toBe(product.stock);
  });

  it("calculates tax on the amount after promotion", () => {
    expect(taxAmount(100, 10)).toBe(7.2);
  });
});
