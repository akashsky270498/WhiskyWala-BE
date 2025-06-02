// import { Request, Response, NextFunction } from 'express';
// import { ApiError } from '../utils/ApiError';

// const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   let error = err;

//   // If error isn't an instance of ApiError, convert it
//   if (!(error instanceof ApiError)) {
//     const statusCode = error.statusCode || error instanceof Error ? 400 : 500;
//     const message = error.message || 'Something went wrong';
//     error = new ApiError(statusCode, message, error?.errors || [], error?.stack);
//   }

//   const response = {
//     success: false,
//     message: error.message,
//     errors: error.errors,
//     stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
//   };

//   return res.status(error.statusCode).json(response);
// };

// export { errorHandler }; 