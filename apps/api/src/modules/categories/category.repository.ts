import { CategoryModel } from './models/category.model.js';

export const listCategories = () => CategoryModel.find().sort({ level: 1, name: 1 }).exec();
