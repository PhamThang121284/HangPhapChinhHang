import { connectDatabase } from '../src/utils/db.js';
import { CategoryModel } from '../src/modules/categories/models/category.model.js';

const categories = [
  { name: { vi: 'Trang điểm', en: 'Makeup' }, slug: 'makeup' },
  { name: { vi: 'Chăm sóc da', en: 'Skincare' }, slug: 'skincare' },
  { name: { vi: 'Chăm sóc tóc', en: 'Haircare' }, slug: 'haircare' },
  { name: { vi: 'Nước hoa', en: 'Fragrance' }, slug: 'fragrance' },
  { name: { vi: 'Dụng cụ', en: 'Tools' }, slug: 'tools' },
  { name: { vi: 'Bộ quà tặng', en: 'Sets' }, slug: 'sets' },
  { name: { vi: 'Nam giới', en: 'Men' }, slug: 'men' },
];

const run = async () => {
  await connectDatabase();
  await CategoryModel.deleteMany({});
  await CategoryModel.insertMany(
    categories.map((cat) => ({
      ...cat,
      ancestors: [],
      level: 0,
      path: `/${cat.slug}`,
    }))
  );
  console.log('Seeded categories');
  process.exit(0);
};

run();
