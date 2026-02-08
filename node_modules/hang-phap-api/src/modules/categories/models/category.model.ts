import mongoose, { Schema } from 'mongoose';

const nameSchema = new Schema(
  {
    vi: { type: String, required: true },
    en: { type: String },
  },
  { _id: false }
);

const categorySchema = new Schema(
  {
    name: { type: nameSchema, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    ancestors: { type: [Schema.Types.ObjectId], default: [], index: true },
    level: { type: Number, default: 0, index: true },
    path: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model('Category', categorySchema);
