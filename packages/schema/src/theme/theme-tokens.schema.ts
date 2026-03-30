import { z } from 'zod';

export const themeTokensSchema = z.object({
  colors: z.record(z.string()).optional(),
  spacing: z.record(z.string()).optional(),
  borderRadius: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional(),
});