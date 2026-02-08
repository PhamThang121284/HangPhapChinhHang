import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    ward: { type: String },
    district: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String },
    country: { type: String, default: 'VN' },
  },
  { _id: false }
);

const preferencesSchema = new Schema(
  {
    marketingEmail: { type: Boolean, default: false },
    marketingSms: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, unique: true, sparse: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    addresses: { type: [addressSchema], default: [] },
    preferences: { type: preferencesSchema, default: () => ({}) },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
