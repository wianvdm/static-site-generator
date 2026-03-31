import { z } from 'zod';
import { baseSidebarSchema } from './base-sidebar.schema';

export const sidebar1Schema = baseSidebarSchema.extend({
  layout: z.literal('Sidebar1'),
  navigationLabel: z.string().optional(),
  activeIndex: z.number().int().nonnegative().optional(),
});
