import mongoose from "mongoose";

const { Schema } = mongoose;

const LocalizedStringSchema = new Schema(
  {
    vi: { type: String, trim: true, required: true },
    en: { type: String, trim: true, required: true },
  },
  { _id: false },
);

const CategorySchema = new Schema(
  {
    name: { type: LocalizedStringSchema, required: true },

    // URL-friendly (store one canonical slug; you can also add vi/en slugs if needed)
    slug: { type: String, trim: true, lowercase: true, required: true },

    // Parent/child tree
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    // Materialized path fields for fast queries (recommended)
    ancestors: [{ type: Schema.Types.ObjectId, ref: "Category", index: true }], // root -> parent
    level: { type: Number, default: 0, min: 0, index: true }, // root=0, child=1...
    path: { type: String, trim: true, index: true }, // e.g. "makeup/lips/lipstick"

    // Navigation / sorting
    sortOrder: { type: Number, default: 0, index: true },

    // Optional extras
    imageUrl: { type: String, trim: true },
    description: { type: LocalizedStringSchema },
    seo: {
      title: { type: LocalizedStringSchema },
      description: { type: LocalizedStringSchema },
    },

    isActive: { type: Boolean, default: true, index: true },
    deletedAt: { type: Date, index: true }, // soft delete (optional)
  },
  { timestamps: true },
);

// Uniqueness: often best to enforce uniqueness per parent (so you can reuse slugs in different branches if needed)
CategorySchema.index({ parentId: 1, slug: 1 }, { unique: true });

// Helpful: fast tree queries (children of X, subtree of X)
CategorySchema.index({ parentId: 1, sortOrder: 1 });
CategorySchema.index({ ancestors: 1, isActive: 1 });

export default mongoose.model("Category", CategorySchema);
