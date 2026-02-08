import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../../config/index.js';
import { createUser, findUserByEmail, findUserByResetToken } from '../users/user.repository.js';
import { ApiError } from '../../utils/api-error.js';
import { sendEmail } from '../../emails/mailer.js';

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '30d';

export const register = async (payload: { email: string; phone?: string; password: string }) => {
  const existing = await findUserByEmail(payload.email);
  if (existing) {
    throw new ApiError(400, 'Email đã tồn tại.');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await createUser({ email: payload.email, phone: payload.phone, passwordHash });
  return user;
};

export const login = async (payload: { email: string; password: string }) => {
  const user = await findUserByEmail(payload.email);
  if (!user) {
    throw new ApiError(401, 'Sai thông tin đăng nhập.');
  }

  const valid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, 'Sai thông tin đăng nhập.');
  }

  return {
    user,
    accessToken: signAccessToken({ id: user.id, role: user.role, email: user.email }),
    refreshToken: signRefreshToken({ id: user.id, role: user.role, email: user.email }),
  };
};

export const refresh = (refreshToken: string) => {
  try {
    const payload = jwt.verify(refreshToken, config.jwtRefreshSecret) as {
      sub: string;
      role: string;
      email: string;
    };
    return {
      accessToken: signAccessToken({ id: payload.sub, role: payload.role, email: payload.email }),
    };
  } catch {
    throw new ApiError(401, 'Refresh token không hợp lệ.');
  }
};

export const signAccessToken = (payload: { id: string; role: string; email: string }) =>
  jwt.sign({ role: payload.role, email: payload.email }, config.jwtSecret, {
    subject: payload.id,
    expiresIn: ACCESS_EXPIRES_IN,
  });

export const signRefreshToken = (payload: { id: string; role: string; email: string }) =>
  jwt.sign({ role: payload.role, email: payload.email }, config.jwtRefreshSecret, {
    subject: payload.id,
    expiresIn: REFRESH_EXPIRES_IN,
  });

export const sendResetPassword = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return;
  }
  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = crypto.createHash('sha256').update(token).digest('hex');
  user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 30);
  await user.save();

  const resetLink = `${config.appUrl}/auth/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Khôi phục mật khẩu',
    html: `<p>Nhấn vào liên kết để đặt lại mật khẩu:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  });
};

export const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    throw new ApiError(400, 'Token không hợp lệ hoặc đã hết hạn.');
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();
};
