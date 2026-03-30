import { z } from 'zod';
import { componentMap } from './component-map';

const configSchema = z.object({
  siteName: z.string(),
  sections: z.array(z.object({
    type: z.string(),
    layout: z.string(),
  })),
});

export type SiteConfig = z.infer<typeof configSchema>;

export function validateConfig(raw: unknown): SiteConfig {
  return configSchema.parse(raw);
}