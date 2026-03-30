Data & hot-swap behavior
- The template is SPA-first. No API calls for content delivery.
- Content lives in apps/web/data (config.json, content.json) and apps/web/public for assets.
- In dev, these files are imported directly so Vite HMR applies when the CMS writes to them.
- Sections that need assets (e.g., gallery) must:
  - Use import.meta.glob (eager) against a public folder.
  - Gracefully handle empty folders by rendering nothing (no error).
- Never hardcode asset paths or file lists; always derive them from the file system or config.