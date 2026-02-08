import { Router } from 'express';
import { getCategoryTreeHandler } from './category.controller.js';
import { asyncHandler } from '../../utils/async-handler.js';

export const categoryRoutes = Router();

categoryRoutes.get('/tree', asyncHandler(getCategoryTreeHandler));
