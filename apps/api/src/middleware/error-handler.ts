import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/api-error.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ.', errors: err.errors });
  }

  console.error(err);
  return res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
};
