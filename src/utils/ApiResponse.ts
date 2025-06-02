import { IApiResponse } from "./interfaces/apiResponseInterface";
import { HTTP_STATUS_CODES } from "./constants";

export class ApiResponse <T = any> implements IApiResponse {
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
    this.success = statusCode < HTTP_STATUS_CODES.FOUR_HUNDRED;
    this.message = message;
    this.data = data;
  }
}