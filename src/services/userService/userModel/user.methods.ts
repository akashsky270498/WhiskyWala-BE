import { IUser } from "../userInterface/user.interface";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from "../../../config/env.config";

export async function comparePassword(this: IUser, enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

export function generateAccessTokenSync(this: IUser): string {
    const payload = {
        id: this.id,
        username: this.username,
        fullName: this.name,
        email: this.email,
    };

    const secret = env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const jwtOptions: SignOptions = {
        expiresIn: env.JWT_EXPIRE as jwt.SignOptions['expiresIn']
    };

    return jwt.sign(payload, secret, jwtOptions);
}


export function generateRefreshTokenSync(this: IUser): string {
    const payload = {
        id: this.id,
    };

    const secret = env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }

    const jwtOptions: jwt.SignOptions = {
        expiresIn: env.REFRESH_TOKEN_EXPIRE as jwt.SignOptions['expiresIn']
    };

    return jwt.sign(payload, secret, jwtOptions);
}

export async function generateResetPasswordToken(this: IUser): Promise<string> {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    return resetToken;
}

