import { Response } from "express";


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
    meta?: Metadata
}

const RESPONSE = {
    SuccessResponse: <T> (res: Response, status = 200, payload: SuccessResponseParams<T>) => {
        return res.status(status).json({
            success: true,
            statusCode: status,
            message: payload.message,
            data: Array.isArray(payload.data) ? payload.data : [],
            meta: payload.meta ?? undefined
        })
    },

    FailureResponse: <E> (res: Response, status = 500, payload: FailureResponseParams<E>) => {
        return res.status(status).json({
            success: false,
            statusCode: status,
            message: payload.message,
            data: [],
            errors: payload.errors ?? [],
            meta: payload.meta ?? undefined
        })
    }
}

export default RESPONSE;