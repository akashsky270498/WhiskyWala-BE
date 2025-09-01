// utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

// Make it generic over a subtype of Request
const asyncHandler = <
  Req extends Request = Request,
  Res extends Response = Response
>(
  handler: (req: Req, res: Res, next: NextFunction) => Promise<unknown>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    handler(req as Req, res as Res, next).catch(next);
  };
};

export { asyncHandler };
