# CLAUDE.md

Static-exported Next.js frontend for DevNews, an AI-curated developer-news product. Renders news by category and month from the `dev-news` backend API. Siblings: `dev-news` (backend), `dev-news-iac` (infrastructure).

## Tech stack

- Next.js 16.1.2 (App Router, static export, React Compiler enabled)
- React 19.2.3 / TypeScript ^5 (strict)
- Tailwind CSS v4 (via `@tailwindcss/postcss`) + shadcn/ui-style primitives in `src/components/ui/`
- TanStack Query v5 (defaults: `staleTime` 10m, `gcTime` 1h, `retry` 2, no refetch on focus)
- lucide-react (icons), sonner (toasts), date-fns (dates), `cn()` = clsx + tailwind-merge
- ESLint 9 (eslint-config-next: core-web-vitals + typescript)

## Commands

```bash
npm install      # install deps
npm run dev      # dev server → http://localhost:3000
npm run build    # static export → out/ (gitignored)
npm run lint     # eslint
```

`npm run start` is not used (static export has no server). Deploy is CI-only to Azure Static Web Apps — push to `main` → dev, manual `workflow_dispatch` → prod. Set `NEXT_PUBLIC_API_URL` before dev/build.

## Architecture & key patterns

- App Router under `src/app/`:
  - `layout.tsx` — Server Component; Geist fonts, header/footer, wraps `<Providers>`
  - `page.tsx` — client (`"use client"`); `useQueries` fans out one query per category, merges and sorts by `created_at` desc
  - `[category]/page.tsx` — Server Component with `generateStaticParams` (hardcoded 7-category list, required for static export); delegates to client `CategoryPageContent`
- Structure: `src/components/` (NewsCard, CategoryNav, MonthSelector, HeaderNav, providers), `src/components/ui/` (shadcn primitives), `src/hooks/` (`useCategories`, `useNews`), `src/lib/` (`api.ts`, `types.ts`, `queryKeys.ts`, `utils.ts`).
- Data fetching: all backend calls go through `src/lib/api.ts` (`fetchCategories`, `fetchNewsByCategory`) wrapped in TanStack Query hooks; hooks toast on error via sonner. QueryClient configured in `providers.tsx`.
- API: `GET /news/categories`, `GET /news/category/{category}?year_month=YYYY-MM`. Base URL from `NEXT_PUBLIC_API_URL`.

## Conventions

- Server Components by default; add `"use client"` only when using hooks/state/TanStack Query.
- PascalCase component files; `@/*` path alias → `src/*`; merge classes with `cn()`.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Adding a category requires updating BOTH the `generateStaticParams()` list in `[category]/page.tsx` AND `getCategoryDisplayName()` in `src/lib/utils.ts`.
- Dark mode only; design tokens are hardcoded near-black + indigo hexes (`#08090d`, `#0c0d14`, `#1a1d28`, `#e8eaed`) plus custom classes in `src/app/globals.css`.

## Gotchas

- Static export (`output: "export"`): no server runtime, no API routes, no SSR/ISR, no Next image optimization (`images.unoptimized: true`). All data is fetched client-side from the live backend.
- The `generateStaticParams` category list is hardcoded — a new category whose page isn't added there will 404.
- `NEXT_PUBLIC_API_URL` is baked in at **build** time; changing the backend URL needs a rebuild/redeploy. CI injects it from `vars.NEXT_PUBLIC_API_URL`.
- Deploy is CI-only; don't hand-deploy. Don't edit generated/ignored paths: `out/`, `.next/`, `next-env.d.ts`.

## Further context

- Backend [`dev-news`](https://github.com/Steinklo/dev-news) defines the API contract; [`dev-news-iac`](https://github.com/Steinklo/dev-news-iac) provisions the Static Web App and supplies `NEXT_PUBLIC_API_URL`.
