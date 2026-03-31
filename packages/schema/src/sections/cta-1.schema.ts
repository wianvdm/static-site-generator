import { z } from 'zod';
import { baseCtaSchema } from './base-cta.schema';

export const cta1Schema = baseCtaSchema.extend({
  layout: z.literal('Cta1'),
});