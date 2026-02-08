import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/require-auth.js';
import { updateProfile } from './user.service.js';

export const getMe = (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
};

export const updateMe = async (req: AuthRequest, res: Response) => {
  const user = await updateProfile(req.user!.id, req.body);
  res.json({ user });
};
