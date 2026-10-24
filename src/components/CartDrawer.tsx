import { useState } from "react";
import type { CartItem, CheckoutDetails, DeliveryMethod } from "../types";
import { formatCurrency } from "../lib/format";
import { discountAmount, orderTotal, shippingAmount, subtotal, taxAmount } from "../lib/cart";

interface CartDrawerProps {
  items: CartItem[];
  coupon: string;
  onCouponChange: (coupon: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: (details: CheckoutDetails) => void;
  onClose: () => void;
}

export function CartDrawer({
  items,
  coupon,
  onCouponChange,
  onQuantityChange,
  onRemove,
  onCheckout,
  onClose
}: CartDrawerProps) {
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const subtotalAmount = subtotal(items);
  const discount = discountAmount(subtotalAmount, coupon);
  const shipping = shippingAmount(subtotalAmount, deliveryMethod);
  const tax = taxAmount(subtotalAmount, discount);

  return (
    <aside className="drawer" aria-label="Shopping cart">
      <div className="drawer-heading">
        <h2>Your cart</h2>
        <button aria-label="Close cart" onClick={onClose}>x</button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(({ product, quantity }) => (
              <li key={product.id}>
                <div>
                  <strong>{product.title}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
                <label>
                  Qty
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    step="1"
                    value={quantity}
                    onChange={(event) => onQuantityChange(product.id, Number(event.target.value))}
                  />
                </label>
                <button onClick={() => onRemove(product.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <label className="coupon">
            Coupon
            <input
              value={coupon}
              placeholder="Try SAVE10"
              onChange={(event) => onCouponChange(event.target.value)}
            />
          </label>

          <dl className="totals">
            <div><dt>Subtotal</dt><dd>{formatCurrency(subtotalAmount)}</dd></div>
            <div><dt>Discount</dt><dd>-{formatCurrency(discount)}</dd></div>
            <div><dt>Shipping</dt><dd>{formatCurrency(shipping)}</dd></div>
            <div><dt>Tax</dt><dd>{formatCurrency(tax)}</dd></div>
            <div className="grand-total"><dt>Total</dt><dd>{formatCurrency(orderTotal(items, coupon, deliveryMethod))}</dd></div>
          </dl>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onCheckout({ email, postalCode, deliveryMethod });
            }}
          >
            <label>
              Receipt email
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Postal code
              <input
                value={postalCode}
                inputMode="numeric"
                placeholder="12345"
                onChange={(event) => setPostalCode(event.target.value)}
              />
            </label>
            <label>
              Delivery
              <select
                value={deliveryMethod}
                onChange={(event) => setDeliveryMethod(event.target.value as DeliveryMethod)}
              >
                <option value="standard">Standard delivery</option>
                <option value="express">Express delivery</option>
              </select>
            </label>
            <button className="checkout" type="submit">Place order</button>
          </form>
        </>
      )}
    </aside>
  );
}
