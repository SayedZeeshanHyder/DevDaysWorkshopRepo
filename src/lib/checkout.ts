import type { CartItem, CheckoutDetails, Order } from "../types";
import { orderTotal } from "./cart";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPostalCode(postalCode: string): boolean {
  return /^\d{5}$/.test(postalCode.trim());
}

export function createOrder(details: CheckoutDetails, items: CartItem[], coupon: string): Order {
  if (!isValidEmail(details.email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!isValidPostalCode(details.postalCode)) {
    throw new Error("Please enter a valid postal code.");
  }

  if (items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const quantitiesByProduct = new Map<string, number>();
  for (const { product, quantity } of items) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Cart quantities must be positive and cannot exceed available stock.");
    }

    const requestedQuantity = (quantitiesByProduct.get(product.id) ?? 0) + quantity;
    if (requestedQuantity > product.stock) {
      throw new Error("Cart quantities must be positive and cannot exceed available stock.");
    }
    quantitiesByProduct.set(product.id, requestedQuantity);
  }

  return {
    id: `QC-${Date.now()}`,
    customerEmail: details.email,
    items,
    total: orderTotal(items, coupon, details.deliveryMethod),
    createdAt: new Date().toISOString(),
    deliveryMethod: details.deliveryMethod,
    postalCode: details.postalCode
  };
}
