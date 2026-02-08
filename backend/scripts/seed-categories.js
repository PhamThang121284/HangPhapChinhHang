/**
 * scripts/seed-categories.js
 *
 * Ready-to-run, idempotent category seeder for Express + MongoDB (Mongoose).
 * - Inserts/updates categories (upsert)
 * - Builds: parentId, ancestors, level, path, sortOrder
 * - Safe to run multiple times
 *
 * Usage:
 *   1) npm i mongoose dotenv
 *   2) Set MONGO_URI in your .env
 *   3) node scripts/seed-categories.js
 */

import "dotenv/config";
import mongoose from "mongoose";
import Category from "../src/modules/categories/category.model.js";

/** --------- Seed data (tree) --------- */
const categorySeed = [
  {
    slug: "makeup",
    name: { vi: "Trang điểm", en: "Makeup" },
    sortOrder: 10,
    children: [
      {
        slug: "face",
        name: { vi: "Mặt", en: "Face" },
        sortOrder: 10,
        children: [
          {
            slug: "foundation",
            name: { vi: "Kem nền", en: "Foundation" },
            sortOrder: 10,
          },
          {
            slug: "cushion",
            name: { vi: "Phấn nước (Cushion)", en: "Cushion" },
            sortOrder: 20,
          },
          {
            slug: "concealer",
            name: { vi: "Che khuyết điểm", en: "Concealer" },
            sortOrder: 30,
          },
          {
            slug: "powder",
            name: { vi: "Phấn phủ", en: "Powder" },
            sortOrder: 40,
          },
          {
            slug: "primer",
            name: { vi: "Kem lót", en: "Primer" },
            sortOrder: 50,
          },
          {
            slug: "blush",
            name: { vi: "Má hồng", en: "Blush" },
            sortOrder: 60,
          },
          {
            slug: "contour-bronzer",
            name: { vi: "Tạo khối & Bronzer", en: "Contour & Bronzer" },
            sortOrder: 70,
          },
          {
            slug: "highlighter",
            name: { vi: "Bắt sáng", en: "Highlighter" },
            sortOrder: 80,
          },
          {
            slug: "setting-spray",
            name: { vi: "Xịt khóa nền", en: "Setting Spray" },
            sortOrder: 90,
          },
        ],
      },
      {
        slug: "eyes",
        name: { vi: "Mắt", en: "Eyes" },
        sortOrder: 20,
        children: [
          {
            slug: "eyeshadow",
            name: { vi: "Phấn mắt", en: "Eyeshadow" },
            sortOrder: 10,
          },
          {
            slug: "eyeliner",
            name: { vi: "Kẻ mắt", en: "Eyeliner" },
            sortOrder: 20,
          },
          {
            slug: "mascara",
            name: { vi: "Mascara", en: "Mascara" },
            sortOrder: 30,
          },
          {
            slug: "eyebrow",
            name: { vi: "Chân mày", en: "Eyebrow" },
            sortOrder: 40,
          },
          {
            slug: "false-lashes",
            name: { vi: "Mi giả & Keo", en: "False Lashes & Glue" },
            sortOrder: 50,
          },
        ],
      },
      {
        slug: "lips",
        name: { vi: "Môi", en: "Lips" },
        sortOrder: 30,
        children: [
          {
            slug: "lipstick",
            name: { vi: "Son thỏi", en: "Lipstick" },
            sortOrder: 10,
          },
          {
            slug: "lip-tint",
            name: { vi: "Son tint", en: "Lip Tint" },
            sortOrder: 20,
          },
          {
            slug: "lip-gloss",
            name: { vi: "Son bóng", en: "Lip Gloss" },
            sortOrder: 30,
          },
          {
            slug: "lip-liner",
            name: { vi: "Chì kẻ môi", en: "Lip Liner" },
            sortOrder: 40,
          },
          {
            slug: "lip-balm",
            name: { vi: "Son dưỡng", en: "Lip Balm" },
            sortOrder: 50,
          },
        ],
      },
      {
        slug: "nails",
        name: { vi: "Móng", en: "Nails" },
        sortOrder: 40,
        children: [
          {
            slug: "nail-polish",
            name: { vi: "Sơn móng", en: "Nail Polish" },
            sortOrder: 10,
          },
          {
            slug: "nail-care",
            name: { vi: "Chăm sóc móng", en: "Nail Care" },
            sortOrder: 20,
          },
          {
            slug: "nail-remover",
            name: { vi: "Tẩy sơn móng", en: "Nail Remover" },
            sortOrder: 30,
          },
        ],
      },
    ],
  },

  {
    slug: "skincare",
    name: { vi: "Chăm sóc da", en: "Skincare" },
    sortOrder: 20,
    children: [
      {
        slug: "cleansers",
        name: { vi: "Làm sạch", en: "Cleansers" },
        sortOrder: 10,
        children: [
          {
            slug: "makeup-remover",
            name: { vi: "Tẩy trang", en: "Makeup Remover" },
            sortOrder: 10,
          },
          {
            slug: "cleansing-oil-balm",
            name: { vi: "Dầu/Sáp tẩy trang", en: "Cleansing Oil/Balm" },
            sortOrder: 20,
          },
          {
            slug: "face-wash",
            name: { vi: "Sữa rửa mặt", en: "Face Wash" },
            sortOrder: 30,
          },
        ],
      },
      {
        slug: "toner-essence",
        name: { vi: "Toner & Essence", en: "Toner & Essence" },
        sortOrder: 20,
      },
      {
        slug: "serum-ampoule",
        name: { vi: "Serum & Ampoule", en: "Serum & Ampoule" },
        sortOrder: 30,
      },
      {
        slug: "moisturizer",
        name: { vi: "Dưỡng ẩm", en: "Moisturizer" },
        sortOrder: 40,
      },
      {
        slug: "sunscreen",
        name: { vi: "Chống nắng", en: "Sunscreen" },
        sortOrder: 50,
      },
      {
        slug: "masks",
        name: { vi: "Mặt nạ", en: "Masks" },
        sortOrder: 60,
        children: [
          {
            slug: "sheet-mask",
            name: { vi: "Mặt nạ giấy", en: "Sheet Mask" },
            sortOrder: 10,
          },
          {
            slug: "wash-off-mask",
            name: { vi: "Mặt nạ rửa", en: "Wash-off Mask" },
            sortOrder: 20,
          },
          {
            slug: "sleeping-mask",
            name: { vi: "Mặt nạ ngủ", en: "Sleeping Mask" },
            sortOrder: 30,
          },
        ],
      },
      {
        slug: "exfoliation",
        name: { vi: "Tẩy tế bào chết", en: "Exfoliation" },
        sortOrder: 70,
      },
      {
        slug: "eye-care",
        name: { vi: "Chăm sóc mắt", en: "Eye Care" },
        sortOrder: 80,
      },
      {
        slug: "acne-spot-care",
        name: { vi: "Trị mụn & chấm mụn", en: "Acne & Spot Care" },
        sortOrder: 90,
      },
      {
        slug: "body-care",
        name: { vi: "Chăm sóc cơ thể", en: "Body Care" },
        sortOrder: 100,
        children: [
          {
            slug: "body-wash",
            name: { vi: "Sữa tắm", en: "Body Wash" },
            sortOrder: 10,
          },
          {
            slug: "body-lotion",
            name: { vi: "Dưỡng thể", en: "Body Lotion" },
            sortOrder: 20,
          },
          {
            slug: "hand-cream",
            name: { vi: "Kem dưỡng tay", en: "Hand Cream" },
            sortOrder: 30,
          },
        ],
      },
    ],
  },

  {
    slug: "haircare",
    name: { vi: "Chăm sóc tóc", en: "Haircare" },
    sortOrder: 30,
    children: [
      {
        slug: "shampoo",
        name: { vi: "Dầu gội", en: "Shampoo" },
        sortOrder: 10,
      },
      {
        slug: "conditioner",
        name: { vi: "Dầu xả", en: "Conditioner" },
        sortOrder: 20,
      },
      {
        slug: "hair-mask-treatment",
        name: { vi: "Ủ tóc & phục hồi", en: "Hair Mask & Treatment" },
        sortOrder: 30,
      },
      {
        slug: "scalp-care",
        name: { vi: "Chăm sóc da đầu", en: "Scalp Care" },
        sortOrder: 40,
      },
      {
        slug: "hair-oil-serum",
        name: { vi: "Dầu/Serum dưỡng tóc", en: "Hair Oil/Serum" },
        sortOrder: 50,
      },
      {
        slug: "styling",
        name: { vi: "Tạo kiểu", en: "Styling" },
        sortOrder: 60,
      },
    ],
  },

  {
    slug: "fragrance",
    name: { vi: "Nước hoa", en: "Fragrance" },
    sortOrder: 40,
    children: [
      {
        slug: "perfume",
        name: { vi: "Nước hoa", en: "Perfume" },
        sortOrder: 10,
      },
      {
        slug: "body-mist",
        name: { vi: "Xịt thơm toàn thân", en: "Body Mist" },
        sortOrder: 20,
      },
      {
        slug: "travel-size",
        name: { vi: "Mini/Travel size", en: "Travel Size" },
        sortOrder: 30,
      },
    ],
  },

  {
    slug: "tools-accessories",
    name: { vi: "Dụng cụ & Phụ kiện", en: "Tools & Accessories" },
    sortOrder: 50,
    children: [
      {
        slug: "brushes",
        name: { vi: "Cọ trang điểm", en: "Makeup Brushes" },
        sortOrder: 10,
      },
      {
        slug: "sponges",
        name: { vi: "Mút trang điểm", en: "Sponges" },
        sortOrder: 20,
      },
      {
        slug: "eyelash-curler",
        name: { vi: "Bấm mi", en: "Eyelash Curler" },
        sortOrder: 30,
      },
      { slug: "tweezers", name: { vi: "Nhíp", en: "Tweezers" }, sortOrder: 40 },
      {
        slug: "makeup-bags",
        name: { vi: "Túi đựng mỹ phẩm", en: "Makeup Bags" },
        sortOrder: 50,
      },
      {
        slug: "cotton-pads",
        name: { vi: "Bông tẩy trang", en: "Cotton Pads" },
        sortOrder: 60,
      },
      { slug: "mirrors", name: { vi: "Gương", en: "Mirrors" }, sortOrder: 70 },
    ],
  },

  {
    slug: "sets-minis",
    name: { vi: "Bộ sản phẩm & Mini", en: "Sets & Minis" },
    sortOrder: 60,
    children: [
      {
        slug: "gift-sets",
        name: { vi: "Bộ quà tặng", en: "Gift Sets" },
        sortOrder: 10,
      },
      {
        slug: "discovery-sets",
        name: { vi: "Bộ dùng thử", en: "Discovery Sets" },
        sortOrder: 20,
      },
      {
        slug: "mini-travel",
        name: { vi: "Mini/Travel", en: "Mini/Travel" },
        sortOrder: 30,
      },
    ],
  },

  {
    slug: "mens-grooming",
    name: { vi: "Chăm sóc nam", en: "Men’s Grooming" },
    sortOrder: 70,
    children: [
      {
        slug: "mens-face-wash",
        name: { vi: "Sữa rửa mặt", en: "Face Wash" },
        sortOrder: 10,
      },
      {
        slug: "mens-moisturizer",
        name: { vi: "Dưỡng ẩm", en: "Moisturizer" },
        sortOrder: 20,
      },
      {
        slug: "shaving",
        name: { vi: "Cạo râu", en: "Shaving" },
        sortOrder: 30,
      },
      {
        slug: "deodorant",
        name: { vi: "Khử mùi", en: "Deodorant" },
        sortOrder: 40,
      },
    ],
  },
];

/** --------- Helpers --------- */
function buildPath(parentPath, slug) {
  return parentPath ? `${parentPath}/${slug}` : slug;
}

/**
 * Upsert category with unique key: (parentId, slug)
 * Returns the saved category doc.
 */
async function upsertCategory({ slug, name, sortOrder }, { parent }) {
  const parentId = parent?._id ?? null;
  const ancestors = parent ? [...(parent.ancestors || []), parent._id] : [];
  const level = parent ? (parent.level || 0) + 1 : 0;
  const path = buildPath(parent?.path || "", slug);

  const update = {
    name,
    slug,
    parentId,
    ancestors,
    level,
    path,
    sortOrder: sortOrder ?? 0,
    isActive: true,
    deletedAt: null,
  };

  // Use findOneAndUpdate with upsert to keep it idempotent
  const doc = await Category.findOneAndUpdate(
    { parentId, slug },
    { $set: update },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return doc;
}

async function seedNode(node, ctx) {
  const current = await upsertCategory(node, ctx);

  if (Array.isArray(node.children) && node.children.length > 0) {
    for (const child of node.children) {
      await seedNode(child, { parent: current });
    }
  }
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ Missing MONGO_URI in environment (.env).");
    process.exit(1);
  }

  await mongoose.connect(uri, { autoIndex: true });
  console.log("✅ Connected to MongoDB");

  // Optional: ensure index exists (if schema has unique index)
  // await Category.syncIndexes();

  for (const root of categorySeed) {
    await seedNode(root, { parent: null });
  }

  console.log("✅ Categories seeded (idempotent).");

  // Optional: print a quick summary
  const count = await Category.countDocuments({ deletedAt: null });
  console.log(`ℹ️ Total categories: ${count}`);

  await mongoose.disconnect();
  console.log("👋 Done.");
}

main().catch(async (err) => {
  console.error("❌ Seed failed:", err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
