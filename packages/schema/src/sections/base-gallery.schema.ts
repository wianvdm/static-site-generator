import { z } from 'zod';

export const baseGallerySchema = z.object({
  sectionId: z.string(),
  layout: z.string(),
  title: z.string().optional(),
  items: z.array(
    z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    }),
  ).optional(),
});