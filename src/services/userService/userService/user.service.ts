import {
  checkExistingUser,
  createNewUser,
  sanitizeUser,
  findUserByEmailOrUsername,
} from '../userDBCall/user.dbcall';
import { UserModel } from '../userModel/user.model';
import {
  RegisterUser,
  LoginInput,
  ServiceResult,
  LoginSuccessData,
} from '../userInterface/user.interface';
import { SafeUser } from '../userDBCall/user.dbcall';
import { HTTP_STATUS_CODES } from '../../../utils/constants';

// @Register User Service
export const registerUserService = async (input: RegisterUser) => {
  const { fullName, email, username, password, avatar } = input;

  const existingUser = await checkExistingUser(email as string, username as string);

  if (existingUser) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.CONFLICT,
      message: 'User with these email or username already exists. Please login!',
    };
  }

  // const uploadAvatar = await uploadOnCloudinary(avatar);

  // if (!uploadAvatar) {
  //   return { error: true, status: 500, message: 'Failed to upload avatar.' };
  // }

  const user = await createNewUser({
    fullName,
    email,
    username,
    password,
    avatar,
  });

  const createdUser = await sanitizeUser(user._id.toString());

  if (!createdUser) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'User creation failed.',
    };
  }

  return {
    error: false,
    status: HTTP_STATUS_CODES.CREATED,
    message: 'User registered successfully.',
    data: createdUser,
  };
};

// @Get All Users Service
export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find();
    // const usersWithVirtuals = users.map((u) =>
    //   u.toObject({ virtuals: true })
    // );

    return {
      error: false,
      status: HTTP_STATUS_CODES.SUCCESS,
      message: 'Users fetched successfully',
      data: users,
    };
  } catch (error) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch users',
      data: [],
    };
  }
};

// @Login User Service
export const loginUserService = async (
  input: LoginInput
): Promise<ServiceResult<LoginSuccessData>> => {
  const { emailOrUsername, password } = input;

  const user = await findUserByEmailOrUsername(emailOrUsername as string);

  if (!user) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Invalid Credentials! Please try again.',
    };
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: 'Invalid Credentials! Please try again.',
    };
  }

  const accessToken = await user.generateAccessTokenSync();
  const refreshToken = await user.generateRefreshTokenSync();

  const safeUserData: SafeUser | null = await sanitizeUser(user._id.toString());

  if (!safeUserData) {
    return {
      error: true,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch sanitized user data.',
    };
  }

  return {
    error: false,
    status: HTTP_STATUS_CODES.SUCCESS,
    message: 'User logged in successfully.',
    data: { user: safeUserData, accessToken, refreshToken },
  };
};


// @Logout User Service