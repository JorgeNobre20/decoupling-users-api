import { Request, Response } from "restify";
import { UnauthorizedException } from "../../../domain/exceptions";
import { HttpStatus } from "../../../http/enums";
import { INoNextHttpMiddlewareHandler } from "../../../http/middleware";
import { IAccessTokenService } from "../../../services";

type AuthMiddlewareHandlerProps = {
  accessTokenService: IAccessTokenService;
};

type RestifyAuthMiddlewareHandlerType = INoNextHttpMiddlewareHandler<
  Request,
  Response,
  void
>;

export class RestifyAuthMiddlewareHandler
  implements RestifyAuthMiddlewareHandlerType
{
  private accessTokenService: IAccessTokenService;

  constructor(props: AuthMiddlewareHandlerProps) {
    this.accessTokenService = props.accessTokenService;
  }

  async exec(request: Request, response: Response) {
    const authorization = request.headers.authorization;

    if (!authorization) {
      this.generateUnauthorizedResponse("Token is empty", response);
      throw new UnauthorizedException("Token is empty");
    }

    const [, token] = authorization.split(" ");

    try {
      const payload = await this.accessTokenService.validateAndGetPayload(
        token
      );

      request.params.userId = payload.id;
    } catch (error) {
      this.generateUnauthorizedResponse("Invalid Token", response);
      throw new UnauthorizedException("Invalid Token");
    }
  }

  private generateUnauthorizedResponse(message: string, response: Response) {
    response.json(HttpStatus.UNAUTHORIZED, {
      message,
    });
  }
}
