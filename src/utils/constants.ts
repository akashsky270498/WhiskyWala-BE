import { RateLimitConstants } from "./interfaces/rateLimitInterface";

export const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    RATE_LIMIT: 429,
    INTERNAL_SERVER_ERROR: 500,
    UNEXPECTED_ERROR: 500
}

export const CORS_OPTIONS = {
    MAX_AGE_IN_MS: 86400
}

export const RATE_LIMIT_CONSTANTS: RateLimitConstants = {
    FIFTEEN_MIN: 15 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    MAX_REQUESTS: 100,
    MAX_AUTH_REQUESTS: 5,
};
