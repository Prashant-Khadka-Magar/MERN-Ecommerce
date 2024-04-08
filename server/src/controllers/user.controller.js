import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import otpGenerator from "../utils/generateOtp.js";
import { Otp } from "../models/otp.model.js";
import sendOtpMail from "../utils/mailSender.js";
import generateToken from "../utils/generateToken.js";

//while registering a new user
const register = asyncHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const avatarLocalPath = req.file.path;

    if (!username || !password || !email) {
      throw new ApiError(400, "Please enter all the fields");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new ApiError(400, "User already exists");
    }

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(avatar);

    if (!avatar) {
      throw new ApiError(500, "Error while uploading avatar");
    }

    const user = await User.create({
      username,
      email,
      password,
      avatar: avatar.url,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    const otp = otpGenerator();

    await Otp.create({
      user: createdUser._id,
      code: otp,
    });

    await sendOtpMail(createdUser.email, createdUser.username, otp);

    return res.status(200).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(505).json({ message: error.message });
  }
});

//while logging in user
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!password || !email) {
      throw new ApiError(400, "Please enter all the fields");
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new ApiError(400, "User doesn't exists");
    }
  
    const isPasswordCorrect = await user.isPasswordCorrect(password);
  
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    if (!user.isVerified) {
      const otp = otpGenerator();
  
      await Otp.create({
        user: user._id,
        code: otp,
      });
  
      await sendOtpMail(user.email, user.username, otp);
  
      throw new ApiError(401, "Please verify the email");
    }
  
    const loggedInUser = await User.findById(user._id).select("-password");
    //send res to ask the response and user id to be converted to jwt token and store in http only coookie
    generateToken(res, user._id);
  
    res.status(200).json(loggedInUser);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

// to logout user
const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "LOGGED OUT SUCCESSFUL" });
  } catch (error) {
    throw new ApiError(401, "Error while loggin out");
  }
});

//get own profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new ApiError(401, "Invalid user credentials");
  }
});

//change name or email
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: username,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(user);
});

//change password
const changePassword = asyncHandler(async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Please enter all the fields");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Incorrect password");
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json("Password changed successfully");
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//-----------forgot password--------------------------------

//change avatar
const changeAvatar = asyncHandler(async (req, res) => {
  try {
    const newAvatar = req.file.path;

    if (!newAvatar) {
      throw new ApiError(400, "Please upload a new avatar");
    }

    const avatar = await uploadOnCloudinary(newAvatar);

    if (!avatar) {
      throw new ApiError(500, "Error while uploading avatar");
    }

    await User.findByIdAndUpdate(
      req.user?._id,
      { avatar: avatar.url },
      { new: true }
    );

    res.status(200).json("Avatar Updated Successfully");
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//get all users-- only ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//get single user by id --only ADMIN
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404);
      throw new Error("USER NOT FOUND");
    }
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//delete a user --only ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(400, "USER NOT FOUND");
    }
    if (user.isAdmin) {
      res.status(400);
      throw new Error("CANNOT DELETE ADMIN USER");
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json("User Deleted successfully");
    }
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

//update a user --only ADMIN
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    const isAdmin=req.body.isAdmin === true?"true":false;
    console.log(isAdmin)
    if (user) {
      user.isAdmin = Boolean(isAdmin);
      await user.save();
    }


    res.status(200).json(user);
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export {
  register,
  login,
  logout,
  getUserProfile,
  updateAccountDetails,
  changePassword,
  changeAvatar,
  getAllUsers,
  deleteUser,
  getSingleUser,
  updateUser
};
