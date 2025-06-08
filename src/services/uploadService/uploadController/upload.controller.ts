import { Request } from "express";
import RESPONSE from "../../../utils/response";
import { asyncHandler } from "../../../utils/asyncHandler";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export const uploadFilesController = asyncHandler<MulterRequest>(
    async (req, res) => {
      const files = req.files;
  
      if (!files || files.length === 0) {
        RESPONSE.FailureResponse(res, 400, {
          message: "No files uploaded.",
        });
        return;
      }
  
      if (files.length > 5) {
        RESPONSE.FailureResponse(res, 400, {
          message: "You can only upload 5 files at a time.",
        });
        return;
      }
  
      const fileInfo = files.map((file) => ({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));
  
      RESPONSE.SuccessResponse(res, 200, {
        message: "File(s) uploaded successfully.",
        data: fileInfo,
      });
    }
  );
  
