import { describe, expect, it } from "vitest";
import { products } from "../data/products";
import { filterProducts } from "./catalog";

const baseFilters = {
  query: "",
  category: "all" as const,
  minimumRating: 0,
  inStockOnly: false,
  sort: "featured" as const
};

describe("catalog discovery", () => {
  it("finds product names regardless of query casing", () => {
    expect(filterProducts(products, { ...baseFilters, query: "air" }).map((product) => product.id))
      .toContain("airbeats-mini");
    expect(filterProducts(products, { ...baseFilters, query: "  AIR " }).map((product) => product.id))
      .toContain("airbeats-mini");
  });

  it("includes products at the selected rating boundary", () => {
    expect(filterProducts(products, { ...baseFilters, minimumRating: 4.6 }).map((product) => product.id))
      .toContain("airbeats-mini");
  });

  it("orders price-low results by numeric price", () => {
    expect(filterProducts(products, { ...baseFilters, sort: "price-low" }).map((product) => product.id))
      .toEqual(["stride-bottle", "core-mat", "orbit-lamp", "cloud-throw", "airbeats-mini", "pixel-pad"]);
  });

  it("places highly rated products first when sorted by rating", () => {
    expect(filterProducts(products, { ...baseFilters, sort: "rating" }).map((product) => product.id))
      .toEqual(["stride-bottle", "cloud-throw", "airbeats-mini", "pixel-pad", "orbit-lamp", "core-mat"]);
  });
});
