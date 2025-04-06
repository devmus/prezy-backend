import express from "express";
import colors from "colors";
import { APP_PORT, authConfig } from "./config/config.mjs";
import pkg from "express-openid-connect";
import dotenv from "dotenv";
dotenv.config();
const { auth, requiresAuth } = pkg;

const app = new express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port: ${APP_PORT}`.green.underline);
});
