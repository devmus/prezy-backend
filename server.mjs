import express from "express";
import colors from "colors";
import { APP_PORT } from "./config/config.mjs";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.mjs";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const app = new express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:8080" }));

app.use(morgan("dev"));

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(APP_PORT, () =>
      console.log(`Server is running on port: ${APP_PORT}`.green.underline)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
