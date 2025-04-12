import User from "../models/User.mjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  console.log("Registering");
  console.log(req.body);

  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use." });

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
