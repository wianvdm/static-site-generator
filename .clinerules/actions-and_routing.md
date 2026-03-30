Actions domain & routing
- Sections never handle routing directly. They render <ActionLink> from src/actions.
- src/actions must provide implementations for:
  - Internal route navigation using TanStack Router <Link>
  - Scroll to anchor (id)
  - External link (target="_blank")
- Action schemas/types live in src/actions/types and src/actions/schemas.
- Do not import TanStack Router primitives directly in section components; use the ActionLink abstraction.