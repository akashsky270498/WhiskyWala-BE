import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { HTTP_STATUS_CODES } from '../utils/constants';
import { env } from "../config/env.config";

// Define the FieldError type if it's not imported from elsewhere
interface FieldError {
  field: string;
  message: string;
  [key: string]: unknown;
}

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const isNativeError = (
      err: unknown
    ): err is Error & { statusCode?: number; errors?: unknown[] } => {
      return typeof err === 'object' && err !== null && 'message' in err;
    };

    if (isNativeError(error)) {
      const statusCode = typeof error.statusCode === 'number'
        ? error.statusCode
        : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

      const message = typeof error.message === 'string'
        ? error.message
        : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.toString();

      // Type guard to ensure errors are properly typed
      const errors: FieldError[] = Array.isArray(error.errors) 
        ? error.errors.filter((err): err is FieldError => 
            typeof err === 'object' && 
            err !== null && 
            'field' in err && 
            'message' in err
          )
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
    stack: env.NODE_ENV === 'development' ? apiError.stack : undefined,
  });
};

export { errorHandler };