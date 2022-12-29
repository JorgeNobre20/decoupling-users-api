import {
  LoginUseCaseInput,
  ILoginUseCase,
} from "../../../usecases/authentication/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  LoginControllerBodyInput,
  LoginControllerOutput,
  LoginControllerProps,
  LoginControllerQueryParamsInput,
  LoginControllerRouteParamsInput,
  LoginHttpRequest,
} from "./contracts/Login";

export class LoginController extends AbstractController<
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput,
  LoginControllerOutput
> {
  private loginUseCase: ILoginUseCase;

  constructor(props: LoginControllerProps) {
    super();
    this.loginUseCase = props.loginUseCase;
  }

  protected async tryHandle(
    httpRequest: LoginHttpRequest
  ): Promise<HttpResponseModel<LoginControllerOutput>> {
    const requestBody = httpRequest.body;

    const loginUseCaseInput: LoginUseCaseInput = {
      email: requestBody.email,
      password: requestBody.password,
    };

    const loginUseCaseOutput = await this.loginUseCase.exec(loginUseCaseInput);

    const httpResponseBody: LoginControllerOutput = {
      data: {
        accessToken: loginUseCaseOutput.accessToken,
      },
    };

    const httpResponse: HttpResponseModel<LoginControllerOutput> = {
      statusCode: HttpStatus.SUCESS,
      body: httpResponseBody,
    };

    return httpResponse;
  }
}
