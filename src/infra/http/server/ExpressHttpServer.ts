import express, { Express, Request, Response } from "express";
import { AbstractController } from "../../../http/controllers/AbstractController";
import { HttpRequestModel, HttpRoute } from "../../../http/models";

import { HttpServer } from "../../../http/server/HttpServer";

export class ExpressHttpServer extends HttpServer {
  private server: Express;

  constructor(port: number, routes: HttpRoute[]) {
    super(port, routes);
    this.server = express();
  }

  run(): void {
    this.logServerStarting();
    this.setupExpressServer();
    this.server.listen(this.port, this.logServerStarted);
  }

  private setupExpressServer() {
    this.server.use(express.json());
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.routes.forEach((route) => {
      const method = route.method.toLowerCase() as keyof typeof this.server;
      const path = this.getCompletePath(route.path);

      this.server[method](path, (request: Request, response: Response) => {
        return this.adaptExpressRequest(request, response, route.handler);
      });
    });
  }

  private async adaptExpressRequest<RequestBodyType, ResponseBodyType>(
    request: Request,
    response: Response,
    controller: AbstractController<RequestBodyType, ResponseBodyType>
  ) {
    const requestBody = request.body as RequestBodyType;
    const httpRequest: HttpRequestModel = {
      body: requestBody,
    };

    const httpResponse = await controller.handle(httpRequest);
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  }
}
