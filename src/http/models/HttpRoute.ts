import { AbstractController } from "../controllers/AbstractController";
import { HttpMethod } from "../enums";
import {
  IHttpMiddlewareHandler,
  INoNextHttpMiddlewareHandler,
} from "../middleware";

export type HttpRoute<
  HttpRequestBody = any,
  HttpRequestRouteParams = any,
  HttpRequestQueryParams = any,
  ResponseBodyType = any
> = {
  path: string;
  handler: AbstractController<
    HttpRequestBody,
    HttpRequestRouteParams,
    HttpRequestQueryParams,
    ResponseBodyType
  >;
  requiresAuthentication: boolean;
  method: HttpMethod;
  middlewareHandlers:
    | IHttpMiddlewareHandler<any, any, any, any>[]
    | INoNextHttpMiddlewareHandler<any, any, any>[];
};
