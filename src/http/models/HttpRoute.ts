import { AbstractController } from "../controllers/AbstractController";
import { HttpMethod } from "../enums";

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
  method: HttpMethod;
};
