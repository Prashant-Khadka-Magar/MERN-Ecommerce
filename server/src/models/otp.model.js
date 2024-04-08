import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 300,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);
