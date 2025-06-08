import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import path from "path";
import { env } from "../config/env.config";

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
        console.warn("No valid local file to upload.");
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath);
        return result;

    } catch (error: unknown) {
        console.error("Cloudinary upload error: ", error);
        fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath);
        return null;
    }
};

export const extractPublicIdFromUrl = (url: string): string | null => {

    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = path.basename(pathname);
        const publicId = filename.split('.')[0];

        return publicId || null;

    } catch (error: unknown) {
        console.error("Invalid URL for extracting public Id", error);
        return null;
    }
};

export const deleteFromCloudinary = async (publicId: string): Promise<{ result: string }> => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        return response;

    } catch (error: unknown) {
        console.error("Cloudinary delete error: ", error);
        return { result: "error" }
    }
}
