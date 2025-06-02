import express from "express";
import { connectDB } from "./config/db.config";
import helmet from "helmet";
import cors from "cors";
import corsOptions from "./config/cors.config";

const app = express();
const port = process.env.PORT || 3000;

//To secure header we use helmet
app.use(helmet());

// cors to restrict the request from different domain.
app.use(cors(corsOptions));

// Performance Middleware
// app.use(compression()); // Compress response bodies
// app.use(express.json({ limit: '16kb' }));
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.static('public')); // Serve static files


// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(port, () => {
      console.log(`
Server running successfully
 Port: ${port}
 Environment: ${process.env.NODE_ENV || 'development'}
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
