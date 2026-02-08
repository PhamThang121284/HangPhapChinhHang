import { Router } from 'express';
import { getMe, updateMe } from './user.controller.js';
import { requireAuth } from '../../middleware/require-auth.js';
import { asyncHandler } from '../../utils/async-handler.js';

export const userRoutes = Router();

userRoutes.get('/me', requireAuth, getMe);
userRoutes.put('/me', requireAuth, asyncHandler(updateMe));
