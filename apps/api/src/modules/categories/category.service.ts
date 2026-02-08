import { listCategories } from './category.repository.js';

export const getCategoryTree = async () => {
  const categories = await listCategories();
  const map = new Map<string, any>();
  categories.forEach((cat) => {
    map.set(cat.id, { ...cat.toObject(), children: [] });
  });
  const tree: any[] = [];
  map.forEach((value) => {
    if (value.parentId) {
      const parent = map.get(String(value.parentId));
      if (parent) {
        parent.children.push(value);
      }
    } else {
      tree.push(value);
    }
  });
  return tree;
};
