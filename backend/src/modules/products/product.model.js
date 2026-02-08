import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false },
);

const PriceSchema = new Schema(
  {
    currency: { type: String, default: "VND", trim: true }, // VND by default
    amount: { type: Number, required: true, min: 0 }, // store as integer (VND)
    compareAt: { type: Number, min: 0 }, // original price (optional)
  },
  { _id: false },
);

const InventorySchema = new Schema(
  {
    sku: { type: String, trim: true, required: true },
    barcode: { type: String, trim: true }, // EAN/UPC (optional)
    track: { type: Boolean, default: true },
    quantity: { type: Number, default: 0, min: 0 },
    lowStockThreshold: { type: Number, default: 5, min: 0 },
  },
  { _id: false },
);

// For makeup: shade/color/size combos
const VariantSchema = new Schema(
  {
    title: { type: String, trim: true, required: true }, // e.g. "Shade 03 - Rose"
    options: {
      shade: { type: String, trim: true }, // "Rose", "Nude", etc.
      size: { type: String, trim: true }, // "30ml", "Full size"
      colorHex: { type: String, trim: true }, // "#d9a0a7" optional
    },
    price: { type: PriceSchema, required: true },
    inventory: { type: InventorySchema, required: true },
    images: { type: [ProductImageSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const ComplianceSchema = new Schema(
  {
    madeIn: { type: String, default: "France", trim: true },
    countryOfOrigin: { type: String, default: "FR", trim: true }, // ISO-2
    inciIngredients: [{ type: String, trim: true }], // INCI list
    netWeight: { type: String, trim: true }, // "8g"
    netVolume: { type: String, trim: true }, // "30ml"
    paoMonths: { type: Number, min: 0 }, // Period After Opening
    batchCode: { type: String, trim: true },
    expiryDate: { type: Date }, // optional
    cautions: [{ type: String, trim: true }],
  },
  { _id: false },
);

const RatingsSchema = new Schema(
  {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    // Core identity
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, trim: true },
    shortDescription: { type: String, trim: true },

    // Brand + categorization
    brand: {
      id: { type: Schema.Types.ObjectId, ref: "Brand" },
      name: { type: String, trim: true, required: true },
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", index: true }],
    tags: [{ type: String, trim: true, lowercase: true, index: true }],

    // Media
    images: { type: [ProductImageSchema], default: [] }, // main gallery
    videoUrl: { type: String, trim: true },

    // Pricing model
    // If product has variants: use variants[].price
    // If no variants: use basePrice + inventory
    hasVariants: { type: Boolean, default: true, index: true },
    basePrice: { type: PriceSchema }, // used when hasVariants=false
    inventory: { type: InventorySchema }, // used when hasVariants=false
    variants: { type: [VariantSchema], default: [] },

    // Merchandising
    attributes: {
      finish: { type: String, trim: true }, // matte, dewy...
      skinType: [{ type: String, trim: true }], // oily, dry...
      concerns: [{ type: String, trim: true }], // acne, redness...
      coverage: { type: String, trim: true }, // sheer/medium/full
    },

    // Compliance / cosmetics-specific
    compliance: { type: ComplianceSchema, default: () => ({}) },

    // Ratings & reviews (store aggregates here; reviews in separate collection)
    ratings: { type: RatingsSchema, default: () => ({}) },

    // SEO
    seo: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
    },

    // Status
    isActive: { type: Boolean, default: true, index: true }, // visible for sale
    isFeatured: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    deletedAt: { type: Date, index: true }, // soft delete
  },
  { timestamps: true },
);

// Indexes
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ title: "text", "brand.name": "text", tags: "text" });

// Ensure variants exist if hasVariants=true
ProductSchema.pre("validate", function (next) {
  if (this.hasVariants) {
    if (!this.variants || this.variants.length === 0) {
      return next(
        new Error(
          "Product must have at least one variant when hasVariants=true.",
        ),
      );
    }
  } else {
    if (!this.basePrice || !this.inventory) {
      return next(
        new Error(
          "Product must have basePrice and inventory when hasVariants=false.",
        ),
      );
    }
  }
  next();
});

export default mongoose.model("Product", ProductSchema);
