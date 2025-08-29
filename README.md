# Country & State Picker (Frontend Coding Challenge)

## Overview

A small, production-quality React app that displays two dropdowns (Country → State) backed by the staging API. When a user selects a country, the app fetches its states (no default selection). An optional “Review Selection” button takes the user to a summary screen. The app includes tests, a clear architecture, and repo hygiene.

## Requirements from the brief (mapped)

- Two dropdowns on a single page: Countries → States; states load when a country is chosen; no state selected by default.
- Data loaded from the staging API.
- Production-quality code, browser-runnable, clear architecture, tests, and a README documenting the approach.
- “You can always do more”: optional validation and a submit-like button to a second screen (implemented as /summary).

## Demo (screens)

- Home: Country dropdown → State dropdown → “Review Selection” button
- Summary: Shows the chosen country & state; link to change selection

## Tech Stack

- Build: Vite + React + TypeScript
- Styling: Tailwind CSS
- Data: Axios + TanStack Query (react-query)
- Routing: React Router
- Testing: Vitest + Testing Library + MSW (network mocking)
- Lint/Format: ESLint + Prettier

## Project Structure

src/
  app/
    App.tsx              # App shell (providers + routes)
    routes.tsx           # Route config: "/" and "/summary"
  pages/
    HomePage.tsx         # Country & State flow
    SummaryPage.tsx      # Review selection screen
  components/
    CountrySelect.tsx    # Country dropdown/search
    StateSelect.tsx      # State dropdown/search (depends on country)
    Field.tsx            # Label + hint + error wrapper
    ErrorBanner.tsx
  hooks/
    useCountries.ts      # react-query wrapper for /countries
    useStates.ts         # react-query wrapper for /countries/:id/states
  lib/
    env.ts               # typed env reader (VITE_* checks)
    http.ts              # axios instance with X-API-Key header
    api.ts               # fetchCountries / fetchStates
    queryClient.ts
    text.ts              # normalizeText helper (diacritics)
  tests/
    HomePage.int.test.tsx
    CountrySelect.unit.test.tsx
    msw/
      server.ts          # MSW server (node)
      handlers.ts        # default handlers
    setupTests.ts        # vitest+RTL+MSW setup, env stubs
  main.tsx
  index.css              # Tailwind entry

## API (from the brief)

Base URL: https://fedt.unruffledneumann.xyz/api/v1

Endpoints:
- GET /countries → [{ id, value }]
- GET /countries/{countryId}/states → [{ id, value }]

Required header:
- X-API-Key: <staging-key-from-brief> (never commit the real key)

## Environment Variables

Create a `.env` in the project root BEFORE running:

VITE_API_BASE_URL=https://fedt.unruffledneumann.xyz/api/v1
VITE_API_KEY=REPLACE_WITH_STAGING_KEY_FROM_BRIEF   # do not commit the real key

The app enforces presence of these variables at startup (src/lib/env.ts). The API key is injected into every request as the X-API-Key header.

## Getting Started

Node 18+ and npm 9+ recommended.

1) Add env file
   Create `.env` in the project root (see Environment Variables).

2) Install dependencies
   npm i

3) Build & start (production-like)
   npm run build
   npm run start     # serves the built app

4) Local development
   npm run dev

## NPM Scripts (excerpt)

{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "start": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui"
  }
}

## Testing

- Unit/Integration via Vitest + Testing Library
  - npm run test        (watch)
  - npm run test:run    (single run)
  - npm run test:ui     (optional visual runner)
- Network is mocked with MSW; tests do not hit the real API.
- Examples include:
  - Home flow: choose country → load states → enable submit
  - CountrySelect filter logic (diacritics-aware: “Aland” matches “Åland”).

## Accessibility & UX

- Proper labels for controls (<label htmlFor> + aria-*).
- Keyboard operable; State control disabled until a Country is chosen.
- Inline validation and retryable error banners.
- Loading skeletons/spinners.
- Mobile-first responsive layout (Tailwind).

## Error Handling

- Axios instance adds X-API-Key via request interceptor.
- React Query retries (configurable), with error banners and a Retry button.
- Reset state when Country changes (no default State selection).

## Design & Architecture Notes

- SPA with a simple router for the optional summary screen (meets the “do more” suggestion).
- React Query centralizes data fetching/caching and simplifies loading/error states.
- Feature-oriented folders for maintainability.
- Typed env loader to avoid missing config at runtime.

## Git & Repo Hygiene

- Public GitHub repo with clear commit history.
- Feature branches + PRs (self-approved) to model a realistic workflow.
- .env respected; no secrets committed.

## Browser Support

- Verified against Chrome current stable.

## Future Enhancements

- Virtualized combobox for long lists
- Persist selections (localStorage) and shareable URLs
- i18n (e.g., react-intl)
- CI workflow (GitHub Actions): lint, typecheck, test, build
- E2E smoke (Playwright) for the main happy path

## License

MIT (or specify as needed)
