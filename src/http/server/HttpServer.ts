import { HttpRoute } from "../models";

export type HttpServerProps = {
  port: number;
  routes: HttpRoute[];
};

export abstract class HttpServer {
  protected port: number;
  protected routes: HttpRoute[];
  protected apiPrefix: string = "/api/v1";

  constructor(props: HttpServerProps) {
    this.port = props.port;
    this.routes = props.routes;
  }

  abstract run(): Promise<void>;

  protected async catchRun(error: unknown) {
    console.error("[ERROR] Starting server error");
    console.log(error);
  }

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
