import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      // define filetype
      resource_type: "auto",
    });
    // delete the locally saved temporary file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // delete the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    console.log(error);
    return null;
  }
};

//deleting from cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deletion result:", result);
  } catch (error) {
    console.error("Error deleting asset:", error);
  }
};

export default uploadOnCloudinary;
