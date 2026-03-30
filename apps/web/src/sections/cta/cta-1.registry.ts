import { z } from 'zod';
import { Cta1 } from './cta-1.component';

const cta1Schema = z.object({ sectionId: z.string(), layout: z.literal('Cta1') });

export const cta1Registry = ['cta-1', cta1Schema, Cta1] as const;