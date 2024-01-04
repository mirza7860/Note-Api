import User from "../Model/UserModel.js";
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import ValidationCheck from "../Utils/ValidationCheck.js";
import jwt from "jsonwebtoken";
// LogIn ,  Register , Logout

const Register = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    if (!userName || !password || !email) {
      return res.json(
        new ValidationCheck(
          400,
          "Each field should be required. Bad Request. Must Try Again."
        )
      );
    }
    if (userName.trim() === "") {
      return res.json(new ValidationCheck(400, "Username cannot be empty"));
    }
    if (password.trim() === "") {
      return res.json(new ValidationCheck(400, "Password cannot be empty"));
    }
    if (email.trim() === "") {
      return res.json(new ValidationCheck(400, "email cannot be found"));
    }
    const alreadyExistUser = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (alreadyExistUser) {
      return res.json(
        new ApiResponse(200, {
          message: "User already exists",
          suggestion: "Redirect to login",
        })
      );
    }

    // Registartion Process Starts Here

    const newUser = new User({ userName, password, email });
    await newUser.save();

    return res.status(200).json(
      new ApiResponse(201, {
        newUser: newUser,
        Suggestion: "Registartion Successful . Redirect to login.",
      })
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};

// LogIn
const Login = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    if (!email || !userName) {
      return res.json(
        new ValidationCheck(400, "Username or Email - one field must require.")
      );
    }
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (!user) {
      return res.json(
        new ApiResponse(200, "user does not exists and redirect to register.")
      );
    }
    const result = await user.isPasswordCorrect(password);
    if (!result) {
      return res.json(new ApiResponse(200, "Invalid User Credentials.Try Again."));
    }
    const token = jwt.sign({ userName: userName }, process.env.JWT_SECRET);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("authtoken", token, options);
    return res.json(new ApiResponse(200, { message: "Login successful" }))
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }));
  }
};

// Log Out

const Logout = async (req, res) => {
  const { authtoken } = req.cookies;
  try {
    const info = jwt.verify(authtoken, process.env.JWT_SECRET);
    const user = await User.findOne({ userName: info.userName });
    if (user) {
      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .json(new ApiResponse(200, "Logout successful.Thanks for visiting"))
        .cookie("authtoken", "", options);
    } else {
      res.status(404).json(new ApiResponse(404, "User not found"));
    }
  } catch (err) {
    res.status(401).json(new ApiError(401, "Token is invalid or expired"));
  }
};
export {Login,Logout,Register};