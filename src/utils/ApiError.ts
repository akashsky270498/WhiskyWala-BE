import { FieldError, IApiError } from "./interfaces/apiErrorInterface";

export class ApiError extends Error implements IApiError {
  statusCode: number;
  success: boolean;
  errors: FieldError[];
  data: any | null;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: FieldError[] = [],
    data: any | null = null,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.data = data;

    Error.captureStackTrace(this, this.constructor)
  }
}