import { z } from 'zod'

export const memberPostSchema = z.object({
  name: z.string(),
  gender: z.string(),
  birthDate: z.string(),
  height: z.number(),
  weight: z.number(),
})
