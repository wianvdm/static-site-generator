import { z } from 'zod';
import { baseNavbarSchema } from './base-navbar.schema';

export const navbar3Schema = baseNavbarSchema.extend({
  layout: z.literal('Navbar3'),
});