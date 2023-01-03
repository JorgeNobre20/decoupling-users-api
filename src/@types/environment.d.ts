declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string | undefined;

      JWT_SECRET: string | undefined;
      JWT_EXPIRATION_TIME_IN_SECONDS: string | undefined;

      NODE_ENV: "development" | "production";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
