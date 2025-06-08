import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILE_COUNT = 5;

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
];

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images & videos are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILE_COUNT,
  },
});
