import type { Order } from "../types";

const ORDERS_STORAGE_KEY = "quickcart.orders";

export function saveOrder(order: Order): void {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  let orders: unknown = [];

  if (storedOrders !== null) {
    try {
      orders = JSON.parse(storedOrders);
    } catch {
      throw new Error("Unable to save the order because saved order data is invalid.");
    }
  }

  if (!Array.isArray(orders)) {
    throw new Error("Unable to save the order because saved order data is invalid.");
  }

  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([...orders, order]));
}
