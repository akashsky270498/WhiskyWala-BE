import mongoose from "mongoose";
import { comparePassword, generateAccessTokenSync, generateResetPasswordToken } from "./user.methods";
import userSchema from "./user.schema";
import bcrypt from "bcrypt";

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.generateAccessTokenSync = generateAccessTokenSync;
userSchema.methods.generateResetPasswordToken = generateResetPasswordToken;

export const UserModel = mongoose.model("User", userSchema);