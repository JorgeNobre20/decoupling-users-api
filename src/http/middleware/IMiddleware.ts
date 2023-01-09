export interface IHttpMiddlewareHandler<
  RequestType,
  ResponseType,
  NextFunctionType,
  ReturnType
> {
  exec: (
    request: RequestType,
    reponse: ResponseType,
    next: NextFunctionType
  ) => ReturnType;
}

export interface INoNextHttpMiddlewareHandler<
  RequestType,
  ResponseType,
  ReturnType
> {
  exec: (request: RequestType, reponse: ResponseType) => Promise<ReturnType>;
}
