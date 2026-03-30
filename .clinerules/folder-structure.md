Folder structure & where to put plans
- Plans must be stored under: docs/plans/<plan-name>.md
- <plan-name> should be kebab-case and descriptive (e.g., action-system-design.md).
- Do not place plan files in the repository root; keep root clean.
- Follow the monorepo layout exactly (see: docs/architecture/monorepo-overview.md).
  Key top-level folders:
  - apps/web  — template site
  - apps/cms  — admin dashboard
  - packages/schema — shared schemas/types
  - docs/     — architecture & plans