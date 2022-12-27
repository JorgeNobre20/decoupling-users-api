import { HttpStatus } from "../enums";

export type HttpResponseModel<Body = any> = {
  statusCode: HttpStatus;
  body?: Body;
};
