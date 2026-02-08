export type Role = 'user' | 'admin';

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  ward?: string;
  district: string;
  city: string;
  province?: string;
  country: 'VN';
}

export interface UserPreferences {
  marketingEmail: boolean;
  marketingSms: boolean;
}

export interface User {
  _id: string;
  email: string;
  phone?: string;
  role: Role;
  addresses: Address[];
  preferences: UserPreferences;
}

export interface Category {
  _id: string;
  name: {
    vi: string;
    en?: string;
  };
  slug: string;
  parentId?: string | null;
  ancestors: string[];
  level: number;
  path: string;
}

export interface ProductVariant {
  _id: string;
  price: number;
  inventory: number;
  options: {
    shade?: string;
    size?: string;
  };
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  brand: string;
  categories: string[];
  tags: string[];
  images: string[];
  description?: string;
  hasVariants: boolean;
  variants: ProductVariant[];
  madeIn: string;
  inci: string;
  ratingAverage: number;
  ratingCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  qty: number;
  price: number;
  title: string;
  image?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: 'pending' | 'confirmed' | 'shipped' | 'canceled';
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}
