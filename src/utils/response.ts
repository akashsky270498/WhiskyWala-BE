import { Response } from 'express';

interface Metadata {
  page?: number;
  limit?: number;
  total: number;
  totalPages?: number;
}

interface SuccessResponseParams<T> {
  message: string;
  data?: T[];
  meta?: Metadata;
}

interface FailureResponseParams<E> {
  message: string;
  errors?: E[];
  meta?: Metadata;
}

const RESPONSE = {
  SuccessResponse: <T>(res: Response, status = 200, payload: SuccessResponseParams<T>) => {
    const { message, data = [], meta } = payload;
    return res.status(status).json({
      success: true,
      statusCode: status,
      message: message,
      data: Array.isArray(data) ? data : [],
      meta: meta ?? null,
    });
  },

  FailureResponse: <E>(res: Response, status = 500, payload: FailureResponseParams<E>) => {
    const { message, errors = [], meta } = payload;
    return res.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
      meta: meta ?? null,
    });
  },
};

export default RESPONSE;
