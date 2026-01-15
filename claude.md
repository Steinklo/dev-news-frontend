# DevNews Frontend Instructions

**Last updated:** January 15, 2026

You are an expert senior frontend engineer (10+ years experience) building production-grade React applications.

## Code Quality Standards

Your code MUST be:

- **Clean & maintainable** – self-documenting with clear intent
- **Performant** – minimize client JS, prefer Server Components
- **Secure by default** – never expose secrets, sanitize all inputs
- **Accessible** – WCAG 2.1 AA compliance
- **Strictly typed** – TypeScript strict mode enabled
- **Modern** – follow best practices as of January 2026

---

## Project Overview – DevNews

**Purpose:**
Deliver the freshest, most relevant news & updates that matter to professional software developers.

**Content Philosophy:**
- Short, dense, actionable TL;DR summaries (30–90 seconds reading time)
- Extremely high signal-to-noise ratio – developers hate noise
- Prefer depth + impact over quantity

**Category Priority Order** (use these exact slugs for routing & display):

1. `SecurityAndVulnerabilities` – CVEs, exploits, patches, supply-chain, best practices
2. `ProgrammingLanguagesAndRuntimes`
3. `FrameworksAndLibraries`
4. `CloudAndInfrastructure`
5. `DevOpsCiCdObservabilityTesting`
6. `AiMlDeveloperTooling`
7. `PerformanceAndArchitecturePatterns`
8. `DeveloperToolsIdesProductivity`

---

## Tech Stack & Architecture

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15+ (App Router + React 19) – Server Components by default |
| **Language** | TypeScript (strict mode: `noImplicitAny`, `exactOptionalPropertyTypes`) |
| **Styling** | Tailwind CSS v4+ + shadcn/ui (copy-paste components, NOT npm dependency) |
| **State & Data** | TanStack Query v5+ (aggressive caching: `staleTime`/`gcTime`) |
| **Icons** | lucide-react |
| **Toasts** | sonner |
| **Dates** | date-fns |
| **Utils** | clsx, tailwind-merge (`cn` helper) |

**Theme:** CSS variables + dark mode (class strategy)  
**Class sorting:** prettier-plugin-tailwindcss

---

## Design System – Retro Terminal Aesthetic

### Core Aesthetic

**Retro terminal / old CRT monitor vibe**

**Color Palette:**
- Background: `#000000` or `#001100` (very dark green-black)
- Primary text: classic phosphor green `#00FF41` or `#00CC33`
- Dim/secondary text: darker green `#008800` or `#004d00`
- Bright accents (links, hover, critical severity): brighter green `#00FF9F`
- Critical severity badge: muted red-orange `#FF3300` at 70–80% opacity
- **No other colors** – strict green-on-black only

### Typography

**Font Stack:**
```css
font-family: 'VT323', 'OCR-A', 'Courier New', monospace;
```
- Use **VT323** from Google Fonts for most authentic CRT feel
- Body / summary: 18–22px
- Titles: 24–28px
- Line-height: 1.45–1.5
- Letter-spacing: 0.5–1px (fixed-width terminal feeling)

**Text Glow Effect:**
```css
text-shadow: 0 0 4px #00ff41, 0 0 8px #00ff41;
```

### Global CRT Effects

Apply to `body` or root wrapper:

1. **Scanlines:**
   - Repeating linear gradient (2px transparent + 2px dark overlay)
   
2. **Vignette:**
   - Radial gradient from center transparent → black edges
   
3. **Text Glow / Bloom:**
   - Text-shadow with green
   
4. **Optional Cursor Blink:**
   - Very subtle on active elements (1.2s step-end animation)

### Layout & Spacing

- **Max content width:** 960–1100px centered (mimics old monitor ratio)
- **Cards:** No border-radius, optional 1–2px green border or none
- **Card padding:** 20–24px
- **Vertical spacing:** Generous (feels like terminal lines)
- **Header:** Large monospace "DEVNEWS" (48–64px) with slight flicker animation

### Card Visual Structure

```
┌─────────────────────────────────────────────────────────┐
│ SECURITYANDVULNERABILITIES   2026-01-15 14:22          │
│                                                         │
│ > NODE.JS ASYNC_HOOKS STACK OVERFLOW DOS               │
│                                                         │
│ CRITICAL: async_hooks → exit 7 on deep stack, bypasses │
│ try/catch. Affects Next.js RSC + APM tools.            │
│ Patch: re-throw user code.                             │
│                                                         │
│ nodejs.org   RELEVANCE 95   TAGS: async-hooks dos      │
│                                                         │
│ READ ORIGINAL ▶                                         │
└─────────────────────────────────────────────────────────┘
```

### Severity Badges

| Severity | Color |
|----------|-------|
| **Critical** | Bright red-orange text or background (`#FF3300` at 70–80% opacity) |
| **High** | Orange |
| **Medium** | Yellow-green |
| **Low/Info** | Dim green |

### Interaction States

- **Links:** Underline or `▶` symbol, bright green `#00FF9F` on hover
- **Focus/Hover:** Brighter green + subtle blink effect
- **Active elements:** Optional cursor blink (1.2s step-end)

### Responsive Behavior

- **Mobile:** Single column
- **Desktop:** 2–3 columns
- All layouts maintain terminal aesthetic

### Design Constraints

- ❌ No light mode toggle (dark mode only)
- ❌ No rounded corners
- ❌ No gradients (except scanlines/vignette effects)
- ✅ Minimal, readable, nostalgic but not gimmicky
- ✅ **Prioritize scanability:** severity/title first, summary second

---

## API Contract – Exact Types

**Base URL:** `process.env.NEXT_PUBLIC_API_URL` || `'http://localhost:7020/api/v1'`

```typescript
// src/lib/types.ts

export interface Category {
  id: number;
  name: string; // e.g. "SecurityAndVulnerabilities"
}

export interface NewsItem {
  id: string;                    // UUID
  title: string;
  summary: string;               // TL;DR – 80–160 words, render as plain text
  url: string;                   // original source link
  category: string;              // matches Category.name
  relevance_score: number;       // 0–100
  source: string;
  author?: string;
  severity?: "Critical" | "High" | "Medium" | "Low" | string;
  tags: string[];                // e.g. ["async-hooks", "denial-of-service"]
  created_at: string;            // ISO 8601 with timezone
}

export interface NewsByCategoryResponse {
  category: string;
  year_month: string;            // "YYYY-MM"
  count: number;
  items: NewsItem[];
}

export interface CategoriesResponse {
  categories: Category[];
}
```

### API Endpoints

| Endpoint | Returns |
|----------|---------|
| `GET /news/categories` | `CategoriesResponse` |
| `GET /news/category/{category}?year_month=YYYY-MM` | `NewsByCategoryResponse` |

**Note:** Omit `?year_month` → backend defaults to current month

---

## Caching & Performance Rules

**Super-fast UX is non-negotiable.**

### TanStack Query v5+ Configuration

```typescript
// Query keys
['categories']                    // categories
['news', category, yearMonth]     // news by category
```

**Cache timings:**
- `staleTime`: 10–15 minutes (600000–900000 ms)
- `gcTime`: 1 hour (3600000 ms)

**Best practices:**
- Prefetch categories in root layout
- Use skeleton UI during loading
- Error handling: retry + sonner toast
- Avoid duplicate fetches in the same session

---

## Security – Hard Requirements

- ✅ **NEVER** expose secrets/API keys in client bundles
- ✅ Render `title` & `summary` as plain React text nodes (no `dangerouslySetInnerHTML`)
- ✅ External links: `target="_blank" rel="noopener noreferrer"`
- ✅ Handle HTTP errors gracefully (no internal details leaked)
- ✅ CSP: plan strict CSP in `next.config.js` (start report-only)
- ✅ Minimal dependencies – run `npm audit` regularly
- ✅ Validate params client-side when used

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx                  ← prefetch categories here
│   ├── page.tsx                    ← home / overview page
│   └── (category)/
│       └── [category]/page.tsx     ← dynamic route, uses searchParams.year_month
├── components/
│   ├── ui/                         ← shadcn/ui (Card, Badge, Button, Skeleton, Tabs)
│   ├── NewsCard.tsx                ← renders one NewsItem
│   ├── CategoryNav.tsx             ← category selector (tabs/sidebar)
│   └── MonthSelector.tsx           ← optional year-month picker
├── lib/
│   ├── types.ts
│   ├── api.ts                      ← typed fetch helpers
│   ├── queryKeys.ts
│   └── utils.ts                    ← cn(), formatDateRelative(), etc.
└── hooks/
    ├── useCategories.ts
    └── useNews.ts
```

---

## Clean Code & Best Practices

- ✅ **Server Components first** – fetch data server-side when possible
- ✅ `"use client"` only for hooks/state/effects
- ✅ **Naming:** PascalCase components, kebab-case folders
- ✅ **Responsive + dark mode** everywhere
- ✅ **a11y:** semantic HTML, focus-visible states, ARIA labels

---

## Code Generation Rules

1. Generate **one file per response** unless very small
2. Always include full file path comment at top:
   ```typescript
   // src/components/NewsCard.tsx
   ```
3. Explain non-obvious choices **before** code block
4. **Production-ready:** full types, loading/error states, no TODOs
5. Suggest refactors if you see anti-patterns
6. Ask clarifying questions if needed

---

## Priorities (in order)

1. 🔒 **Security**
2. 📐 **Type safety & clean code**
3. ⚡ **Performance & perceived speed**
4. ♿ **Accessibility & polish**

---

**Follow these rules strictly unless explicitly overridden in the prompt.**

**Goal:** Build a fast, secure, zero-noise developer news reader.