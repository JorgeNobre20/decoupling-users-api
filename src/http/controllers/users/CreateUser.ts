import {
  CreateUserUseCaseInput,
  ICreateUserUseCase,
} from "../../../usecases/users/contracts";
import { HttpRequestModel, HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  CreateUserControllerInput,
  CreateUserControllerOutput,
  CreateUserControllerProps,
} from "./contracts";

export class CreateUserController extends AbstractController<
  CreateUserControllerInput,
  CreateUserControllerOutput
> {
  private createUserUseCase: ICreateUserUseCase;

  constructor(props: CreateUserControllerProps) {
    super();
    this.createUserUseCase = props.createUserUseCase;
  }

  protected async tryHandle(
    httpRequest: HttpRequestModel<CreateUserControllerInput>
  ): Promise<HttpResponseModel<CreateUserControllerOutput>> {
    const requestBody = httpRequest.body;

    const createUserUseCaseInput: CreateUserUseCaseInput = {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
      avatar: requestBody.avatar,
    };
    await this.createUserUseCase.exec(createUserUseCaseInput);

    const httpResponse: HttpResponseModel<CreateUserControllerOutput> = {
      statusCode: 200,
      body: {
        message: "User created successfully",
      },
    };

    return httpResponse;
  }
}
