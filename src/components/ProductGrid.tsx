import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product) => void;
  wishlistProductIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export function ProductGrid({ products, onAdd, wishlistProductIds, onToggleWishlist }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="empty-results">No products match your search.</p>;
  }

  return (
    <section className="product-grid" aria-label="Products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          isWishlisted={wishlistProductIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </section>
  );
}
