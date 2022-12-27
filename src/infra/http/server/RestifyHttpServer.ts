import {
  Server,
  Request,
  Response,
  createServer,
  Next,
  plugins,
} from "restify";
import { AbstractController } from "../../../http/controllers/AbstractController";
import { HttpMethod } from "../../../http/enums";
import { HttpRequestModel, HttpRoute } from "../../../http/models";

import { HttpServer } from "../../../http/server/HttpServer";

export class RestifyHttpServer extends HttpServer {
  private server: Server;

  constructor(port: number, routes: HttpRoute[]) {
    super(port, routes);
    this.server = createServer();
  }

  run(): void {
    this.logServerStarting();
    this.setupRestifyServer();

    this.server.listen(this.port, this.logServerStarted());
  }

  private setupRestifyServer() {
    this.server.use(plugins.bodyParser());
    this.server.use(plugins.fullResponse());
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.routes.forEach((route) => {
      const method = route.method;

      switch (method) {
        case HttpMethod.GET:
          this.adaptGet(route);
          break;

        case HttpMethod.POST:
          this.adaptPost(route);
          break;

        case HttpMethod.PUT:
          this.adaptPut(route);
          break;

        case HttpMethod.DELETE:
          this.adaptDelete(route);
          break;
      }
    });
  }

  private async adaptGet(route: HttpRoute<any, any>) {
    const path = this.getCompletePath(route.path);

    this.server.get(
      path,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptPost(route: HttpRoute<any, any>) {
    const path = this.getCompletePath(route.path);

    this.server.post(
      path,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptPut(route: HttpRoute<any, any>) {
    const path = this.getCompletePath(route.path);

    this.server.put(
      path,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptDelete(route: HttpRoute<any, any>) {
    const path = this.getCompletePath(route.path);

    this.server.del(
      path,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptRestifyRequest<RequestBodyType, ResponseBodyType>(
    request: Request,
    response: Response,
    controller: AbstractController<RequestBodyType, ResponseBodyType>
  ) {
    const requestBody = request.body as RequestBodyType;
    const httpRequest: HttpRequestModel = {
      body: requestBody,
    };

    const httpResponse = await controller.handle(httpRequest);
    return response.json(httpResponse.statusCode, httpResponse.body);
  }
}
