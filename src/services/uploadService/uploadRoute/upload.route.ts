import { Router } from "express";
import { upload } from "../../../middlewares/multer.middleware";
import { uploadFilesController } from "../uploadController/upload.controller";

const router = Router();

router.post("/upload", upload.array("files", 5), uploadFilesController);