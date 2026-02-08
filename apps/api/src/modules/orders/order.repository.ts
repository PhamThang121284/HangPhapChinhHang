import { OrderModel } from './models/order.model.js';

export const createOrder = (data: Record<string, unknown>) => OrderModel.create(data);

export const listOrdersByUser = (userId: string) =>
  OrderModel.find({ userId }).sort({ createdAt: -1 }).exec();

export const getOrderById = (id: string) => OrderModel.findById(id).exec();
