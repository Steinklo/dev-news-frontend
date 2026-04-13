# DevNews Frontend

Next.js 16 static site for an AI developer news reader with a modern dark aesthetic. Consumes the DevNews backend API.

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
- TanStack Query v5 (staleTime: 10 min, gcTime: 1 hour)
- lucide-react, sonner, date-fns, clsx + tailwind-merge

## Project Structure

```
src/app/                    # App Router pages (layout, home, [category])
src/components/             # NewsCard, CategoryNav, MonthSelector, CategoryPageContent, HeaderNav, providers
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
  author?: string;
  severity?: "Critical" | "High" | "Medium" | "Low" | string;
  tags: string[]; created_at: string;
}
```

## Design Conventions

- **Modern dark theme**: dark gray background (#0a0a0a), white text (#fafafa), blue accents (#3b82f6)
- Color palette: Card (#141414), Border (#262626), Border-hover (#404040), Text-secondary (#a1a1aa), Text-muted (#71717a)
- Dark mode only — no light mode toggle
- Geist Sans for body text, Geist Mono for metadata only
- Rounded corners (rounded-lg for cards, rounded-md for badges/buttons)
- Severity colors: Critical (red), High (orange), Medium (yellow), Low (green)
- Server Components by default, `"use client"` only when hooks/state needed
- PascalCase components, kebab-case folders
- External links: `target="_blank" rel="noopener noreferrer"`
- Never use `dangerouslySetInnerHTML` for user content
- Static export (`output: "export"`) deployed to Azure Static Web Apps
