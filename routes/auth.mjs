import express from "express";
import {
  register,
  login,
  getUserProfile,
} from "../controllers/authController.mjs";
import authMiddleware from "../middleware/auth.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUserProfile);

export default router;
