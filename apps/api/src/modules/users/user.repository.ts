import { UserModel } from './models/user.model.js';

export const findUserByEmail = (email: string) => UserModel.findOne({ email }).exec();

export const findUserByResetToken = (resetToken: string) =>
  UserModel.findOne({ resetToken, resetTokenExpires: { $gt: new Date() } }).exec();

export const findUserById = (id: string) => UserModel.findById(id).exec();

export const createUser = (data: {
  email: string;
  phone?: string;
  passwordHash: string;
}) => UserModel.create({ ...data });

export const updateUserById = (id: string, update: Record<string, unknown>) =>
  UserModel.findByIdAndUpdate(id, update, { new: true }).exec();
