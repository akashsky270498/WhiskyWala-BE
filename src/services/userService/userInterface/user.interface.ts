import {Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId; 
    name: string;
    email: string;
    username: string;
    password: string;
    avatar?: string;
    bio?: string;
    website?: string;
    refreshToken?: string;
    resetToken?: string;
    posts: Types.ObjectId[];
    saved: Types.ObjectId[];
    followers: Types.ObjectId[];
    followings: Types.ObjectId[];
    comparePassword(enteredPassword: string): Promise<boolean>;
    generateAccessTokenAsync(): Promise<string>;
    generateRefreshTokenAsync(): Promise<string>;
    getResetPasswordToken(): string;
}