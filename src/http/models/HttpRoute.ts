import { AbstractController } from "../controllers/AbstractController";
import { HttpMethod } from "../enums";

export type HttpRoute<RequestBodyType = any, ResponseBodyType = any> = {
  path: string;
  handler: AbstractController<RequestBodyType, ResponseBodyType>;
  method: HttpMethod;
};
