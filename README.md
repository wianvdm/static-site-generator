# Static Site Generator

A monorepo for building configurable static sites with TanStack Start, Turborepo, and a CMS-driven architecture.

## Quick Start

```bash
# Install all dependencies
npm install

# Run development server
npx turbo dev

# Build all packages
npx turbo build
```

## Workspace Layout

| Package | Description |
|---------|-------------|
| `apps/web` | TanStack Start SPA template |
| `apps/cms` | Admin dashboard (placeholder) |
| `packages/schema` | Shared Zod schemas & TypeScript types |

## Architecture

See [docs/architecture/monorepo-overview.md](docs/architecture/monorepo-overview.md) for the full architecture guide.

## Development Rules

See `.clinerules/` for project-specific coding standards and conventions.