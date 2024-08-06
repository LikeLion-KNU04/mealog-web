import { z } from 'zod'

export const articlePostSchema = z.object({
  mealId: z.string(),
})
