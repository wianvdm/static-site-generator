import { z } from 'zod';

// TODO: implement hero-1 schema
export const hero1Schema = z.object({
  sectionId: z.string(),
  layout: z.literal('Hero1'),
});