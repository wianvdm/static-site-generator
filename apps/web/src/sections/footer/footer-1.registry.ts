import { z } from 'zod';
import { Footer1 } from './footer-1.component';

const footer1Schema = z.object({ sectionId: z.string(), layout: z.literal('Footer1') });

export const footer1Registry = ['footer-1', footer1Schema, Footer1] as const;