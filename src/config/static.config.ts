import path from "path";
import { Response } from "express";

export const staticFileConfig = {
    path: path.resolve(__dirname, '../public'), //resolve is safer then join for absolute path
    options: {
        maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0, //cache statis files for 1 day in production
        dotfiles: 'ignore', //prevent serving hidder files like .env
        etag: true,
        index: false, //prevent serving index.html automatically
        lastModified: true,
        setHeaders: (res: Response, _filePath: string) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
        }
    }

}