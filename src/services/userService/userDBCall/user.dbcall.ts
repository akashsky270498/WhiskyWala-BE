import { UserModel } from '../userModel/user.model';
import { IUser } from '../userInterface/user.interface';

export type SafeUser = Omit<IUser, "password" | "refreshToken" | "resetToken">;

export const checkExistingUser = async (email: string, username: string) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  return existingUser;
};

export const createNewUser = async (userData: unknown) => {
  const createUser = await UserModel.create(userData);
  return createUser;
};

export const sanitizeUser = async (userId: string): Promise<SafeUser | null> => {
  const sanitizedUser = await UserModel.findById(userId).select('-password -refreshToken -resetToken').lean<SafeUser>().exec();
  return sanitizedUser;
};

export const findUserByEmailOrUsername = async (emailOrUsername: string) => {
  const user = await UserModel.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  }).select("+password");
  return user;
};
