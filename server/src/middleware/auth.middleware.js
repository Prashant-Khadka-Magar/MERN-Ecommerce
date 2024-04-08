import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

//protect routes to authorize only logged in users

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the JWT token form the cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //this can be accessed as {user}=req.body in those routes where it is set
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("NOT AUTHORIZED, TOKEN FAILED");
    }
  } else {
    res.status(401);
    throw new Error("NOT AUTHORIZED");
  }
});

//protect routes to authorize only to admin users
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("NOT AUTHORIZED AS ADMIN");
  }
});

export { protect,admin };
