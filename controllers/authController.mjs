import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/responseModel.mjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json(errorResponse("Email already in use", 400));

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user);
    res
      .status(201)
      .json(
        successResponse(
          { user: { email: user.email }, token },
          "User registered successfully",
          201
        )
      );
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Server error", 500));
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatch = user && (await user.comparePassword(password));

    if (!user || !passwordMatch) {
      return res.status(401).json(errorResponse("Invalid credentials", 401));
    }

    const token = generateToken(user);
    res
      .status(200)
      .json(
        successResponse(
          { user: { email: user.email }, token },
          "User logged in successfully"
        )
      );
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Server error", 500));
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    res.status(200).json(successResponse({ user }, "User details retrieved"));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Server error", 500));
  }
};
