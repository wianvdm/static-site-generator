import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseSidebarSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  logoSrc: z.string().optional(),
  logoText: z.string(),
  brandTagline: z.string().optional(),
  tagline: z.string().optional(),
  actions: z.array(
    z.object({
      label: z.string(),
      action: actionSchema,
      icon: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
  ),
  cta: z
    .object({
      label: z.string(),
      action: actionSchema,
    })
    .optional(),
  ctaSubtext: z.string().optional(),
});