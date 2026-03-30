# Implementation Plan

[Overview]
Scaffold the complete monorepo project structure with all workflow rules, configuration files, and a working navbar reference implementation for the Static Site Generator project.

This plan establishes the foundation for a monorepo containing two deployable apps (`apps/web` — TanStack Start SPA template, `apps/cms` — admin dashboard placeholder) and one shared package (`packages/schema` — Zod schemas + TypeScript types). The project uses npm workspaces for monorepo management and Turborepo for build orchestration. The `apps/web` app will be a fully functional TanStack Start SPA with a working navbar section as the reference implementation, plus empty placeholder scaffolds for hero, cta, footer, and gallery sections. The `apps/cms` will be a minimal placeholder with correct folder structure. All existing `.clinerules` will be preserved and an architecture document will be created for future reference.

Key decisions informing this plan:
- **npm** instead of pnpm (user preference, already available on system)
- **Turborepo** from day one for build pipeline orchestration
- **TanStack Start latest stable** for the web app framework
- **Navbar only** as working reference; hero/cta/footer/gallery as empty placeholders
- **CMS as minimal placeholder** with correct folder structure only

[Types]
The following type definitions will be created to establish the shared contract between apps/web, apps/cms, and packages/schema.

**Action Types** (`apps/web/src/actions/types/action.type.ts`):
```typescript
// Discriminated union for action types
type Action =
  | { type: 'route'; to: string }
  | { type: 'scroll'; targetId: string }
  | { type: 'external'; href: string; openInNewTab?: boolean }
```

**Navbar Config Types** (`apps/web/src/sections/navbar/types/`):
- `base-navbar-config.type.ts` — Base interface shared by all navbar layouts:
  ```typescript
  interface BaseNavbarConfig {
    sectionId: string;
    layout: string;
    actions: NavbarAction[];
  }
  ```
- `navbar-1-config.type.ts` — Extends BaseNavbarConfig for layout variant 1:
  ```typescript
  interface Navbar1Config extends BaseNavbarConfig {
    layout: 'Navbar1';
    logoText: string;
    logoSrc?: string;
  }
  ```
- `navbar-action.type.ts` — Action specific to navbar items:
  ```typescript
  interface NavbarAction {
    label: string;
    action: Action;
  }
  ```

**Section Config Type** (shared, `packages/schema/src/sections/`):
- `section-config.type.ts` — Generic section config wrapper:
  ```typescript
  interface SectionConfig {
    sectionId: string;
    layout: string;
    [key: string]: unknown;
  }
  ```

**Theme Tokens Type** (shared, `packages/schema/src/theme/`):
- `theme-tokens.type.ts` — Shape of the theme CSS variable structure (for CMS editor awareness)

**Config Shape** (`apps/web/data/config.json`):
```typescript
interface SiteConfig {
  sections: SectionConfig[];
}
```

**Content Shape** (`apps/web/data/content.json`):
```typescript
interface SiteContent {
  [sectionId: string]: Record<string, unknown>;
}
```

[Files]
A total of approximately 60+ files will be created across the monorepo. Below is the complete breakdown.

**Root-Level Configuration Files (new):**
- `package.json` — Root monorepo package.json with npm workspaces config (`workspaces: ["apps/*", "packages/*"]`), Turborepo dev script
- `turbo.json` — Turborepo pipeline definitions: `build`, `dev`, `lint`, `typecheck` with proper dependencies
- `tsconfig.base.json` — Shared TypeScript base config (strict mode, ES2022 target, bundler module resolution, JSX react-jsx)
- `.gitignore` — Standard Node.js ignores + `node_modules`, `dist`, `.output`, `.tanstack`, `routeTree.gen.ts`
- `README.md` — Project overview, monorepo structure, available scripts, architecture link

**Documentation Files (new):**
- `docs/architecture/monorepo-overview.md` — Full architectural blueprint, folder structure, design rules, data flow diagrams
- `docs/plans/implementation_plan.md` — This file

**Shared Package — packages/schema (new):**
- `packages/schema/package.json` — Name: `@static-site-generator/schema`, main entry, types
- `packages/schema/tsconfig.json` — Extends root tsconfig.base.json
- `packages/schema/src/index.ts` — Barrel re-export of all schemas and types
- `packages/schema/src/sections/index.ts` — Re-export section schemas
- `packages/schema/src/sections/base-navbar.schema.ts` — Zod schema for base navbar config
- `packages/schema/src/sections/navbar-1.schema.ts` — Zod schema extending base for Navbar1 layout
- `packages/schema/src/sections/hero-1.schema.ts` — Zod schema placeholder for hero
- `packages/schema/src/sections/section-config.type.ts` — TypeScript type for generic section config
- `packages/schema/src/actions/action.schema.ts` — Zod schema for Action discriminated union
- `packages/schema/src/actions/index.ts` — Re-export
- `packages/schema/src/theme/theme-tokens.schema.ts` — Zod schema for theme token shape
- `packages/schema/src/theme/index.ts` — Re-export

**Web App — apps/web (new):**
- `apps/web/package.json` — Dependencies: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/react-router-devtools`, `zod`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`, `vite`, `typescript`; Dev deps: `@types/react`, `@types/react-dom`, `turbo`
- `apps/web/tsconfig.json` — Extends root tsconfig, paths alias `~/*` to `src/*`
- `apps/web/vite.config.ts` — Vite config with tanstackStart plugin, tailwindcss, tsconfigPaths
- `apps/web/app.css` — Base Tailwind import + theme.css import
- `apps/web/public/assets/` — Empty directory (placeholder for logo, favicons, og image)
- `apps/web/data/config.json` — Initial config with navbar section only:
  ```json
  {
    "sections": [
      { "sectionId": "navbar", "layout": "Navbar1", "logoText": "ForgeStart" }
    ]
  }
  ```
- `apps/web/data/content.json` — Initial content for navbar:
  ```json
  {
    "navbar": {
      "actions": [
        { "label": "Home", "action": { "type": "route", "to": "/" } },
        { "label": "About", "action": { "type": "scroll", "targetId": "about" } },
        { "label": "Contact", "action": { "type": "external", "href": "mailto:hello@example.com" } }
      ]
    }
  }
  ```
- `apps/web/data/theme.css` — CSS variables skeleton (colors, spacing, border-radius, shadows) using HSL values
- `apps/web/src/routes/__root.tsx` — Root route: imports app.css, renders HTML shell with `<Outlet />`, wraps in provider
- `apps/web/src/routes/index.tsx` — Home route: renders `<SectionsRenderer />`

**Actions Domain — apps/web/src/actions/ (new):**
- `apps/web/src/actions/types/action.type.ts` — `Action` discriminated union type
- `apps/web/src/actions/schemas/action.schema.ts` — Zod schema for Action union
- `apps/web/src/actions/components/action-link.component.tsx` — `<ActionLink>` component that delegates to RouteLink, ScrollLink, or ExternalLink based on action.type
- `apps/web/src/actions/components/route-link.component.tsx` — Uses TanStack Router `<Link>` for internal navigation
- `apps/web/src/actions/components/scroll-link.component.tsx` — Handles smooth scroll to anchor by targetId
- `apps/web/src/actions/components/external-link.component.tsx` — Renders `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
- `apps/web/src/actions/index.ts` — Barrel re-exports

**Engine — apps/web/src/engine/ (new):**
- `apps/web/src/engine/component-map.ts` — Imports all registries, exports `componentMap: Map<string, [ZodSchema, Component]>`
- `apps/web/src/engine/sections-renderer.component.tsx` — Reads config, iterates sections, resolves component from map, validates with schema, renders
- `apps/web/src/engine/validate-config.ts` — Loads and validates config.json + content.json against Zod schemas at startup
- `apps/web/src/engine/index.ts` — Barrel re-exports

**Navbar Section — apps/web/src/sections/navbar/ (new):**
- `apps/web/src/sections/navbar/types/base-navbar-config.type.ts` — `BaseNavbarConfig` interface
- `apps/web/src/sections/navbar/types/navbar-1-config.type.ts` — `Navbar1Config extends BaseNavbarConfig`
- `apps/web/src/sections/navbar/types/navbar-action.type.ts` — `NavbarAction` interface
- `apps/web/src/sections/navbar/schemas/base-navbar.schema.ts` — Zod schema for base navbar
- `apps/web/src/sections/navbar/schemas/navbar-1.schema.ts` — Zod schema extending base for Navbar1
- `apps/web/src/sections/navbar/schemas/navbar-action.schema.ts` — Zod schema for navbar actions
- `apps/web/src/sections/navbar/components/navbar-1.component.tsx` — Navbar1 layout: sticky header, logo + links, uses `<ActionLink>`
- `apps/web/src/sections/navbar/components/navbar-logo.component.tsx` — Logo sub-component (text or image)
- `apps/web/src/sections/navbar/components/navbar-links.component.tsx` — Navigation links list using `<ActionLink>`
- `apps/web/src/sections/navbar/registries/navbar-1.registry.ts` — Exports tuple `['Navbar1', navbar1Schema, Navbar1]`
- `apps/web/src/sections/navbar/index.ts` — Barrel re-exports

**Placeholder Sections — apps/web/src/sections/ (new):**
Each section gets the same structure with a placeholder index.ts:
- `apps/web/src/sections/hero/index.ts` — Empty barrel (comment: TODO: implement hero section)
- `apps/web/src/sections/cta/index.ts` — Empty barrel
- `apps/web/src/sections/footer/index.ts` — Empty barrel
- `apps/web/src/sections/gallery/index.ts` — Empty barrel

**UI Components — apps/web/src/ui/ (new):**
- `apps/web/src/ui/button/button.component.tsx` — Minimal shadcn-style button component (will be properly installed via shadcn CLI later)

**CMS App — apps/cms (new, minimal placeholder):**
- `apps/cms/package.json` — Name: `@static-site-generator/cms`, minimal deps (placeholder)
- `apps/cms/tsconfig.json` — Extends root tsconfig
- `apps/cms/src/features/config-editor/index.ts` — Empty placeholder
- `apps/cms/src/features/content-editor/index.ts` — Empty placeholder
- `apps/cms/src/features/theme-editor/index.ts` — Empty placeholder
- `apps/cms/src/features/preview/index.ts` — Empty placeholder
- `apps/cms/src/ui/index.ts` — Empty placeholder
- `apps/cms/src/routes/index.ts` — Empty placeholder

**Existing Files — Preserved (no changes):**
- `.clinerules/actions-and_routing.md` — No changes
- `.clinerules/coding-standards.md` — No changes
- `.clinerules/file-structure.md` — No changes
- `.clinerules/folder-structure.md` — No changes
- `.clinerules/hot-swap-data-structure.md` — No changes
- `.clinerules/registry-component-map.md` — No changes
- `.clinerules/section-architecture.md` — No changes
- `.clinerules/theme-structure.md` — No changes
- `.clinerules/workspace-scope.md` — No changes

[Functions]
Key functions created as part of the scaffold.

**New Functions:**
- `validateConfig()` — `apps/web/src/engine/validate-config.ts` — Loads `config.json` and `content.json`, validates against Zod schemas, throws descriptive errors on failure. Returns typed config objects.
- `createComponentMap()` — `apps/web/src/engine/component-map.ts` — Aggregates all section registry tuples into a `Map<string, [ZodSchema, Component]>`. Called once at module level.
- `SectionsRenderer` — `apps/web/src/engine/sections-renderer.component.tsx` — React component that reads the site config, iterates sections array, resolves each section's component from the component map, validates props, and renders the section tree.
- `ActionLink` — `apps/web/src/actions/components/action-link.component.tsx` — React component accepting an `Action` prop and delegating to the correct sub-component based on `action.type`.
- `RouteLink` — `apps/web/src/actions/components/route-link.component.tsx` — Renders TanStack Router `<Link>` for `type: 'route'` actions.
- `ScrollLink` — `apps/web/src/actions/components/scroll-link.component.tsx` — Handles click-to-scroll behavior for `type: 'scroll'` actions using `document.getElementById`.
- `ExternalLink` — `apps/web/src/actions/components/external-link.component.tsx` — Renders `<a target="_blank" rel="noopener noreferrer">` for `type: 'external'` actions.
- `Navbar1` — `apps/web/src/sections/navbar/components/navbar-1.component.tsx` — Main navbar layout component. Renders logo + navigation links. Uses structural Tailwind classes only.
- `NavbarLogo` — `apps/web/src/sections/navbar/components/navbar-logo.component.tsx` — Renders logo text or image based on config.
- `NavbarLinks` — `apps/web/src/sections/navbar/components/navbar-links.component.tsx` — Maps over `NavbarAction[]` and renders `<ActionLink>` for each.

**No Modified or Removed Functions** — This is a greenfield project.

[Classes]
No classes are created. The project uses a functional programming model with:
- React functional components (not class components)
- Plain TypeScript interfaces and types (not classes)
- Zod schemas (function-based API)
- Module-level constants (component map, registries)

This aligns with the Single Export Law and modern React/TanStack conventions.

[Dependencies]
All dependencies will be installed via npm during the scaffold process.

**Root-Level Dependencies (devDependencies):**
- `turbo` — ^2.x — Turborepo for monorepo build orchestration
- `typescript` — ^5.x — Shared TypeScript compiler

**apps/web Dependencies:**
- `@tanstack/react-router` — latest stable — Type-safe routing
- `@tanstack/react-start` — latest stable — Full-stack React framework
- `@tanstack/react-router-devtools` — latest stable — Router dev tools (dev only)
- `react` — ^19.x — React core
- `react-dom` — ^19.x — React DOM renderer
- `zod` — ^3.x — Runtime schema validation
- `tailwindcss` — ^4.x — Utility-first CSS (v4 with Vite plugin)
- `@tailwindcss/vite` — ^4.x — Tailwind CSS Vite plugin
- `vite` — ^6.x — Build tool
- `@vitejs/plugin-react` — ^4.x — React support for Vite
- `vite-tsconfig-paths` — ^5.x — Resolve tsconfig paths in Vite

**apps/web DevDependencies:**
- `@types/react` — ^19.x — React type definitions
- `@types/react-dom` — ^19.x — React DOM type definitions

**packages/schema Dependencies:**
- `zod` — ^3.x — Schema definition (peer dependency from root)
- `typescript` — ^5.x — (dev dep)

**apps/cms Dependencies (minimal):**
- `typescript` — ^5.x — (dev dep only, placeholder)

**Integration Notes:**
- TanStack Start uses Vite under the hood — configuration goes in `vite.config.ts` with the `tanstackStart()` plugin
- Tailwind CSS v4 uses the `@tailwindcss/vite` plugin instead of PostCSS — no `tailwind.config.js` needed
- Theme CSS variables are imported via `app.css` which imports `data/theme.css`
- `routeTree.gen.ts` is auto-generated by TanStack Router — must be gitignored

[Testing]
No tests will be written in this initial scaffold phase. The focus is on project structure and workflow setup.

**Future Testing Setup (documented for reference):**
- Test runner: Vitest (integrates natively with Vite)
- Component tests: React Testing Library
- Schema tests: Direct Zod `.parse()` / `.safeParse()` calls
- Config validation tests: Load fixture JSON files, validate against schemas
- Test location: Co-located `*.spec.ts` / `*.test.ts` files next to source

**Validation Strategy for This Phase:**
1. `npm install` succeeds at root without errors
2. `turbo build` succeeds for all packages
3. `turbo dev` starts the web app without errors
4. Navigate to `http://localhost:3000` and see the navbar rendered
5. TypeScript strict mode produces no errors (`turbo typecheck` passes)

[Implementation Order]
The following sequence minimizes conflicts and ensures each step builds on a verified foundation.

1. **Initialize git repository** — `git init` at project root
2. **Create root configuration files** — `package.json` (with workspaces), `turbo.json`, `tsconfig.base.json`, `.gitignore`
3. **Install root dependencies** — `npm install` (turbo, typescript)
4. **Create packages/schema scaffold** — `package.json`, `tsconfig.json`, `src/` with all Zod schemas and types, barrel exports
5. **Create apps/web scaffold** — `package.json`, `tsconfig.json`, `vite.config.ts`, `app.css`
6. **Install apps/web dependencies** — `npm install` from root (workspaces resolve deps)
7. **Create data files** — `config.json`, `content.json`, `theme.css` in `apps/web/data/`
8. **Create actions domain** — types, schemas, components (`action-link`, `route-link`, `scroll-link`, `external-link`), barrel exports
9. **Create navbar section** — types, schemas, components (`navbar-1`, `navbar-logo`, `navbar-links`), registry, barrel exports
10. **Create placeholder sections** — hero, cta, footer, gallery empty barrels
11. **Create engine** — `component-map.ts`, `validate-config.ts`, `sections-renderer.component.tsx`
12. **Create routes** — `__root.tsx` (HTML shell, imports app.css, SectionsRenderer), `index.tsx` (home)
13. **Create apps/cms minimal placeholder** — `package.json`, `tsconfig.json`, empty feature/route folders
14. **Create documentation** — `docs/architecture/monorepo-overview.md`, update `README.md`
15. **Verify build** — Run `turbo build` and `turbo typecheck` to confirm zero errors
16. **Verify dev server** — Run `turbo dev` and confirm navbar renders at localhost
17. **Initial git commit** — Stage all files, commit with message "chore: initial monorepo scaffold"