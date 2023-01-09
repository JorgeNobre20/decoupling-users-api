import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../http/enums";
import { IHttpMiddlewareHandler } from "../../../http/middleware";
import { IAccessTokenService } from "../../../services";

type AuthMiddlewareHandlerProps = {
  accessTokenService: IAccessTokenService;
};

type ReturnType = Promise<Response<any, Record<string, any>> | undefined>;

type ExpressAuthMiddlewareHandlerType = IHttpMiddlewareHandler<
  Request,
  Response,
  NextFunction,
  ReturnType
>;

export class ExpressAuthMiddlewareHandler
  implements ExpressAuthMiddlewareHandlerType
{
  private accessTokenService: IAccessTokenService;

  constructor(props: AuthMiddlewareHandlerProps) {
    this.accessTokenService = props.accessTokenService;
  }

  async exec(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return this.generateUnauthorizedResponse("Token is empty", response);
    }

    const [, token] = authorization.split(" ");

    try {
      const payload = await this.accessTokenService.validateAndGetPayload(
        token
      );

      request.params.userId = payload.id;
      next();
    } catch (error) {
      return this.generateUnauthorizedResponse("Invalid Token", response);
    }
  }

  private generateUnauthorizedResponse(message: string, response: Response) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      message,
    });
  }
}
