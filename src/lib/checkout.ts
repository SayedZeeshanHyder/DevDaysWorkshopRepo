import type { CartItem, CheckoutDetails, Order } from "../types";
import { orderTotal } from "./cart";

export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.endsWith(".com");
}

export function isValidPostalCode(postalCode: string): boolean {
  return postalCode.trim().length === 5;
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
