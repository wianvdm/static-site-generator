import { z } from 'zod';
import { Gallery1 } from './gallery-1.component';

const gallery1Schema = z.object({ sectionId: z.string(), layout: z.literal('Gallery1') });

export const gallery1Registry = ['gallery-1', gallery1Schema, Gallery1] as const;