import * as dotenv from "dotenv";
import Path from "path";

const ENVIRONMENT = process.env.NODE_ENV?.trim();
const ENV_FILE = `.env.${ENVIRONMENT}`;

const envFilePath = Path.join(__dirname, "..", "..", ENV_FILE);
const resolvedFilePath = Path.resolve(envFilePath);

dotenv.config({
  path: resolvedFilePath,
});

export const ENVIRONMENT_CONFIG = {
  SERVER_PORT: Number(process.env.SERVER_PORT!),
  NODE_ENV: process.env.NODE_ENV,
};
