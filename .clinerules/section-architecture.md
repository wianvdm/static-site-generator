Section architecture & base inheritance
- Every section domain lives under src/sections/<domain>/ (e.g., src/sections/navbar).
- Each section must have a base schema/type (e.g., base-navbar.schema.ts) that defines the shared fields all layouts of that domain use.
- Layout-specific schemas extend the base schema (e.g., navbar-1.schema.ts extends base-navbar.schema.ts).
- Layout-specific components (e.g., Navbar1) receive only the layout config + data; they must not define new data fields beyond those in the schema.
- Section-unique toggles (e.g., hasGlow) must have safe defaults in the layout component so switching layouts never breaks the site.