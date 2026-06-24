# DevNews Frontend

> A dark-themed reader for AI and developer news — curated, AI-summarized, high signal.

DevNews Frontend is a Next.js 16 app (App Router, React 19) that displays AI-curated developer news by category and month. It's a static-exported site deployed to Azure Static Web Apps, and it reads all its data at runtime from the DevNews backend API.

Part of the **DevNews** product, alongside the backend API ([`dev-news`](https://github.com/Steinklo/dev-news)) and infrastructure-as-code ([`dev-news-iac`](https://github.com/Steinklo/dev-news-iac)).

## Quick start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`. It expects the backend API at `NEXT_PUBLIC_API_URL` (default `http://localhost:7020/api/v1`); without a reachable backend the UI loads but shows empty states. Build a static export with `npm run build` (output in `out/`).

## Prerequisites & configuration

| Requirement | Notes |
|---|---|
| Node.js 20+ | Matches CI |
| DevNews backend API | Source of all news data |

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:7020/api/v1` |

Put local overrides in `.env.local` (gitignored). `NEXT_PUBLIC_*` variables are baked into the bundle at **build** time, so changing the backend URL requires a rebuild; CI injects this value from a GitHub Actions variable.

## Links

- Live site — [dev-news.dev](https://dev-news.dev)
- Backend API — [`dev-news`](https://github.com/Steinklo/dev-news)
- Infrastructure — [`dev-news-iac`](https://github.com/Steinklo/dev-news-iac)

## Contributing

Branch off `main` and open a PR; GitHub Actions runs lint + build. Merges to `main` auto-deploy to dev; production is a manual workflow dispatch.

## License

Released under the [MIT License](LICENSE).
