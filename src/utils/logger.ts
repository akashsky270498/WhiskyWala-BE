import winston from 'winston';
import { winstonConfig } from '../config/winston.config';
import { morganConfig } from '../config/morgan.config';
import morgan from 'morgan';

//Winston logger instance
const winstonLogger = winston.createLogger(winstonConfig);

//Morgan middleware
const morganMiddleware = morgan(
    morganConfig.format,
    morganConfig.options
);

//type for log metadata
type LogMeta = Record<string, unknown>

//Logger interface
export const logger = {
    error: (message: string, meta?: LogMeta) => winstonLogger.error(message, meta),
    warn: (message: string, meta?: LogMeta) => winstonLogger.warn(message, meta),
    info: (message: string, meta?: LogMeta) => winstonLogger.info(message, meta),
    http: (message: string, meta?: LogMeta) => winstonLogger.http(message, meta),
    debug: (message: string, meta?: LogMeta) => winstonLogger.debug(message, meta),
};

//Morgan middleware export
export const httpLogger = morganMiddleware;

// Create Child Logger with Context Prefixing

export const getChildLogger = (context: string) => ({
    error: (message: string, meta?: LogMeta) =>
        logger.error(`[${context}] ${message}`, meta),

    warn: (message: string, meta?: LogMeta) =>
        logger.warn(`[${context}] ${message}`, meta),

    info: (message: string, meta?: LogMeta) =>
        logger.info(`[${context}] ${message}`, meta),

    http: (message: string, meta?: LogMeta) =>
        logger.http(`[${context}] ${message}`, meta),

    debug: (message: string, meta?: LogMeta) =>
        logger.debug(`[${context}] ${message}`, meta),

})