import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
global.__appdir = dirname;

dotenv.config({ path: path.resolve(__appdir, "config.env") });

export const APP_PORT = process.env.APP_PORT || 9995;
