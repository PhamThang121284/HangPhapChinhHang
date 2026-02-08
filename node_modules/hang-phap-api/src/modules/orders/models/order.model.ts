import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    ward: { type: String },
    district: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String },
    country: { type: String, default: 'VN' },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: { type: addressSchema, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'canceled'], default: 'pending' },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model('Order', orderSchema);
