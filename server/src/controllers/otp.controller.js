import asyncHandler from "express-async-handler";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//verifying a email address
const verifyOtp = asyncHandler(async (req, res) => {
  console.log("otp:", req.body)
  try {

    // request userId and otp from the user
    const id = req.params.id;
    const { otp } = req.body;

    //convert the string from params to mongoose object
    const userId=new ObjectId(id)

    const searchOtp = await Otp.findOne({ user: userId });

    if (!searchOtp) {
      throw new ApiError(500, "User not found");
    }

    if (searchOtp.code !== otp) {
      throw new ApiError(500, "Incorrect OTP");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      throw new ApiError(500, "Failed to update user");
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(505).json({ message: error.message });
  }
});

//resend OTP to the user
const resendOtp = asyncHandler(async (req, res) => {});

export { verifyOtp, resendOtp };
