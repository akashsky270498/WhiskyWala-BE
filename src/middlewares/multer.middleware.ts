import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MULTER_CONSTANTS } from '../utils/constants';

const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
];

const uploadPath = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadPath);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images & videos are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MULTER_CONSTANTS.MAX_FILE_SIZE,
    files: MULTER_CONSTANTS.MAX_FILE_COUNT,
  },
});
