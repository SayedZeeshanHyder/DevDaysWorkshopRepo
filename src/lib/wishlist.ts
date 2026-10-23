export function toggleWishlist(productIds: string[], productId: string): string[] {
  if (productIds.includes(productId)) {
    return productIds.filter((id) => id === productId);
  }

  return [...productIds, productId];
}
