import { describe, expect, it } from "vitest";
import { toggleWishlist } from "./wishlist";

describe("saved products", () => {
  it("removes only the product that is toggled off", () => {
    expect(toggleWishlist(["airbeats-mini", "orbit-lamp"], "airbeats-mini")).toEqual(["orbit-lamp"]);
  });
});
