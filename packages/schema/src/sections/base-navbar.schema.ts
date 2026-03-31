import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseNavbarSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  logoSrc: z.string().optional(),
  logoText: z.string(),
  brandTagline: z.string().optional(),
  actions: z.array(
    z.object({
      label: z.string(),
      action: actionSchema,
    }),
  ),
  cta: z
    .object({
      label: z.string(),
      action: actionSchema,
    })
    .optional(),
  phone: z.string().optional(),
});