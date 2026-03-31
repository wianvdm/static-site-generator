import { z } from 'zod';
import { baseHeroSchema } from './base-hero.schema';

export const hero1Schema = baseHeroSchema.extend({
  layout: z.literal('Hero1'),
});
