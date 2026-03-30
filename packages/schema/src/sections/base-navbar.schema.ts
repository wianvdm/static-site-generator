import { z } from 'zod';
import { actionSchema } from '../actions/action.schema';

export const baseNavbarSchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  actions: z.array(
    z.object({
      label: z.string(),
      action: actionSchema,
    }),
  ),
});