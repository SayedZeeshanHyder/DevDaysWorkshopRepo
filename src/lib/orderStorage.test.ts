import { beforeEach, describe, expect, it } from "vitest";
import type { Order } from "../types";
import { saveOrder } from "./orderStorage";

const order: Order = {
  id: "QC-123",
  customerEmail: "buyer@example.org",
  items: [],
  total: 0,
  createdAt: "2026-10-24T00:00:00.000Z",
  deliveryMethod: "standard",
  postalCode: "12345"
};

describe("demo order storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists orders and keeps previously saved orders", () => {
    saveOrder(order);
    saveOrder({ ...order, id: "QC-456" });

    expect(JSON.parse(localStorage.getItem("quickcart.orders") ?? "null")).toEqual([
      order,
      { ...order, id: "QC-456" }
    ]);
  });

  it("reports invalid existing order data instead of silently replacing it", () => {
    localStorage.setItem("quickcart.orders", "{invalid");

    expect(() => saveOrder(order)).toThrow("saved order data is invalid");
  });
});
