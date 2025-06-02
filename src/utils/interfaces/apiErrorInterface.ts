export interface FieldError {
    field?: string;
    message: string;
}

export interface IApiError {
    statusCode: number;
    success: boolean;
    message: string;
    errors: FieldError[];
    data: any | null;
    stack?: string;
}