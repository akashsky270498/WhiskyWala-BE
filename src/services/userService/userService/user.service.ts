import { checkExistingUser, createNewUser, sanitizeUser } from '../userDBCall/user.dbcall';
import { uploadOnCloudinary } from '../../../utils/cloundinary';
import { UserModel } from '../userModel/user.model';

interface RegisterUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export const registerUserService = async (input: RegisterUser) => {
  const { fullName, email, username, password, avatar } = input;

  const existingUser = await checkExistingUser(email as string, username as string);

  if (existingUser) {
    return {
      error: true,
      status: 409,
      message: 'User with these email or username already exists. Please login!',
    };
  }

  const uploadAvatar = await uploadOnCloudinary(avatar);

  if (!uploadAvatar) {
    return { error: true, status: 500, message: 'Failed to upload avatar.' };
  }

  const user = await createNewUser({
    fullName,
    email,
    username,
    password,
    avatar: uploadAvatar?.url,
  });

  const createdUser = await sanitizeUser(user._id.toString());

  if (!createdUser) {
    return { error: true, status: 500, message: 'User creation failed.' };
  }

  return { error: false, status: 201, message: 'User registered successfully.', data: createdUser };
};

export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find();

    return {
      error: false,
      status: 200,
      message: 'Users fetched successfully',
      data: users,
    };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: 'Failed to fetch users',
      data: [],
    };
  }
};
