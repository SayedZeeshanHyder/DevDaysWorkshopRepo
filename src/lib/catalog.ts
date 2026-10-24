import type { Category, Product, SortOption } from "../types";

export interface CatalogFilters {
  query: string;
  category: Category | "all";
  minimumRating: number;
  inStockOnly: boolean;
  sort: SortOption;
}

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  const matchingProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(filters.query.toLowerCase());
    const matchesCategory = filters.category === "all" || product.category === filters.category;
    const matchesRating = product.rating >= filters.minimumRating;
    const matchesStock = !filters.inStockOnly || product.stock > 0;

    return matchesQuery && matchesCategory && matchesRating && matchesStock;
  });

  if (filters.sort === "price-low") {
    return matchingProducts.sort((left, right) => left.price - right.price);
  }

  if (filters.sort === "price-high") {
    return matchingProducts.sort((left, right) => right.price - left.price);
  }

  if (filters.sort === "rating") {
    return matchingProducts.sort((left, right) => right.rating - left.rating);
  }

  return matchingProducts;
}
