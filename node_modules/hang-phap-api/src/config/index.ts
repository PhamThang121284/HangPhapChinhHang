import { env } from './env';

export const config = {
  env: env.NODE_ENV,
  port: Number(env.PORT),
  mongoUri: env.MONGO_URI,
  jwtSecret: env.JWT_SECRET,
  jwtRefreshSecret: env.JWT_REFRESH_SECRET,
  smtp: {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  adminEmail: env.ADMIN_EMAIL,
  appUrl: env.APP_URL,
  corsOrigin: env.CORS_ORIGIN,
};
