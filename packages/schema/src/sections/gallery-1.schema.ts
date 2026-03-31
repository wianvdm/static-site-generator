import { z } from 'zod';
import { baseGallerySchema } from './base-gallery.schema';

export const gallery1Schema = baseGallerySchema.extend({
  layout: z.literal('Gallery1'),
});