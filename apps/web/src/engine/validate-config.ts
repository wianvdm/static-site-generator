import {
  navbar1Schema,
  navbar2Schema,
  navbar3Schema,
  navbar5Schema,
  sidebar1Schema,
  hero1Schema,
  cta1Schema,
  footer1Schema,
  gallery1Schema,
} from '@static-site-generator/schema';
import { z } from 'zod';
import { componentMap } from './component-map';

const configSchema = z.object({
  siteName: z.string(),
  sections: z.array(
    z.object({
      type: z.string(),
      layout: z.string(),
    }),
  ),
});

export type SiteConfig = z.infer<typeof configSchema>;

const sectionSchemaMap: Record<string, z.ZodSchema> = {
  Navbar1: navbar1Schema,
  Navbar2: navbar2Schema,
  Navbar3: navbar3Schema,
  Navbar5: navbar5Schema,
  Sidebar1: sidebar1Schema,
  Hero1: hero1Schema,
  Cta1: cta1Schema,
  Footer1: footer1Schema,
  Gallery1: gallery1Schema,
};

export function validateConfig(raw: unknown): SiteConfig {
  return configSchema.parse(raw);
}

function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function validateSection(layout: string, data: unknown): unknown {
  const normalized = toPascalCase(layout);
  const schema = sectionSchemaMap[normalized];
  if (!schema) {
    console.warn(`[validate-config] No schema found for layout "${layout}"`);
    return data;
  }
  return schema.parse(data);
}