import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z.string(),
          variantId: z.string().optional(),
          qty: z.number().min(1),
          price: z.number().min(0),
          title: z.string().min(2),
          image: z.string().url().optional(),
        })
      )
      .min(1),
    shippingAddress: z.object({
      fullName: z.string().min(2),
      phone: z.string().min(8),
      line1: z.string().min(2),
      line2: z.string().optional(),
      ward: z.string().optional(),
      district: z.string().min(2),
      city: z.string().min(2),
      province: z.string().optional(),
      country: z.literal('VN'),
    }),
  }),
});
