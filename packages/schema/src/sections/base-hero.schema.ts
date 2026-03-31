import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseHeroSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  heading: z.string(),
  subheading: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaAction: actionSchema.optional(),
});