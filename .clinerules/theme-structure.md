Theme dictatorship
- All visual styling must flow from the theme file (CSS variables).
- In components:
  - Allowed: structural/utility classes (flex, grid-cols-3, gap-4, p-4, relative, overflow-hidden, etc).
  - Allowed: theme-mapped classes (bg-primary, text-muted-foreground, border-input, shadow-sm, rounded-lg, etc).
  - Prohibited: hardcoded aesthetic classes (e.g., bg-blue-500, text-[#1a1a1a], shadow-[0_0_15px_blue], backdrop-blur-custom).
- If a layout needs a special visual (e.g., frosted glass), represent it with a CSS variable in the theme file (even if initially empty) and use that variable.
- Do not add custom aesthetic styling to a section component; it must respect the user’s theme file.