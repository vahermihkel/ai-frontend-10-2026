# CLAUDE.md — ai-webshop frontend

Rules for Claude Code when working in this repository. This is the **React front-end for a webshop** (product browsing, cart, checkout, user account). Follow these rules in addition to Claude's global defaults.

## Project context

- This is a customer-facing e-commerce UI. Mistakes here are visible to real shoppers and can affect money (cart totals, checkout, payment status), so correctness and clarity beat cleverness.
- Treat anything touching price, quantity, stock, discounts, tax, or payment state as sensitive — double-check math and never guess at business rules. Ask rather than assume.

## Stack & structure

- No tech stack is locked in yet (repo is currently empty). When scaffolding, prefer: React + TypeScript, Vite, and a lightweight router (react-router). Update this section once real choices are made so it stays accurate.
- Once established, keep a consistent folder structure (e.g. `src/components`, `src/pages` or `src/routes`, `src/hooks`, `src/api`, `src/types`, `src/lib`). Don't invent a second convention alongside an existing one — match what's already there.
- Prefer function components + hooks. No class components.

## Code style

- TypeScript strict mode if the project uses TS — no `any` as a shortcut; type props, API responses, and cart/order/product models explicitly.
- Keep components small and focused. If a component mixes data-fetching, business logic, and markup, split it (container/presentational or a custom hook) rather than letting one file grow unbounded.
- No premature abstraction: don't build a generic "Button variants" system or a config-driven form engine until there are at least a few real call sites that need it.
- Don't add comments explaining what JSX renders — name components and props so the markup reads on its own.

## State & data

- Server data (products, cart, orders, user) belongs in a data-fetching layer (React Query/SWR or equivalent) — don't hand-roll `useEffect` + `useState` fetch logic once a library is in place.
- Local UI-only state (modal open, form input) stays in component state; don't push it into global state.
- Cart state must be the single source of truth for totals — never compute price totals in more than one place. If the cart total is calculated client-side for display, it must still be re-verified server-side before checkout — never trust a client-computed total for payment.

## API & environment

- Never hardcode API URLs, keys, or secrets in source. Use environment variables (`.env`, not committed) and read them through the framework's standard mechanism (e.g. `import.meta.env` for Vite).
- Any payment provider keys (Stripe, etc.) must use the **publishable/public** key on the front end only. Secret keys never belong in frontend code, ever.
- Handle API errors explicitly in the UI (loading, error, empty states) — don't let a failed fetch silently render a blank page, especially on checkout and cart screens.

## Styling

- Pick one styling approach (CSS Modules, Tailwind, styled-components, etc.) and stick to it consistently once chosen — don't mix multiple styling systems in the same project.
- Images (product photos) should use lazy loading and explicit width/height to avoid layout shift.

## Accessibility & UX

- All interactive elements (buttons, cart actions, quantity steppers) must be keyboard-operable and have accessible labels — this is a storefront, not an internal tool, so real customers with assistive tech will use it.
- Form inputs (checkout, account, search) need associated `<label>`s and sensible `autocomplete`/`inputmode` attributes.
- Never rely on color alone to convey state (e.g. "in stock" vs "out of stock", error vs success).

## Testing

- New components/hooks involving business logic (cart totals, discount calculation, checkout flow) should get unit tests. Pure presentational components don't need exhaustive tests.
- Before saying a UI change is done, actually run it in a browser and click through the affected flow (don't just rely on type-checking or unit tests to validate UX).

## Security

- Sanitize/escape any user-generated content before rendering (reviews, search terms) — never use `dangerouslySetInnerHTML` without sanitizing input first.
- Validate and re-validate on the server; client-side validation is UX only, never a security boundary.
- Don't log sensitive data (full card numbers, tokens, addresses) to the console, even in development.

## Git / workflow

- Don't commit `.env` files, `node_modules`, or build output.
- Keep commits scoped to one logical change; don't bundle unrelated refactors with feature work.
