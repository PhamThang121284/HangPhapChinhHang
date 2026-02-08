import mongoose, { Schema } from 'mongoose';

const variantSchema = new Schema(
  {
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    options: {
      shade: { type: String },
      size: { type: String },
    },
  },
  { _id: true }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', index: true }],
    tags: [{ type: String }],
    images: [{ type: String, required: true }],
    description: { type: String },
    hasVariants: { type: Boolean, default: true },
    variants: { type: [variantSchema], default: [] },
    madeIn: { type: String, default: 'France' },
    inci: { type: String, required: true },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model('Product', productSchema);
