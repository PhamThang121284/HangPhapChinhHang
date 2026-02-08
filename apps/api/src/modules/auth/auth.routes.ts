import { Router } from 'express';
import {
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
} from './auth.controller.js';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from './auth.schema.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { asyncHandler } from '../../utils/async-handler.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRequest(registerSchema), asyncHandler(registerHandler));
authRoutes.post('/login', validateRequest(loginSchema), asyncHandler(loginHandler));
authRoutes.post('/refresh', validateRequest(refreshSchema), asyncHandler(refreshHandler));
authRoutes.post('/logout', logoutHandler);
authRoutes.post('/forgot-password', validateRequest(forgotPasswordSchema), asyncHandler(forgotPasswordHandler));
authRoutes.post('/reset-password', validateRequest(resetPasswordSchema), asyncHandler(resetPasswordHandler));
