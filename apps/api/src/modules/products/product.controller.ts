import { Request, Response } from 'express';
import { ApiError } from '../../utils/api-error.js';
import { createProductService, getProductBySlug, listProductsService, updateProductService } from './product.service.js';

export const listProductsHandler = async (req: Request, res: Response) => {
  const { category, q, sort, page } = req.query as Record<string, string>;
  const result = await listProductsService({
    category,
    q,
    sort,
    page: page ? Number(page) : 1,
  });
  res.json(result);
};

export const getProductHandler = async (req: Request, res: Response) => {
  const product = await getProductBySlug(req.params.slug);
  if (!product) {
    throw new ApiError(404, 'Không tìm thấy sản phẩm.');
  }
  res.json(product);
};

export const createProductHandler = async (req: Request, res: Response) => {
  const product = await createProductService(req.body);
  res.status(201).json(product);
};

export const updateProductHandler = async (req: Request, res: Response) => {
  const product = await updateProductService(req.params.id, req.body);
  res.json(product);
};
