import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { HTTP_STATUS_CODES } from '../utils/constants';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const isNativeError = (err: unknown): err is Error & { statusCode?: number; errors?: any[] } => {
      return typeof err === 'object' && err !== null && 'message' in err;
    };

    if (isNativeError(error)) {
      const statusCode = typeof error.statusCode === 'number'
        ? error.statusCode
        : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

      const message = typeof error.message === 'string'
        ? error.message
        : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.toString();

      const errors = Array.isArray((error as any).errors)
        ? (error as any).errors
        : [];

      const stack = error.stack || '';

      const apiError = new ApiError(statusCode, message, errors);
      apiError.stack = stack;
      error = apiError;
    } else {
      error = new ApiError(
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_STATUS_CODES.UNEXPECTED_ERROR.toString()
      );
    }
  }

  const apiError = error as ApiError;

  return res.status(apiError.statusCode).json({
    success: apiError.success,
    message: apiError.message,
    errors: apiError.errors,
    data: apiError.data,
    stack: process.env.NODE_ENV === 'development' ? apiError.stack : undefined,
  });
};

export { errorHandler };
