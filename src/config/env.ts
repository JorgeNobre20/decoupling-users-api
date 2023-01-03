import * as dotenv from "dotenv";
import Path from "path";

const ENVIRONMENT = process.env.NODE_ENV?.trim();
const ENV_FILE = `.env.${ENVIRONMENT}`;

const envFilePath = Path.join(__dirname, "..", "..", ENV_FILE);
const resolvedFilePath = Path.resolve(envFilePath);

dotenv.config({
  path: resolvedFilePath,
});

export const SERVER_CONFIG = {
  PORT: Number(process.env.SERVER_PORT!),
  ENV: process.env.NODE_ENV,
};

export const JWT_AUTHENTICATION_CONFIG = {
  SECRET: process.env.JWT_SECRET!,
  EXPIRATION_TIME_IN_SECONDS: Number(
    process.env.JWT_EXPIRATION_TIME_IN_SECONDS!
  ),
};
