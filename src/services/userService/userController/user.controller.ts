import { registerUserService } from '../userService/user.service';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../utils/response';
import { asyncHandler } from '../../../utils/asyncHandler';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, username, password } = req.body;
  const avatar = req.file?.path;

  if (!avatar) {
    return RESPONSE.FailureResponse(res, 400, {
      message: 'Avatar is required.',
    });
  }

  const result = await registerUserService({
    name,
    email,
    username,
    password,
    avatarPath,
  });

  if (result.error) {
    return RESPONSE.FailureResponse(res, result.status, {
      message: result.message,
    });
  }

  return RESPONSE.SuccessResponse(res, result.status, {
    message: result.message,
    data: result.data,
  });
});
