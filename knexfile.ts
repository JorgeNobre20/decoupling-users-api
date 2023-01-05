import "./src/config/env";
import Path from "path";
import { DATABASE_CONFIG } from "./src/config/env";

const migrationsPath = Path.join(
  __dirname,
  "src",
  "infra",
  "data",
  "database",
  "migrations"
);
const migrationsDir = Path.resolve(migrationsPath);

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: DATABASE_CONFIG.DB_HOST,
      port: DATABASE_CONFIG.DB_PORT,
      user: DATABASE_CONFIG.DB_USER,
      password: DATABASE_CONFIG.DB_PASSWORD,
      database: DATABASE_CONFIG.DB_NAME,
      charset: "utf8"
    },
    migrations: {
      directory: migrationsDir
    }
  }
};
