import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { ApiError } from '../utils/api-error.js';

export interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string };
}

export const requireAuth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401, 'Thiếu token đăng nhập.');
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { sub: string; role: string; email: string };
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    return next();
  } catch {
    throw new ApiError(401, 'Token không hợp lệ.');
  }
};
