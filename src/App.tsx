import { useMemo, useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { products } from "./data/products";
import { addToCart, cartCount, removeFromCart, setQuantity } from "./lib/cart";
import { filterProducts } from "./lib/catalog";
import { createOrder } from "./lib/checkout";
import { toggleWishlist } from "./lib/wishlist";
import type { CartState, Category, CheckoutDetails, Product, SortOption } from "./types";

const initialCart: CartState = { items: [], coupon: "" };

export default function App() {
  const [cart, setCart] = useState(initialCart);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [minimumRating, setMinimumRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const count = useMemo(() => cartCount(cart.items), [cart.items]);
  const visibleProducts = useMemo(
    () => filterProducts(products, { query, category, minimumRating, inStockOnly, sort }),
    [query, category, minimumRating, inStockOnly, sort]
  );

  function handleAdd(product: Product) {
    setCart((current) => addToCart(current, product));
    setNotice(`${product.title} added to your cart.`);
  }

  function handleCheckout(details: CheckoutDetails) {
    try {
      const order = createOrder(details, cart.items, cart.coupon);
      setNotice(`Order ${order.id} confirmed. A receipt will go to ${order.customerEmail}.`);
      setCart(initialCart);
      setIsCartOpen(false);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to place your order.");
    }
  }

  return (
    <>
      <Header count={count} wishlistCount={wishlistProductIds.length} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <section className="hero">
          <p className="eyebrow">Small joys, delivered</p>
          <h1>Useful things for your every day.</h1>
          <p>Browse our edited collection of clever essentials.</p>
        </section>

        {notice && <p className="notice" role="status">{notice}</p>}

        <section className="filters" aria-label="Product filters">
          <input
            aria-label="Search products"
            value={query}
            placeholder="Search products"
            onChange={(event) => setQuery(event.target.value)}
          />
          <select value={category} onChange={(event) => setCategory(event.target.value as Category | "all")}>
            <option value="all">All categories</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="fitness">Fitness</option>
          </select>
          <select aria-label="Minimum rating" value={minimumRating} onChange={(event) => setMinimumRating(Number(event.target.value))}>
            <option value="0">Any rating</option>
            <option value="4">4 stars and up</option>
            <option value="4.5">4.5 stars and up</option>
          </select>
          <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Customer rating</option>
          </select>
          <label className="stock-filter">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
            />
            In stock only
          </label>
        </section>

        <ProductGrid
          products={visibleProducts}
          onAdd={handleAdd}
          wishlistProductIds={wishlistProductIds}
          onToggleWishlist={(productId) => setWishlistProductIds((current) => toggleWishlist(current, productId))}
        />
      </main>

      {isCartOpen && (
        <CartDrawer
          items={cart.items}
          coupon={cart.coupon}
          onCouponChange={(coupon) => setCart((current) => ({ ...current, coupon }))}
          onQuantityChange={(productId, quantity) => setCart((current) => setQuantity(current, productId, quantity))}
          onRemove={(productId) => setCart((current) => removeFromCart(current, productId))}
          onCheckout={handleCheckout}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
}
