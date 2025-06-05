import z from "zod";
// import { logger } from "../utils/logger";
import { DOT_ENV, HTTP_STATUS_CODES } from "../utils/constants";
import {ApiError} from "../utils/ApiError";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    PORT: z.coerce.number().positive().default(DOT_ENV.DEFAULT_PORT),

    MONGODB_URI: z.string().url('Invalid Mongo DB uri format.'),

    DB_NAME: z.string().min(1, 'DB_NAME is required.'),

    ALLOWED_ORIGINS: z.string().transform((value) => value === '*' ? ['*'] : value.split(',').map(origin => origin.trim())),

    API_PREFIX: z.string().startsWith('/').default('/api/v1'),
});

export type EnvConfig = z.infer<typeof envSchema>;

const validateEnv = (): EnvConfig => {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        const errors = parsed.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
        }));

        // logger.error('Environment validation failed: ', { errors });
        throw new ApiError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Environment validation error', errors, null);
    }
    return parsed.data;
};

export const env: EnvConfig = validateEnv();
