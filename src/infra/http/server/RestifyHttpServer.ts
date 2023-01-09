import {
  Server,
  Request,
  Response,
  createServer,
  Next,
  plugins
} from "restify";
import { JWT_AUTHENTICATION_CONFIG } from "../../../config/env";
import { AbstractController } from "../../../http/controllers/AbstractController";
import { HttpMethod } from "../../../http/enums";
import { INoNextHttpMiddlewareHandler } from "../../../http/middleware";
import { HttpRequestModel, HttpRoute } from "../../../http/models";

import { HttpServer, HttpServerProps } from "../../../http/server/HttpServer";
import {
  JwtAccessTokenService,
  JwtAccessTokenServiceProps
} from "../../services";
import { RestifyAuthMiddlewareHandler } from "../middlewares/RestifyAuthMiddewareHandler";

const jwtAccessTokenServiceProps: JwtAccessTokenServiceProps = {
  expirationTimeInSeconds: JWT_AUTHENTICATION_CONFIG.EXPIRATION_TIME_IN_SECONDS,
  secret: JWT_AUTHENTICATION_CONFIG.SECRET
};

const jwtAccessTokenService = new JwtAccessTokenService(
  jwtAccessTokenServiceProps
);
const restifyAuthMiddlewareHandler = new RestifyAuthMiddlewareHandler({
  accessTokenService: jwtAccessTokenService
});

type RestifyMiddlewareHandlerType = INoNextHttpMiddlewareHandler<
  Request,
  Response,
  any
>;

export class RestifyHttpServer extends HttpServer {
  private server: Server;

  constructor(props: HttpServerProps) {
    super(props);
    this.server = createServer();
  }

  async run() {
    this.logServerStarting();
    this.setupRestifyServer();

    try {
      await this.tryRun();
    } catch (error) {
      this.catchRun(error);
    }
  }

  private async tryRun() {
    this.server.listen(this.port, () => this.logServerStarted());
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

  private async adaptGet(route: HttpRoute) {
    const { completePath: path, middlewares } =
      this.getCompletePathAndMiddlewares(route);

    this.server.get(
      path,
      ...middlewares,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptPost(route: HttpRoute) {
    const { completePath: path, middlewares } =
      this.getCompletePathAndMiddlewares(route);

    this.server.post(
      path,
      ...middlewares,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptPut(route: HttpRoute) {
    const { completePath: path, middlewares } =
      this.getCompletePathAndMiddlewares(route);

    this.server.put(
      path,
      ...middlewares,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private async adaptDelete(route: HttpRoute<any, any>) {
    const { completePath: path, middlewares } =
      this.getCompletePathAndMiddlewares(route);

    this.server.del(
      path,
      ...middlewares,
      (request: Request, response: Response, next: Next) => {
        this.adaptRestifyRequest(request, response, route.handler);
      }
    );
  }

  private adaptMiddlewares(
    requiresAuthentication: boolean,
    middlewares: INoNextHttpMiddlewareHandler<Request, Response, any>[]
  ) {
    const middlewareMethods = middlewares.map((middleware) => {
      return middleware.exec.bind(middleware);
    });

    if (requiresAuthentication) {
      const authMiddleware = this.getAuthMiddleware();
      middlewareMethods.push(authMiddleware);
    }

    return middlewareMethods;
  }

  private getCompletePathAndMiddlewares(route: HttpRoute) {
    const { requiresAuthentication, path } = route;
    const completePath = this.getCompletePath(path);

    const parsedMiddlewares =
      route.middlewareHandlers as RestifyMiddlewareHandlerType[];

    const middlewares = this.adaptMiddlewares(
      requiresAuthentication,
      parsedMiddlewares
    );

    return {
      middlewares,
      completePath
    };
  }

  private getAuthMiddleware() {
    return restifyAuthMiddlewareHandler.exec.bind(restifyAuthMiddlewareHandler);
  }

  private async adaptRestifyRequest<RequestBodyType, ResponseBodyType>(
    request: Request,
    response: Response,
    controller: AbstractController<RequestBodyType, ResponseBodyType>
  ) {
    const requestBody = request.body as RequestBodyType;
    const httpRequest: HttpRequestModel = {
      params: request.params,
      query: request.query,
      body: requestBody
    };

    const httpResponse = await controller.handle(httpRequest);
    return response.json(httpResponse.statusCode, httpResponse.body);
  }
}
