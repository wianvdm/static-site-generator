Registry & component-map
- Each layout must have a single registry file at registries/<layout>.registry.ts.
- That file exports exactly one constant: a tuple [string, ZodSchema, Component].
- The engine/src/engine/component-map.ts aggregates these registries.
- Never edit component-map.ts logic when adding a new section; just add the registry import and include the tuple in the aggregation map.