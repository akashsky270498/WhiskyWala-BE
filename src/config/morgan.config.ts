import morgan from 'morgan';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { HTTP_STATUS_CODES } from '../utils/constants'; // Make sure this contains `BAD_REQUEST = 400`


morgan.token('reqId', (req: Request) => {
  const user = (req as any).user;
  return user?.id?.toString() || '-';
});

const isProd = process.env.NODE_ENV === 'production';

const format = isProd
  ? ':reqId :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  : ':reqId :method :url :status :res[content-length] - :response-time ms';

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = (req: Request, res: Response): boolean =>
  isProd ? res.statusCode < HTTP_STATUS_CODES.BAD_REQUEST : false;

export const morganConfig = {
  format,
  options: {
    stream,
    skip,
  },
};
