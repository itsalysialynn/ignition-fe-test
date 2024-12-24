import { z } from 'zod'
import { PriceType } from './types/PriceType'

/**
 * Additional considerations not implemented:
 * - Transform amounts to cents before sending to the API for enhanced precision.
 * - If the API does not accept cents, transform all amounts to consistently send two decimal places.
 * - Add validation to ensure that the amount fields accept only up to two decimal places.
 */

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
    .trim()
    .min(1, 'String must contain at least 1 character(s)')
    .max(10, 'String must contain at most 10 character(s)'),
  email: z.string().trim().toLowerCase().email('Invalid email'),
  price: z
    .discriminatedUnion('type', [fixedPriceSchema, rangePriceSchema])
    .optional(),
})
