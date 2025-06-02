import { Request, Response, NextFunction, RequestHandler } from "express";


const asyncHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    handler(req, res, next).catch(next);
  }
}
export { asyncHandler }