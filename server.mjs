import express from "express";
import colors from "colors";
import { APP_PORT } from "./config/config.mjs";
const app = new express();

app.listen(APP_PORT, () => {
  console.log(`Server is running on port: ${APP_PORT}`.green.underline);
});
