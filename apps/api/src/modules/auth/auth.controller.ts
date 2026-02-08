import { Request, Response } from 'express';
import { login, refresh, register, resetPassword, sendResetPassword } from './auth.service.js';

export const registerHandler = async (req: Request, res: Response) => {
  const user = await register(req.body);
  res.status(201).json({ user });
};

export const loginHandler = async (req: Request, res: Response) => {
  const result = await login(req.body);
  res.json(result);
};

export const refreshHandler = (req: Request, res: Response) => {
  const result = refresh(req.body.refreshToken);
  res.json(result);
};

export const logoutHandler = (_req: Request, res: Response) => {
  res.json({ message: 'Đăng xuất thành công.' });
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  await sendResetPassword(req.body.email);
  res.json({ message: 'Nếu email tồn tại, chúng tôi đã gửi hướng dẫn.' });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  await resetPassword(req.body.token, req.body.password);
  res.json({ message: 'Đặt lại mật khẩu thành công.' });
};
