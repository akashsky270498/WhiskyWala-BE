import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  // Allowed origins - in development we usually allow localhost
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  
  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  
  // Allowed headers in requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  
  // Headers exposed to the client
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  
  // Allow credentials (cookies, authorization headers)
  credentials: true,
  
  // How long the results of a preflight request can be cached
  maxAge: 86400 // 24 hours
};

export default corsOptions; 