import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import express, { Application } from 'express';
import { GraphQLFormattedError } from 'graphql';
import bodyParser from 'body-parser';
import cors from "cors";
import { typeDefs } from '';
import { resolvers } from '';

export const createGraphQLServer = async () => {
  const app: Application = express();

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: (formattedError: GraphQLFormattedError) => {
      return {
        message: formattedError.message,
        success: false,
        statusCode: formattedError.extensions?.code === 'BAD_USER_INPUT' ? 400 : 500,
        errors: [],
      };
    },
  });

  await server.start();
 app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

  return app;
};
