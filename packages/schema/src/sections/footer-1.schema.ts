import { z } from 'zod';
import { baseFooterSchema } from './base-footer.schema';

export const footer1Schema = baseFooterSchema.extend({
  layout: z.literal('Footer1'),
});