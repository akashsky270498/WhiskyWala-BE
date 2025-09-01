import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import RESPONSE from '../utils/response';
//Generic Validation Middleware

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return RESPONSE.FailureResponse(res, 422, {
        message: 'Validation error',
        errors,
      });
    }
    next();
  };
};
