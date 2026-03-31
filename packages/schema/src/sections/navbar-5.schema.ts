import { z } from 'zod';
import { baseNavbarSchema } from './base-navbar.schema';

export const navbar5Schema = baseNavbarSchema.extend({
  layout: z.literal('Navbar5'),
});