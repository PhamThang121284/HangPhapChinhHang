import { NextFunction, Response } from 'express';
import { AuthRequest } from './require-auth.js';
import { ApiError } from '../utils/api-error.js';

export const requireRole = (role: string) => (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (req.user?.role !== role) {
    throw new ApiError(403, 'Không đủ quyền truy cập.');
  }
  next();
};
