import "../../../config/env";
import knex from "knex";

import { DATABASE_CONFIG } from "../../../config/env";

const knexConnection = knex({
  client: "pg",
  connection: {
    host: DATABASE_CONFIG.DB_HOST,
    port: DATABASE_CONFIG.DB_PORT,
    user: DATABASE_CONFIG.DB_USER,
    password: DATABASE_CONFIG.DB_PASSWORD,
    database: DATABASE_CONFIG.DB_NAME,
    charset: "utf8"
  }
});

export { knexConnection };
