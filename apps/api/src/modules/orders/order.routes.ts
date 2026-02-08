import { Router } from 'express';
import { createOrderHandler, getMyOrdersHandler, getOrderHandler } from './order.controller.js';
import { requireAuth } from '../../middleware/require-auth.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { createOrderSchema } from './order.schema.js';
import { asyncHandler } from '../../utils/async-handler.js';

export const orderRoutes = Router();

orderRoutes.post('/', requireAuth, validateRequest(createOrderSchema), asyncHandler(createOrderHandler));
orderRoutes.get('/me', requireAuth, asyncHandler(getMyOrdersHandler));
orderRoutes.get('/:id', requireAuth, asyncHandler(getOrderHandler));
