import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseFooterSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  copyright: z.string().optional(),
  links: z.array(
    z.object({
      label: z.string(),
      action: actionSchema,
    }),
  ).optional(),
});