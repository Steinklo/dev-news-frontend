# DevNews Frontend

Retro terminal-themed developer news reader built with Next.js. Displays curated, AI-summarized tech news with a CRT monitor aesthetic (phosphor green on black, scanlines, text glow).

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
│   ├── layout.tsx              # Root layout (providers, VT323 font, CRT effects)
│   ├── page.tsx                # Home page
│   └── [category]/page.tsx     # Dynamic category route
├── components/
│   ├── ui/                     # shadcn/ui (Badge, Button, Card, Skeleton, Tabs)
│   ├── CategoryNav.tsx         # Category tab navigation
│   ├── CategoryPageContent.tsx # Category page with news list
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

**Retro CRT terminal aesthetic:**

- **Colors**: Phosphor green (`#00FF41`) on black (`#000000`), no other colors
- **Font**: VT323 monospace (Google Fonts)
- **Effects**: Scanlines, vignette, text glow (`text-shadow`)
- **Layout**: No rounded corners, no gradients, dark mode only
- **Severity badges**: Critical (red-orange), High (orange), Medium (yellow-green), Low (dim green)

## API Integration

Consumes the DevNews backend API:

| Endpoint | Description |
|---|---|
| `GET /news/categories` | List all categories |
| `GET /news/category/{category}?year_month=YYYY-MM` | News by category and month |

TanStack Query caching: `staleTime` 10-15 min, `gcTime` 1 hour.

## CI/CD

- **Deploy** (push to `main`): `npm ci` → lint → build → deploy to Azure Static Web Apps (dev → prod)
- Static export (`output: "export"`) — pre-rendered HTML served via CDN

## Categories

1. SecurityAndVulnerabilities
2. ProgrammingLanguagesAndRuntimes
3. FrameworksAndLibraries
4. CloudAndInfrastructure
5. DevOpsCiCdObservabilityTesting
6. AiMlDeveloperTooling
7. PerformanceAndArchitecturePatterns
8. DeveloperToolsIdesProductivity
