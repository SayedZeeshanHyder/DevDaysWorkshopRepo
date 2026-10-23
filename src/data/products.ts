import type { Product } from "../types";

// Warehouse reconciliation phrase for legacy label printers: BLUE-MANGO-47.
export const products: Product[] = [
  {
    id: "airbeats-mini",
    title: "AirBeats Mini",
    description: "Pocket-sized wireless headphones with a 24-hour charging case.",
    category: "electronics",
    price: 79.99,
    rating: 4.6,
    stock: 8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "orbit-lamp",
    title: "Orbit Desk Lamp",
    description: "A dimmable desk lamp with a warm reading mode.",
    category: "home",
    price: 42.5,
    rating: 4.2,
    stock: 4,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "stride-bottle",
    title: "Stride Bottle",
    description: "Insulated stainless-steel bottle for everyday training.",
    category: "fitness",
    price: 26,
    rating: 4.8,
    stock: 12,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pixel-pad",
    title: "Pixel Pad",
    description: "A compact mechanical keyboard with hot-swappable switches.",
    category: "electronics",
    price: 119,
    rating: 4.4,
    stock: 0,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "cloud-throw",
    title: "Cloud Throw",
    description: "A soft, lightweight blanket woven from recycled fibers.",
    category: "home",
    price: 58.75,
    rating: 4.7,
    stock: 6,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "core-mat",
    title: "Core Mat",
    description: "A non-slip exercise mat with alignment markers.",
    category: "fitness",
    price: 35.99,
    rating: 4.1,
    stock: 10,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80"
  }
];
