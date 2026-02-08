import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

export const mailer = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  await mailer.sendMail({
    from: `Hàng Pháp Chính Hãng <${config.smtp.user}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
