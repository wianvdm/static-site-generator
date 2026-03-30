# Monorepo Overview

## Structure

```
Static Site Generator/
├── apps/
│   ├── web/          — TanStack Start SPA template (Vite + React)
│   └── cms/          — Admin dashboard (placeholder)
├── packages/
│   └── schema/       — Shared Zod schemas & TypeScript types
├── docs/             — Architecture docs & plans
├── .clinerules/      — Project coding rules
├── package.json      — Root workspace config
├── turbo.json        — Turborepo pipeline config
└── tsconfig.base.json — Shared TypeScript config
```

## Apps

### `apps/web`
The front-end template built with **TanStack Start** (React + Vite + TanStack Router). It renders sections from static JSON config/content files with hot-swap data via Vite HMR.

### `apps/cms`
Admin dashboard for managing site content. Currently a placeholder.

## Packages

### `packages/schema`
Shared Zod schemas and TypeScript types used by both apps. Defines the contract for:
- **Actions** — Navigation links (internal route, scroll-to-anchor, external URL)
- **Sections** — Base schemas per domain (navbar, hero, cta, footer, gallery) with layout-specific extensions
- **Theme** — CSS variable token definitions

## Key Patterns

### Section Architecture
Each section domain lives under `src/sections/<domain>/`:
- `base-<domain>.schema.ts` — Shared fields for all layouts of that domain
- `<domain>-<N>.schema.ts` — Layout-specific schema extending the base
- `<domain>-<N>.component.tsx` — React component receiving validated layout config
- `<domain>-<N>.registry.ts` — Exports `[string, ZodSchema, Component]` tuple

### Engine
The engine (`src/engine/`) aggregates registries into a `componentMap`, validates config/content at startup, and renders sections dynamically via `SectionsRenderer`.

### Action Domain
Sections delegate all navigation to `<ActionLink>`, which abstracts:
- Internal route navigation (TanStack Router `<Link>`)
- Scroll to anchor (`id`)
- External links (`target="_blank"`)

### Theme Dictatorship
All visual styling flows from CSS variables defined in `apps/web/data/theme.css`. Components use structural Tailwind classes + theme-mapped classes only.

### Data Hot-Swap
Content lives in `apps/web/data/` (JSON + CSS) and is imported directly for Vite HMR. No API calls for content delivery — the template is SPA-first.

## Build Tools

- **npm workspaces** — Package management
- **Turborepo** — Build orchestration (`turbo build`, `turbo dev`)
- **TypeScript strict mode** — Enforced everywhere
- **Tailwind CSS v4** — Via `@tailwindcss/vite` plugin