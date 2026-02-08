import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { userRoutes } from '../modules/users/user.routes.js';
import { productRoutes } from '../modules/products/product.routes.js';
import { categoryRoutes } from '../modules/categories/category.routes.js';
import { orderRoutes } from '../modules/orders/order.routes.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/orders', orderRoutes);
