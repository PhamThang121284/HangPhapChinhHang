import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  line1: z.string().min(2),
  line2: z.string().optional(),
  ward: z.string().optional(),
  district: z.string().min(2),
  city: z.string().min(2),
  province: z.string().optional(),
  country: z.literal('VN'),
});

export const userPreferencesSchema = z.object({
  marketingEmail: z.boolean().default(false),
  marketingSms: z.boolean().default(false),
});

export const registerSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  fullName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8),
});

export const productVariantSchema = z.object({
  price: z.number().min(0),
  inventory: z.number().min(0),
  options: z.object({
    shade: z.string().optional(),
    size: z.string().optional(),
  }),
});

export const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  brand: z.string().min(2),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url()).min(1),
  description: z.string().optional(),
  hasVariants: z.boolean().default(true),
  variants: z.array(productVariantSchema).min(1),
  madeIn: z.string().min(2),
  inci: z.string().min(2),
  isActive: z.boolean().default(true),
});

export const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  qty: z.number().min(1),
  price: z.number().min(0),
  title: z.string().min(2),
  image: z.string().url().optional(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddress: addressSchema,
});
