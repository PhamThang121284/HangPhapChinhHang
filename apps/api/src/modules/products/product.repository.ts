import { ProductModel } from './models/product.model.js';

export const createProduct = (data: Record<string, unknown>) => ProductModel.create(data);

export const updateProduct = (id: string, data: Record<string, unknown>) =>
  ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();

export const findProductBySlug = (slug: string) => ProductModel.findOne({ slug, isActive: true }).exec();

export const listProducts = async (filter: Record<string, unknown>, options: {
  sort: Record<string, 1 | -1>;
  skip: number;
  limit: number;
}) => {
  const items = await ProductModel.find(filter)
    .sort(options.sort)
    .skip(options.skip)
    .limit(options.limit)
    .exec();
  const total = await ProductModel.countDocuments(filter).exec();
  return { items, total };
};
