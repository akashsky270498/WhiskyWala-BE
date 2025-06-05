import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { WINSTON_LOG_LEVELS } from '../utils/constants';
import { env } from "./env.config";

const isDev = env.NODE_ENV === 'development';
const logDir = path.resolve(__dirname, '../../logs');
const logLevel = isDev ? 'debug' : 'info';

const levels = {
    error: WINSTON_LOG_LEVELS.ZERO,
    warn: WINSTON_LOG_LEVELS.ONE,
    info: WINSTON_LOG_LEVELS.TWO,
    http: WINSTON_LOG_LEVELS.THREE,
    debug: WINSTON_LOG_LEVELS.FOUR,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

const devFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const errorFileTransport = new DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
});

const combinedFileTransport = new DailyRotateFile({
    filename: path.join(logDir, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

const consoleTransport = new winston.transports.Console({
    format: isDev ? devFormat : prodFormat,
});

export const winstonConfig: winston.LoggerOptions = {
    level: logLevel,
    levels,
    format: isDev ? devFormat : prodFormat,
    transports: [consoleTransport, errorFileTransport, combinedFileTransport],
    exitOnError: false,
};
