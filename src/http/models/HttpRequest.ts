export type HttpRequestModel<
  Body = any,
  RouteParams = any,
  QueryParams = any
> = {
  params: RouteParams;
  query: QueryParams;
  body: Body;
};
