import { Request, Response } from 'express';
import { getCategoryTree } from './category.service.js';

export const getCategoryTreeHandler = async (_req: Request, res: Response) => {
  const tree = await getCategoryTree();
  res.json(tree);
};
