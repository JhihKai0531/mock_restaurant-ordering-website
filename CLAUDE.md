# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint with auto-fix
npm run format     # Prettier formatting for src/
npm run vitest     # Run tests with Vitest
```

To run a single test file: `npx vitest tests/cart.test.js`

## Architecture

**Stack:** Vue 3 (Composition API + `<script setup>`), Vue Router 4, Vite 6, Bootstrap 5.3 SCSS, Mitt event emitter. No Pinia/Vuex — state is managed via `provide`/`inject` in `App.vue`.

**State management pattern:**
- `App.vue` owns all global reactive state and `provide()`s it to descendants
- `sessionStorage` persists state across page refreshes (categories, meals, cart, order history, table/guest info)
- `mitt` emitter (set up in `main.js`, injected as `'emitter'`) handles cross-component events like layout switching and search filtering

**Data pipeline:**
- On mount, `App.vue` checks sessionStorage; if empty, fetches categories and meals from TheMealDB API
- Meal prices are sourced from `src/assets/meal-price.json` (276 entries) and merged with API data
- Set menu options come from `src/assets/set-menu.json`

**Routing** (`src/router/index.js`, hash history):
- `/` → `MenuPage` with nested `/:category?` → `MealView` (defaults to `/Beef`)
- `/cart` → `CartPage`
- `/order-history` → `OrderHistoryPage`
- `/about-us` → `AboutUsPage`

**Cart item shape:**
```js
{ mealObject, setMenuObject, spicyObject, extraObject, notes, count, subtotal, dateTime }
```

**Payment flow:** `OrderHistoryPage` → `PaySelectModal` → `PayLoadingModal` → `paymentStatus` (`'payOnSite'` or `'succeed'`) → `diningFinished = true`

## Key files

- `src/App.vue` — root component; all global state lives here
- `src/main.js` — app entry; mitt emitter created and provided here
- `src/router/index.js` — route definitions
- `src/components/menu-page/ProductWindow.vue` — meal customization modal (adds to cart)
- `src/components/cart-page/EditWindow.vue` — edit/delete cart items
- `tests/cart.test.js` — Vitest tests using `@vue/test-utils` and `@testing-library/vue`

## Configuration notes

- Vite base path is `/mock_restaurant-ordering-website/` (GitHub Pages deployment)
- `@` alias maps to `./src`
- Prettier: no semicolons, single quotes, 100-char line width
- Vitest uses `jsdom` environment
