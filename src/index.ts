import express from "express";
import { connectDB } from "./config/db.config";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./utils/corsOptions";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import compression from "compression";
import { staticFileConfig } from "./config/static.config";
import { httpLogger, logger } from "./utils/logger"
import { env } from "./config/env.config";

const app = express();


//To secure header we use helmet
app.use(helmet());

// cors to restrict the request from different domain.
app.use(cors(corsOptions));

//Body parser and data sanitization
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

//Serving static files
app.use(express.static(staticFileConfig.path, staticFileConfig.options));

//Compresssion and performance middleware
app.use(compression());
app.set('trust proxy', 1);

//Add HTTP request login
app.use(httpLogger);

// rate limiter
app.use(apiLimiter);
// authRouter(authLimiter);

//404 handler for unmatched routes
app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server.`))
});


//Now we can use logger anywhere in the application [Testing]
logger.info('Server is starting');
logger.error('This is an error message');

// Or create a context-specific logger:
// const authLogger = getChildLogger('Auth');
// authLogger.info('User logged in');

//Error handling middleware
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(env.PORT, () => {
      console.log(`
Server running successfully
 Port: ${env.PORT}
 Environment: ${env.NODE_ENV || 'development'}
 Time: ${new Date().toLocaleString()}
      `);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();
