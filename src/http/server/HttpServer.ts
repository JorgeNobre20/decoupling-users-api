import { HttpRoute } from "../models";

export abstract class HttpServer {
  protected port: number;
  protected routes: HttpRoute[];
  protected apiPrefix: string = "/api/v1";

  constructor(port: number, routes: HttpRoute[]) {
    this.port = port;
    this.routes = routes;
  }

  abstract run(): void;

  protected abstract registerRoutes(): void;
  protected getCompletePath(uri: string) {
    return `${this.apiPrefix}/${uri}`;
  }

  protected logServerStarting() {
    console.log(`[INFO] Starting server at port ${this.port}...`);
  }

  protected logServerStarted() {
    console.log(`[INFO] Server started at port ${this.port}`);
  }
}
