import rateLimit from "express-rate-limit";
import { RATE_LIMIT_MESSAGES } from "src/utils/messages";
import { HTTP_STATUS_CODES, RATE_LIMIT_CONSTANTS } from "src/utils/constants";
const createRateLimiter = (options: {
    windowMs: number,
    max: number,
    message?: string,
}) => {
    return rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        message: options.message || RATE_LIMIT_MESSAGES.API_LIMIT,
        standardHeaders: true, //Returns rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, //Disable the `X-RateLimit-*` headers
        handler: (req, res) => {
            res.status(HTTP_STATUS_CODES.RATE_LIMIT).json({
                statusCode: HTTP_STATUS_CODES.RATE_LIMIT,
                success: false,
                message: options.message || RATE_LIMIT_MESSAGES.API_LIMIT,
                errors: [],
                data: null,
            });
        },
    });
}

// General API rate limiter: 100 requests per 15 minutes
export const apiLimiter = createRateLimiter({
    windowMs: RATE_LIMIT_CONSTANTS.FIFTEEN_MIN,
    max: RATE_LIMIT_CONSTANTS.MAX_REQUESTS,
});

// Auth route limiter: 5 requests per hour
export const authLimiter = createRateLimiter({
    windowMs: RATE_LIMIT_CONSTANTS.ONE_HOUR,
    max: RATE_LIMIT_CONSTANTS.MAX_AUTH_REQUESTS,
    message: RATE_LIMIT_MESSAGES.AUTH_LIMIT
});

