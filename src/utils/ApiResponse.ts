import { IApiResponse } from "./interfaces/apiResponseInterface";
import { HTTP_STATUS_CODES } from "./constants";

export class ApiResponse <T> implements IApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: T[]

  constructor(
    statusCode: number,
    data: T[] = [],
    message: string = 'Success'
  ) {
    this.statusCode = statusCode;
    this.success = statusCode < HTTP_STATUS_CODES.BAD_REQUEST;
    this.message = message;
    this.data = data;
  }
}