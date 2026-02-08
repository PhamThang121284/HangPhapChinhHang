import { Response } from 'express';
import { AuthRequest } from '../../middleware/require-auth.js';
import { ApiError } from '../../utils/api-error.js';
import { createOrderService, getOrderDetail, getOrdersForUser } from './order.service.js';

export const createOrderHandler = async (req: AuthRequest, res: Response) => {
  const order = await createOrderService({
    userId: req.user!.id,
    userEmail: req.user!.email,
    items: req.body.items,
    shippingAddress: req.body.shippingAddress,
  });
  res.status(201).json(order);
};

export const getMyOrdersHandler = async (req: AuthRequest, res: Response) => {
  const orders = await getOrdersForUser(req.user!.id);
  res.json(orders);
};

export const getOrderHandler = async (req: AuthRequest, res: Response) => {
  const order = await getOrderDetail(req.params.id);
  if (!order) {
    throw new ApiError(404, 'Không tìm thấy đơn hàng.');
  }
  if (order.userId.toString() !== req.user!.id && req.user!.role !== 'admin') {
    throw new ApiError(403, 'Không đủ quyền truy cập.');
  }
  res.json(order);
};
