import express, { Express, Request, Response, NextFunction } from "express";
import { AbstractController } from "../../../http/controllers/AbstractController";
import { IHttpMiddlewareHandler } from "../../../http/middleware";
import { HttpRequestModel, HttpRoute } from "../../../http/models";

import { HttpServer } from "../../../http/server/HttpServer";
import { JwtAccessTokenService } from "../../services";
import { ExpressAuthMiddlewareHandler } from "../middlewares";

type ExpressMiddlewareHandlerType = IHttpMiddlewareHandler<
  Request,
  Response,
  NextFunction,
  any
>;

const jwtAccessTokenService = new JwtAccessTokenService();
const expressAuthMiddlewareHandler = new ExpressAuthMiddlewareHandler({
  accessTokenService: jwtAccessTokenService,
});

export class ExpressHttpServer extends HttpServer {
  private server: Express;

  constructor(port: number, routes: HttpRoute[]) {
    super(port, routes);
    this.server = express();
  }

  run(): void {
    this.logServerStarting();
    this.setupExpressServer();
    this.server.listen(this.port, () => this.logServerStarted());
  }

  private setupExpressServer() {
    this.server.use(express.json());
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.routes.forEach((route) => {
      const method = route.method.toLowerCase() as keyof typeof this.server;
      const path = this.getCompletePath(route.path);

      const parsedMiddlewareHandlers =
        route.middlewareHandlers as ExpressMiddlewareHandlerType[];

      const middlewares = parsedMiddlewareHandlers.map((middleware) =>
        middleware.exec.bind(middleware)
      );

      if (route.requiresAuthentication) {
        const authMiddleware = this.getAuthMiddleware();
        middlewares.push(authMiddleware);
      }

      this.server[method](
        path,
        ...middlewares,
        (request: Request, response: Response) => {
          return this.adaptExpressRequest(request, response, route.handler);
        }
      );
    });
  }

  private getAuthMiddleware() {
    return expressAuthMiddlewareHandler.exec.bind(expressAuthMiddlewareHandler);
  }

  private async adaptExpressRequest(
    request: Request,
    response: Response,
    controller: AbstractController
  ) {
    const httpRequest: HttpRequestModel = {
      params: request.params,
      query: request.params,
      body: request.body,
    };

    const httpResponse = await controller.handle(httpRequest);
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  }
}
