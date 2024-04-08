import express from "express";
import {
  changeAvatar,
  changePassword,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  login,
  logout,
  register,
  updateAccountDetails,
  updateUser,
} from "../controllers/user.controller.js";
import { resendOtp, verifyOtp } from "../controllers/otp.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.patch("/update-account", protect, updateAccountDetails);
router.patch("/change-password", protect, changePassword);
router.patch(
  "/change-avatar",
  protect,
  upload.single("newAvatar"),
  changeAvatar
);
router.route("/profile").get(protect, getUserProfile);

router.get("/get-all-users", protect, admin, getAllUsers);
router.get("/get-user/:id", protect, admin, getSingleUser);
router.delete("/delete-user/:id", protect, admin, deleteUser);
router.patch("/update-user/:id", protect, admin, updateUser);

//----OTP----------------
router.post("/verify-otp/:id", verifyOtp);
router.post("/resent-otp", resendOtp);

export default router;
