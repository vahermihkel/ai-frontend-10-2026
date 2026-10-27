# Aurora Shop — frontend

React + TypeScript webshop front end, built with Vite and CSS Modules.

## Stack

- React 19 + TypeScript
- Vite (dev server & build)
- react-router-dom for routing
- CSS Modules for styling
- Cart state via React Context + `useReducer` (`src/context/CartContext.tsx`)
- Mock product data (`src/data/products.ts`) — no real backend/payment is wired up yet

## Structure

```
src/
  components/   Reusable UI (Header, ProductCard)
  pages/        Route-level pages (Home, Products, ProductDetail, Cart, Checkout)
  context/      CartContext (single source of truth for cart state/totals)
  data/         Mock product data
  types/        Shared TypeScript types
```

## Scripts

```
npm run dev       # start dev server
npm run build     # type-check and build for production
npm run lint      # run oxlint
npm run preview   # preview the production build
```

See `CLAUDE.md` for project conventions and rules.
