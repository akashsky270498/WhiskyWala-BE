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

//Logger interface
export const logger = {
    error: (message: string, meta?: any) => winstonLogger.error(message, meta),
    warn: (message: string, meta?: any) => winstonLogger.warn(message, meta),
    info: (message: string, meta?: any) => winstonLogger.info(message, meta),
    http: (message: string, meta?: any) => winstonLogger.http(message, meta),
    debug: (message: string, meta?: any) => winstonLogger.debug(message, meta),
};

//Morgan middleware export
export const httpLogger = morganMiddleware;

// Create Child Logger with Context Prefixing

export const getChildLogger = (context: string) => ({
    error: (message: string, meta?: any) =>
        logger.error(`[${context}] ${message}`, meta),

    warn: (message: string, meta?: any) =>
        logger.warn(`[${context}] ${message}`, meta),

    info: (message: string, meta?: any) =>
        logger.info(`[${context}] ${message}`, meta),

    http: (message: string, meta?: any) =>
        logger.http(`[${context}] ${message}`, meta),

    debug: (message: string, meta?: any) =>
        logger.debug(`[${context}] ${message}`, meta),

})