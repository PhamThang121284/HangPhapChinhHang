import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: "Home" }, // Home, Office...
    fullName: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true }, // E.164 recommended (+84...)
    country: { type: String, trim: true, default: "VN" }, // ISO-2
    province: { type: String, trim: true, required: true }, // Tỉnh/Thành phố
    district: { type: String, trim: true, required: true }, // Quận/Huyện
    ward: { type: String, trim: true }, // Phường/Xã (optional)
    street: { type: String, trim: true, required: true }, // street + house number
    postalCode: { type: String, trim: true }, // optional in VN
    isDefaultShipping: { type: Boolean, default: false },
    isDefaultBilling: { type: Boolean, default: false },
    notes: { type: String, trim: true }, // delivery notes
  },
  { _id: true, timestamps: true },
);

const UserSchema = new mongoose.Schema(
  {
    // Identity
    role: {
      type: String,
      enum: ["customer", "admin", "support"],
      default: "customer",
      index: true,
    },

    profile: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      displayName: { type: String, trim: true },
      avatarUrl: { type: String, trim: true },
      dateOfBirth: { type: Date },
      gender: {
        type: String,
        enum: ["female", "male", "other", "unspecified"],
        default: "unspecified",
      },
      locale: { type: String, default: "vi-VN" }, // vi-VN or en-US etc.
      currency: { type: String, default: "VND" }, // display preference
    },

    // Contact (allow email or phone)
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      sparse: true,
    },
    phone: { type: String, trim: true, index: true, sparse: true }, // store normalized

    // Auth
    passwordHash: { type: String, select: false }, // never return by default
    authProviders: [
      {
        provider: {
          type: String,
          enum: ["local", "google", "facebook", "apple"],
          required: true,
        },
        providerUserId: { type: String, trim: true },
      },
    ],

    // Verification
    emailVerifiedAt: { type: Date },
    phoneVerifiedAt: { type: Date },

    // Security & sessions
    refreshTokens: [
      {
        tokenHash: { type: String, select: false }, // hash tokens, don't store raw
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
        ip: { type: String, trim: true },
        userAgent: { type: String, trim: true },
        revokedAt: { type: Date },
      },
    ],
    passwordReset: {
      tokenHash: { type: String, select: false },
      expiresAt: { type: Date },
      requestedAt: { type: Date },
    },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String, trim: true },

    // Commerce
    addresses: { type: [AddressSchema], default: [] },
    wishlistProductIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", index: true },
    ],
    loyalty: {
      points: { type: Number, default: 0, min: 0 },
      tier: {
        type: String,
        enum: ["bronze", "silver", "gold", "platinum"],
        default: "bronze",
      },
    },

    // Preferences & consents (important for EU/French business)
    preferences: {
      marketingEmail: { type: Boolean, default: false },
      marketingSms: { type: Boolean, default: false },
      productNotifications: { type: Boolean, default: true },
    },
    consents: {
      termsAcceptedAt: { type: Date },
      privacyAcceptedAt: { type: Date },
      marketingOptInAt: { type: Date },
      marketingOptOutAt: { type: Date },
    },

    // Status
    isActive: { type: Boolean, default: true, index: true },
    suspendedAt: { type: Date },
    suspendReason: { type: String, trim: true },

    // Soft delete
    deletedAt: { type: Date, index: true },
  },
  { timestamps: true },
);

// Ensure at least email or phone exists
UserSchema.pre("validate", function (next) {
  if (!this.email && !this.phone) {
    return next(
      new Error("User must have at least an email or a phone number."),
    );
  }
  next();
});

// Uniqueness (use partial indexes to allow nulls)
UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string" } } },
);
UserSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $type: "string" } } },
);

export default mongoose.model("User", UserSchema);
