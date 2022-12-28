import {
  CreateUserUseCaseInput,
  ICreateUserUseCase,
} from "../../../usecases/users/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  CreateUserControllerBodyInput,
  CreateUserControllerOutput,
  CreateUserControllerProps,
  CreateUserControllerQueryParamsInput,
  CreateUserControllerRouteParamsInput,
  CreateUserHttpRequest,
} from "./contracts/CreateUser";

export class CreateUserController extends AbstractController<
  CreateUserControllerBodyInput,
  CreateUserControllerRouteParamsInput,
  CreateUserControllerQueryParamsInput,
  CreateUserControllerOutput
> {
  private createUserUseCase: ICreateUserUseCase;

  constructor(props: CreateUserControllerProps) {
    super();
    this.createUserUseCase = props.createUserUseCase;
  }

  protected async tryHandle(
    httpRequest: CreateUserHttpRequest
  ): Promise<HttpResponseModel<CreateUserControllerOutput>> {
    const requestBody = httpRequest.body;

    const createUserUseCaseInput: CreateUserUseCaseInput = {
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
      avatar: requestBody.avatar,
    };
    const id = await this.createUserUseCase.exec(createUserUseCaseInput);

    const httpResponse: HttpResponseModel<CreateUserControllerOutput> = {
      statusCode: HttpStatus.CREATED,
      body: {
        message: "User created successfully",
      },
    };

    return httpResponse;
  }
}
