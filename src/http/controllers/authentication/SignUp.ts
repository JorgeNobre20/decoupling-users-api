import {
  SignUpUseCaseInput,
  ISignUpUseCase,
} from "../../../usecases/authentication/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  SignUpControllerBodyInput,
  SignUpControllerOutput,
  SignUpControllerProps,
  SignUpControllerQueryParamsInput,
  SignUpControllerRouteParamsInput,
  SignUpHttpRequest,
} from "./contracts/SignUp";

export class SignUpController extends AbstractController<
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput,
  SignUpControllerOutput
> {
  private signUpUseCase: ISignUpUseCase;

  constructor(props: SignUpControllerProps) {
    super();
    this.signUpUseCase = props.signUpUseCase;
  }

  protected async tryHandle(
    httpRequest: SignUpHttpRequest
  ): Promise<HttpResponseModel<SignUpControllerOutput>> {
    const requestBody = httpRequest.body;

    const signUpUseCaseInput: SignUpUseCaseInput = {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
      avatar: requestBody.avatar,
    };
    const id = await this.signUpUseCase.exec(signUpUseCaseInput);

    const httpResponse: HttpResponseModel<SignUpControllerOutput> = {
      statusCode: HttpStatus.CREATED,
      body: {
        message: "User created successfully",
      },
    };

    return httpResponse;
  }
}
