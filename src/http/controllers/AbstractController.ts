import { HttpExceptionHandler } from "../exception-handler";
import { HttpRequestModel, HttpResponseModel } from "../models";

export abstract class AbstractController<
  HttpRequestBody = any,
  HttpRequestRouteParams = any,
  HttpRequestQueryParams = any,
  HttpResponseBody = any
> {
  async handle(
    httpRequest: HttpRequestModel<
      HttpRequestBody,
      HttpRequestRouteParams,
      HttpRequestQueryParams
    >
  ) {
    try {
      const httpResponse = await this.tryHandle(httpRequest);
      return httpResponse;
    } catch (error) {
      return this.catchHandle(error);
    }
  }

  protected abstract tryHandle(
    httpRequest: HttpRequestModel<
      HttpRequestBody,
      HttpRequestRouteParams,
      HttpRequestQueryParams
    >
  ): Promise<HttpResponseModel<HttpResponseBody>>;

  private catchHandle(error: unknown) {
    return HttpExceptionHandler.mapErrorToHttpResponseModel(error as Error);
  }
}
