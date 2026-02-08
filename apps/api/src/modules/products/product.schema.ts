import { z } from 'zod';

const variantSchema = z.object({
  price: z.number().min(0),
  inventory: z.number().min(0),
  options: z.object({
    shade: z.string().optional(),
    size: z.string().optional(),
  }),
});

export const productCreateSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    brand: z.string().min(2),
    categories: z.array(z.string()).min(1),
    tags: z.array(z.string()).optional().default([]),
    images: z.array(z.string().url()).min(1),
    description: z.string().optional(),
    hasVariants: z.boolean().default(true),
    variants: z.array(variantSchema).min(1),
    madeIn: z.string().min(2),
    inci: z.string().min(2),
    isActive: z.boolean().default(true),
  }),
});

export const productUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    brand: z.string().min(2).optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string().url()).optional(),
    description: z.string().optional(),
    hasVariants: z.boolean().optional(),
    variants: z.array(variantSchema).optional(),
    madeIn: z.string().min(2).optional(),
    inci: z.string().min(2).optional(),
    isActive: z.boolean().optional(),
  }),
});
