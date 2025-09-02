// types/apollo-server-express4.d.ts
declare module "@apollo/server/express4" {
  import { ApolloServer, BaseContext } from "@apollo/server";
  import { RequestHandler, Request, Response } from "express";

  interface ExpressMiddlewareOptions<TContext extends BaseContext = BaseContext> {
    context?: (args: { req: Request; res: Response }) => Promise<TContext> | TContext;
  }

  export function expressMiddleware<TContext extends BaseContext = BaseContext>(
    server: ApolloServer<TContext>,
    options?: ExpressMiddlewareOptions<TContext>
  ): RequestHandler;
}
