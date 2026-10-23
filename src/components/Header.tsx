interface HeaderProps {
  count: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

export function Header({ count, wishlistCount, onOpenCart }: HeaderProps) {
  return (
    <header className="header">
      <a className="brand" href="/">QuickCart</a>
      <div className="header-actions">
        <span className="wishlist-count">Saved {wishlistCount}</span>
        <button className="cart-button" onClick={onOpenCart}>
          Cart <span>{count}</span>
        </button>
      </div>
    </header>
  );
}
