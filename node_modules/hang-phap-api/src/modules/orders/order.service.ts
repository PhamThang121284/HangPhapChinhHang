import { config } from '../../config/index.js';
import { sendEmail } from '../../emails/mailer.js';
import { createOrder, getOrderById, listOrdersByUser } from './order.repository.js';

export const createOrderService = async (data: {
  userId: string;
  userEmail: string;
  items: { qty: number; price: number; title: string; image?: string }[];
  shippingAddress: Record<string, string>;
}) => {
  const subtotal = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shippingFee = subtotal > 1000000 ? 0 : 30000;
  const total = subtotal + shippingFee;
  const order = await createOrder({
    userId: data.userId,
    items: data.items,
    shippingAddress: data.shippingAddress,
    subtotal,
    shippingFee,
    total,
  });

  const itemsHtml = data.items
    .map((item) => `<li>${item.title} x${item.qty} - ${item.price.toLocaleString('vi-VN')}đ</li>`)
    .join('');

  await sendEmail({
    to: config.adminEmail,
    subject: `Đơn hàng mới #${order.id}`,
    html: `<h3>Đơn hàng mới</h3><ul>${itemsHtml}</ul><p>Tổng: ${total.toLocaleString(
      'vi-VN'
    )}đ</p>`,
  });

  await sendEmail({
    to: data.userEmail,
    subject: `Xác nhận đơn hàng #${order.id}`,
    html: `<p>Cảm ơn bạn đã đặt hàng tại Hàng Pháp Chính Hãng.</p><ul>${itemsHtml}</ul><p>Tổng: ${total.toLocaleString(
      'vi-VN'
    )}đ</p>`,
  });

  return order;
};

export const getOrdersForUser = (userId: string) => listOrdersByUser(userId);

export const getOrderDetail = (id: string) => getOrderById(id);
