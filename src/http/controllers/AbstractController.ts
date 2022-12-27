import { HttpExceptionHandler } from "../exception-handler";
import { HttpRequestModel, HttpResponseModel } from "../models";

export abstract class AbstractController<RequestBodyType, ResponseBodyType> {
  async handle(httpRequest: HttpRequestModel<RequestBodyType>) {
    try {
      const httpResponse = await this.tryHandle(httpRequest);
      return httpResponse;
    } catch (error) {
      return this.catchHandle(error);
    }
  }

  protected abstract tryHandle(
    httpRequest: HttpRequestModel<RequestBodyType>
  ): Promise<HttpResponseModel<ResponseBodyType>>;

  private catchHandle(error: unknown) {
    return HttpExceptionHandler.mapErrorToHttpResponseModel(error as Error);
  }
}
