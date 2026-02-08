import { connectDatabase } from '../src/utils/db.js';
import { CategoryModel } from '../src/modules/categories/models/category.model.js';
import { ProductModel } from '../src/modules/products/models/product.model.js';

const run = async () => {
  await connectDatabase();
  const categories = await CategoryModel.find().exec();
  const categoryMap = new Map(categories.map((cat) => [cat.slug, cat._id]));

  await ProductModel.deleteMany({});

  await ProductModel.insertMany([
    {
      title: 'Son lì Paris Velvet',
      slug: 'son-li-paris-velvet',
      brand: 'Paris Beauty',
      categories: [categoryMap.get('makeup')],
      tags: ['son', 'lì'],
      images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'],
      description: 'Son lì chuẩn Pháp, màu sắc thời thượng.',
      hasVariants: true,
      variants: [
        { price: 320000, inventory: 50, options: { shade: 'Rouge 01' } },
        { price: 320000, inventory: 40, options: { shade: 'Rose 02' } },
      ],
      madeIn: 'France',
      inci: 'Dimethicone, Silica, Pigments',
      isActive: true,
    },
    {
      title: 'Serum phục hồi Lumière',
      slug: 'serum-phuc-hoi-lumiere',
      brand: 'Lumière',
      categories: [categoryMap.get('skincare')],
      tags: ['serum', 'phục hồi'],
      images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'],
      description: 'Serum phục hồi da, cấp ẩm chuyên sâu.',
      hasVariants: true,
      variants: [{ price: 780000, inventory: 25, options: { size: '30ml' } }],
      madeIn: 'France',
      inci: 'Hyaluronic Acid, Niacinamide',
      isActive: true,
    },
    {
      title: 'Nước hoa Fleur de Paris',
      slug: 'nuoc-hoa-fleur-de-paris',
      brand: 'Fleur',
      categories: [categoryMap.get('fragrance')],
      tags: ['nuoc-hoa'],
      images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6'],
      description: 'Hương hoa cỏ thanh lịch chuẩn Pháp.',
      hasVariants: true,
      variants: [{ price: 1450000, inventory: 12, options: { size: '50ml' } }],
      madeIn: 'France',
      inci: 'Alcohol Denat, Parfum',
      isActive: true,
    },
  ]);

  console.log('Seeded demo products');
  process.exit(0);
};

run();
