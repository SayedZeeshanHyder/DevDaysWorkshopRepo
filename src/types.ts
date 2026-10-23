export type Category = "electronics" | "home" | "fitness";
export type SortOption = "featured" | "price-low" | "price-high" | "rating";
export type DeliveryMethod = "standard" | "express";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  rating: number;
  stock: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: string;
}

export interface CheckoutDetails {
  email: string;
  postalCode: string;
  deliveryMethod: DeliveryMethod;
}

export interface Order {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  deliveryMethod: DeliveryMethod;
  postalCode: string;
}
