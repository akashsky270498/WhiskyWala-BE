import mongoose, { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  bio?: string;
  website?: string;
  isPrivate?: boolean;
  blokedUsers?: Types.ObjectId[];
  blockedBy?: Types.ObjectId[];
  refreshToken?: string;
  resetToken?: string;
  posts: Types.ObjectId[];
  saved: Types.ObjectId[];
  followers: Types.ObjectId[];
  followings: Types.ObjectId[];

  comparePassword(enteredPassword: string): Promise<boolean>;
  generateAccessTokenSync(): Promise<string>;
  generateRefreshTokenSync(): Promise<string>;
  // getResetPasswordToken(): string;
  generateResetPasswordToken(): Promise<string>;
  canViewProfileOf(targetUset: IUser): boolean;
  toggleFollow(targetUser: IUser): Promise<void>;
}

export interface IUserModel extends mongoose.Model<IUser> {
  searchUsers(query: string): Promise<Partial<IUser>[]>;
}

export interface LoginInput {
  emailOrUsername: string;
  password: string;
}

export interface RegisterUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface ServiceSuccess<T> {
  error: false;
  status: number;
  message: string;
  data: T;
}

export interface ServiceFailure {
  error: true;
  status: number;
  message: string;
}

export type ServiceResult<T> = ServiceSuccess<T> | ServiceFailure;

export interface LoginSuccessData {
  user: Omit<IUser, "password" | "resetToken" | "refreshToken">; // sanitized
  accessToken: string;
  refreshToken: string;
}