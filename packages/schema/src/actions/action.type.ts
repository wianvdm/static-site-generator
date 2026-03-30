import { z } from 'zod';
import { actionSchema } from './action.schema';

export type Action = z.infer<typeof actionSchema>;