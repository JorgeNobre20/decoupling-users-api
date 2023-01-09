declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";

      SERVER_PORT: string | undefined;

      JWT_SECRET: string | undefined;
      JWT_EXPIRATION_TIME_IN_SECONDS: string | undefined;

      DB_HOST: string | undefined;
      DB_PORT: string | undefined;
      DB_USER: string | undefined;
      DB_PASSWORD: string | undefined;
      DB_NAME: string | undefined;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
