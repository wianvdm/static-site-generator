Single Export Law
- One export per file: 1 type, 1 interface, 1 schema, 1 component, 1 utility function per file.
- Use barrel index.ts files (e.g., sections/navbar/index.ts) only for re-exports.
- Do not define multiple types, schemas, or components in a single non-index file.
- Exception: small, tightly related literal types used only in the same file (prefer to extract them when they’re reused).