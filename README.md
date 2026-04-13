# DevNews Frontend

Modern dark-themed AI developer news reader built with Next.js. Displays curated, AI-summarized tech news with a clean developer aesthetic.

## Tech Stack

- **Next.js 16** (App Router, React 19, React Compiler)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui** components
- **TanStack Query v5** — data fetching and caching
- **Static export** — deployed to Azure Static Web Apps
- **lucide-react** (icons), **sonner** (toasts), **date-fns** (dates)

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- Backend API running (default: `http://localhost:7020/api/v1`)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint
npm run lint

# Build static export
npm run build
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:7020/api/v1` |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (providers, Geist fonts)
│   ├── page.tsx                # Home page
│   └── [category]/page.tsx     # Dynamic category route
├── components/
│   ├── ui/                     # shadcn/ui (Badge, Button, Card, Skeleton, Tabs)
│   ├── CategoryNav.tsx         # Category tab navigation
│   ├── CategoryPageContent.tsx # Category page with news list
│   ├── HeaderNav.tsx           # Top navigation bar with category links
│   ├── MonthSelector.tsx       # Year-month picker
│   ├── NewsCard.tsx            # Single news item card
│   └── providers.tsx           # TanStack Query provider
├── hooks/
│   ├── useCategories.ts        # Categories query hook
│   └── useNews.ts              # News by category query hook
└── lib/
    ├── api.ts                  # Typed fetch helpers
    ├── queryKeys.ts            # TanStack Query key factories
    ├── types.ts                # API types (NewsItem, Category, etc.)
    └── utils.ts                # cn() helper, date formatting
```

## Design System

**Modern dark developer aesthetic:**

- **Colors**: Dark grays (`#0a0a0a` bg, `#141414` cards), white text (`#fafafa`), blue accents (`#3b82f6`)
- **Fonts**: Geist Sans (body), Geist Mono (metadata/code)
- **Layout**: Rounded corners, subtle borders, dark mode only
- **Severity badges**: Critical (red), High (orange), Medium (yellow), Low (green)

## API Integration

Consumes the DevNews backend API:

| Endpoint | Description |
|---|---|
| `GET /news/categories` | List all categories |
| `GET /news/category/{category}?year_month=YYYY-MM` | News by category and month |

TanStack Query caching: `staleTime` 10 min, `gcTime` 1 hour.

## CI/CD

- **PR builds**: `npm ci` → lint → build validation
- **Push to main**: `npm ci` → lint → build → deploy to Azure Static Web Apps (dev)
- **Prod deploy**: Manual trigger via `workflow_dispatch`
- Static export (`output: "export"`) — pre-rendered HTML served via CDN

## Categories

1. AiModelsAndApis
2. AiDeveloperTools
3. AgentsAndFrameworks
4. AiEngineering
5. AiSafetyAndSecurity
6. InfrastructureAndCloud
7. OpenSourceAndCommunity
