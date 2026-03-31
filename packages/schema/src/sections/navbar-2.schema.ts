import { z } from 'zod';
import { baseNavbarSchema } from './base-navbar.schema';

export const navbar2Schema = baseNavbarSchema.extend({
  layout: z.literal('Navbar2'),
});