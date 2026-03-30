Standard coding practices
- Use TypeScript strict mode; leverage packages/schema for shared types/schemas.
- Validate all JSON config/content at startup using Zod schemas from packages/schema.
- Prefer named exports; avoid default exports unless required by a framework integration.
- Keep files small and focused (one concern per file, per Single Export Law).
- Prefer composition and small sub-components over large monolithic components.
- Document complex intent with comments; prefer self-explanatory names.
- When in doubt, mirror existing section structure (navbar as the reference implementation).