import { createProduct, findProductBySlug, listProducts, updateProduct } from './product.repository.js';

export const createProductService = (data: Record<string, unknown>) => createProduct(data);

export const updateProductService = (id: string, data: Record<string, unknown>) => updateProduct(id, data);

export const getProductBySlug = (slug: string) => findProductBySlug(slug);

export const listProductsService = (params: {
  category?: string;
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  const filter: Record<string, unknown> = { isActive: true };
  if (params.category) {
    filter.categories = params.category;
  }
  if (params.q) {
    filter.title = { $regex: params.q, $options: 'i' };
  }
  const limit = params.limit ?? 12;
  const page = params.page ?? 1;
  const sort: Record<string, 1 | -1> = { createdAt: -1 };
  if (params.sort === 'price-asc') {
    sort['variants.0.price'] = 1;
  }
  if (params.sort === 'price-desc') {
    sort['variants.0.price'] = -1;
  }
  const skip = (page - 1) * limit;
  return listProducts(filter, { sort, skip, limit });
};
