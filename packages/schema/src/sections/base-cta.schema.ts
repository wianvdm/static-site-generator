import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseCtaSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  heading: z.string(),
  subheading: z.string().optional(),
  buttonLabel: z.string().optional(),
  buttonAction: actionSchema.optional(),
});