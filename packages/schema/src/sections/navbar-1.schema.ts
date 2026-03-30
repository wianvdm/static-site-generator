import { z } from 'zod';
import { baseNavbarSchema } from './base-navbar.schema';

export const navbar1Schema = baseNavbarSchema.extend({
  layout: z.literal('Navbar1'),
  logoText: z.string(),
  logoSrc: z.string().optional(),
});