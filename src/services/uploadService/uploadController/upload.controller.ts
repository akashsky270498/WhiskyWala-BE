import { Request } from "express";
import RESPONSE from "../../../utils/response";
import { asyncHandler } from "../../../utils/asyncHandler";
import { DEFAULT_VALUES, HTTP_STATUS_CODES } from "../../../utils/constants";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export const uploadFilesController = asyncHandler<MulterRequest>(
  async (req, res) => {
    const files = req.files;

    if (!files || files.length === DEFAULT_VALUES.ZERO) {
      RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
        message: "No files uploaded.",
      });
      return;
    }

    if (files.length > DEFAULT_VALUES.FIVE) {
      RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
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

    RESPONSE.SuccessResponse(res, HTTP_STATUS_CODES.SUCCESS, {
      message: "File(s) uploaded successfully.",
      data: fileInfo,
    });
    return;
  }
);

