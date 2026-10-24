# QuickCart

QuickCart is a small React storefront demo built with TypeScript and Vite. It displays a fixed product catalog and provides product search and filters, a cart drawer, a wishlist count, and a mock checkout flow. The project has no backend: catalog data and UI state live in the browser, and placing an order only creates a local confirmation.

## Requirements

- Node.js 18 or newer
- npm (the repository includes `package-lock.json`; use `npm ci` for a reproducible install)

The package manifest does not pin a Node.js or npm version. Vite 6 requires a supported Node.js runtime; use a current maintained Node.js release if possible.

## Setup and development

From the repository root:

```sh
npm ci
npm run dev
```

Vite prints a local URL in the terminal (typically `http://localhost:5173`). Open it in a browser. The development server supports hot module replacement; stop it with `Ctrl+C`.

On PowerShell, the equivalent commands are:

```powershell
npm ci
npm run dev
```

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs the TypeScript project build (`tsc -b`) and creates the production bundle with Vite in `dist/`. |
| `npm test` | Runs the Vitest suite once (`vitest run`). |
| `npm run test:watch` | Starts Vitest in watch mode. |

There is no `preview`, lint, or formatting script defined in `package.json`.

## Tests

Tests use [Vitest](https://vitest.dev/) with the `jsdom` environment and Vitest globals enabled in `vite.config.ts`. The current tests are colocated with the business-logic modules in `src/lib`:

- `cart.test.ts` — cart updates, item counts, totals, discounts, shipping, and tax
- `catalog.test.ts` — search, rating/category/stock filtering, and sorting
- `checkout.test.ts` — email and postal-code validation
- `wishlist.test.ts` — toggling saved products

Run the full suite with:

```sh
npm test
```

Run it continuously while editing with:

```sh
npm run test:watch
```

The test suite covers key cart calculations and updates, catalog discovery, checkout validation, and wishlist behavior. Run `npm test` after changes to verify these behaviors.

## Architecture

```text
index.html                  HTML shell; mounts the app at #root
vite.config.ts              React plugin and Vitest configuration
tsconfig*.json              TypeScript project configuration
src/
  main.tsx                  React entry point; imports global styles
  App.tsx                   Page composition and top-level UI state
  types.ts                  Shared product, cart, order, and UI types
  styles.css                Global and component styles
  data/
    products.ts             Static sample product catalog
  components/
    Header.tsx              Brand, saved-item count, and cart button
    ProductGrid.tsx         Product list and empty-results state
    ProductCard.tsx         Product details and save/add controls
    CartDrawer.tsx          Cart editing, totals, and checkout form
  lib/
    catalog.ts              Product filtering and sorting
    cart.ts                 Cart state helpers and price calculations
    checkout.ts             Checkout validation and local order creation
    wishlist.ts             Saved-product toggle helper
    format.ts               Currency display helper
    *.test.ts               Vitest unit tests for the helpers
```

### Application flow

1. `index.html` loads `src/main.tsx`, which imports the stylesheet and mounts `App` inside React `StrictMode`.
2. `App.tsx` owns the cart, filters, wishlist IDs, cart-drawer visibility, and status notice using React state.
3. `products.ts` supplies the fixed catalog. `filterProducts` derives visible products from the search text, category, minimum rating, stock toggle, and sort choice.
4. `ProductGrid` renders a `ProductCard` for each visible product. User actions are passed to these components as callbacks; state changes remain in `App`.
5. The cart drawer receives cart state and callbacks from `App`. Helpers in `cart.ts` calculate the displayed amounts, and `checkout.ts` validates details and constructs an order object.
6. A successful checkout displays a confirmation and resets the cart in memory. No order is sent to a service or persisted.

The `src/lib` modules mostly expose standalone functions, which is why the tests can exercise them without rendering React components.

## Product and checkout behavior

The catalog is sample data defined in `src/data/products.ts`; product images are loaded from Unsplash URLs. The application does not fetch products from an API.

The cart, wishlist, filters, and checkout details are held in component state. Refreshing the page clears them. Checkout does not charge a payment method, reserve inventory, contact a fulfillment service, or send an email; it only creates a local order confirmation. Coupon, shipping, tax, and validation logic are demo calculations implemented in `src/lib/cart.ts` and `src/lib/checkout.ts`, not server-authoritative commerce rules.

## Production build

Create the optimized static site bundle:

```sh
npm run build
```

The output is written to `dist/`. Serve that directory with a static web host configured to route the app's entry URL to `index.html`. The repository does not define a local production-preview command.
