import { Router } from 'express';
import {
  createProductHandler,
  getProductHandler,
  listProductsHandler,
  updateProductHandler,
} from './product.controller.js';
import { requireAuth } from '../../middleware/require-auth.js';
import { requireRole } from '../../middleware/require-role.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { productCreateSchema, productUpdateSchema } from './product.schema.js';
import { asyncHandler } from '../../utils/async-handler.js';

export const productRoutes = Router();

productRoutes.get('/', asyncHandler(listProductsHandler));
productRoutes.get('/:slug', asyncHandler(getProductHandler));
productRoutes.post(
  '/',
  requireAuth,
  requireRole('admin'),
  validateRequest(productCreateSchema),
  asyncHandler(createProductHandler)
);
productRoutes.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validateRequest(productUpdateSchema),
  asyncHandler(updateProductHandler)
);
