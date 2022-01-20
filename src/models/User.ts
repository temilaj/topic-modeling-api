import { Document, Schema, model } from 'mongoose';

export interface IUserDocument extends Document {
  id: string;
  _id: string | object;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  resetToken: string;
  resetTokenExpiry: number;
  refreshTokenVersion: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date | number;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: String,
    resetTokenExpiry: Number,
    refreshTokenVersion: {
      type: Number,
      default: 0,
    },
    imageUrl: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

UserSchema.index({ createdAt: 1 });

export const User = model<IUserDocument>('User', UserSchema);
