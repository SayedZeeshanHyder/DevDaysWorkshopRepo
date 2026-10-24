import type { CartItem, CartState, DeliveryMethod, Product } from "../types";

export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING = 9.99;
export const TAX_RATE = 0.08;

export function addToCart(state: CartState, product: Product): CartState {
  const existing = state.items.find((item) => item.product.id === product.id);

  if (existing) {
    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    };
  }

  return { ...state, items: [...state.items, { product, quantity: 1 }] };
}

export function setQuantity(state: CartState, productId: string, quantity: number): CartState {
  return {
    ...state,
    items: quantity <= 0
      ? state.items.filter((item) => item.product.id !== productId)
      : state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
  };
}

export function removeFromCart(state: CartState, productId: string): CartState {
  return {
    ...state,
    items: state.items.filter((item) => item.product.id !== productId)
  };
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function subtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function discountAmount(subtotalAmount: number, coupon: string): number {
  if (coupon.trim().toLowerCase() === "save10") {
    return subtotalAmount * 0.1;
  }
  return 0;
}

export function shippingAmount(subtotalAmount: number, deliveryMethod: DeliveryMethod = "standard"): number {
  if (deliveryMethod === "express") {
    return 19.99;
  }

  return subtotalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

export function taxAmount(subtotalAmount: number, discount = 0): number {
  return (subtotalAmount - discount) * TAX_RATE;
}

export function orderTotal(items: CartItem[], coupon: string, deliveryMethod: DeliveryMethod = "standard"): number {
  const subtotalAmount = subtotal(items);
  const discount = discountAmount(subtotalAmount, coupon);
  return subtotalAmount - discount + shippingAmount(subtotalAmount, deliveryMethod) + taxAmount(subtotalAmount, discount);
}
