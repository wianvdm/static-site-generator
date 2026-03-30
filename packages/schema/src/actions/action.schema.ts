import { z } from 'zod';

export const routeActionSchema = z.object({
  type: z.literal('route'),
  to: z.string(),
});

export const scrollActionSchema = z.object({
  type: z.literal('scroll'),
  targetId: z.string(),
});

export const externalActionSchema = z.object({
  type: z.literal('external'),
  href: z.string(),
  openInNewTab: z.boolean().optional(),
});

export const actionSchema = z.discriminatedUnion('type', [
  routeActionSchema,
  scrollActionSchema,
  externalActionSchema,
]);