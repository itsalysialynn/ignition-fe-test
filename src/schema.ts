import { z } from 'zod'
import { PriceType } from './types/PriceType.ts'

const fixedPriceSchema = z.object({
  type: z.literal(PriceType.Fixed),
  amount: z.number().min(0, 'Amount must be a positive number'),
})

const rangePriceSchema = z.object({
  type: z.literal(PriceType.Range),
  amount: z
    .object({
      min: z.number().min(0, 'Min must be a positive number'),
      max: z.number().min(0, 'Max must be a positive number'),
    })
    .refine((data) => data.min < data.max, {
      message: 'Min must be less than max',
      path: ['min'],
    }),
})

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'String must contain at least 1 character(s)')
    .max(10, 'String must contain at most 10 character(s)'),
  email: z.string().email('Invalid email'),
  price: z
    .discriminatedUnion('type', [fixedPriceSchema, rangePriceSchema])
    .optional(),
})
