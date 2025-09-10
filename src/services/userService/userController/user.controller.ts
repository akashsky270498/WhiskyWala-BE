import { registerUserService, loginUserService } from '../userService/user.service';
import { Request, Response } from 'express';
import RESPONSE from '../../../utils/response';
import { asyncHandler } from '../../../utils/asyncHandler';
import redis from '../../../config/redis.config';
import { env } from '../../../config/env.config';

// @Register User Controller
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, username, password, avatarUrl } = req.body;
  // const avatar = req.file?.path;

  if (!avatarUrl) {
    return RESPONSE.FailureResponse(res, 400, {
      message: 'Avatar URL is required. Upload file first.',
    });
  }

  const result = await registerUserService({
    fullName,
    email,
    username,
    password,
    avatar: avatarUrl,
  });

  if (result.error) {
    return RESPONSE.FailureResponse(res, result.status, {
      message: result.message,
    });
  }

  if (!result.error) {
    // Clear old cached list
    await redis.del('users:all');
  }

  return RESPONSE.SuccessResponse(res, result.status, {
    message: result.message,
    data: [result.data],
  });
});

// @Login User Controller
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  console.log(emailOrUsername, password)

  const result = await loginUserService({ emailOrUsername, password });

  if (result.error) {
    return RESPONSE.FailureResponse(res, result.status, {
      message: result.message,
    });
  }

  const { user, accessToken, refreshToken } = result.data;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return RESPONSE.SuccessResponse(res, result.status, {
    message: result.message,
    data: [{ user, accessToken }],
  });
});

export { registerUser, loginUser };
