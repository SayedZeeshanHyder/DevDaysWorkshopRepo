import type { Product } from "../types";
import { formatCurrency } from "../lib/format";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductCard({ product, onAdd, isWishlisted, onToggleWishlist }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-content">
        <button
          className="wishlist-button"
          aria-label={`Toggle ${product.title} saved status`}
          onClick={() => onToggleWishlist(product.id)}
        >
          {isWishlisted ? "Saved" : "Save"}
        </button>
        <span className="category">{product.category}</span>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div className="product-meta">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{product.rating} stars</span>
        </div>
        <button onClick={() => onAdd(product)} disabled={product.stock === 0}>
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
