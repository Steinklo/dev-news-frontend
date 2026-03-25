# DevNews Frontend

Next.js 16 static site for an AI developer news reader with retro CRT terminal aesthetic. Consumes the DevNews backend API.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server (localhost:3000)
npm run build        # Static export to out/
npm run lint         # ESLint
```

## Stack

- Next.js 16 (App Router, React 19, React Compiler, static export)
- TypeScript strict mode
- Tailwind CSS v4 + shadcn/ui (copy-paste components in src/components/ui/)
- TanStack Query v5 (staleTime: 10-15 min, gcTime: 1 hour)
- lucide-react, sonner, date-fns, clsx + tailwind-merge

## Project Structure

```
src/app/                    # App Router pages (layout, home, [category])
src/components/             # NewsCard, CategoryNav, MonthSelector, CategoryPageContent
src/components/ui/          # shadcn/ui primitives (Badge, Button, Card, Skeleton, Tabs)
src/hooks/                  # useCategories, useNews (TanStack Query hooks)
src/lib/                    # types.ts, api.ts, queryKeys.ts, utils.ts
```

## API

- Base URL: `NEXT_PUBLIC_API_URL` env var (default: `http://localhost:7020/api/v1`)
- `GET /news/categories` → `CategoriesResponse`
- `GET /news/category/{category}?year_month=YYYY-MM` → `NewsByCategoryResponse`

## Key Types

```typescript
interface NewsItem {
  id: string; title: string; summary: string; url: string;
  category: string; relevance_score: number; source: string;
  severity?: "Critical" | "High" | "Medium" | "Low";
  tags: string[]; created_at: string;
}
```

## Design Conventions

- **CRT terminal theme**: green-on-black only, VT323 font, scanlines, text glow, no rounded corners
- Dark mode only — no light mode toggle
- Severity colors: Critical (red-orange #FF3300), High (orange), Medium (yellow-green), Low (dim green)
- Server Components by default, `"use client"` only when hooks/state needed
- PascalCase components, kebab-case folders
- External links: `target="_blank" rel="noopener noreferrer"`
- Never use `dangerouslySetInnerHTML` for user content
- Static export (`output: "export"`) deployed to Azure Static Web Apps
