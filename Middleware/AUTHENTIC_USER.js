import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
const AUTHENTICATE_USER = async (req, res, next) => {
  const authToken = req.cookies.authtoken;
  try {
    const info = jwt.verify(authToken,  process.env.JWT_SECRET);
    if (info) {
      const user = await User.findOne({ userName:info.userName });
      req.user = user;
      next();
    } else {
      res.status(404).json(new ApiResponse(404, "Token is invalid or expired"));
    }
  } catch (err) {
    res.status(401).json(new ApiError(401, { message: err.message }));
  }
};
export { AUTHENTICATE_USER };
