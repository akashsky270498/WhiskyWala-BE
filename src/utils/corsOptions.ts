import { CorsOptions } from "cors";
import { CORS_OPTIONS } from "./constants";

export const corsOptions: CorsOptions = {
    //Allowed origins
    origin: process.env.ALLOWED_ORIGINS?.split(','),

    //Allowed HTTP Methods
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],

    //Allowed Headers
    allowedHeaders: ['Content-Type', 'Authorization'],

    //Headers exposed to client
    exposedHeaders: ['Content-Range', 'X-Content-Range'],

    //Allow credentials [cookies, authorization headers]
    credentials: true,

    // How long the results of a preflight request can be cached 
    maxAge: CORS_OPTIONS.MAX_AGE_IN_MS,

}

