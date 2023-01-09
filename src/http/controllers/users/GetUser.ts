import { UserEntity } from "../../../domain/entities";
import {
  GetUserUseCaseInput,
  IGetUserUseCase,
} from "../../../usecases/users/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  GetUserControllerBodyInput,
  GetUserControllerOutput,
  GetUserControllerProps,
  GetUserControllerQueryParamsInput,
  GetUserControllerRouteParamsInput,
  GetUserHttpRequest,
} from "./contracts/GetUser";

export class GetUserController extends AbstractController<
  GetUserControllerBodyInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerQueryParamsInput,
  GetUserControllerOutput
> {
  private getUserUseCase: IGetUserUseCase;

  constructor(props: GetUserControllerProps) {
    super();
    this.getUserUseCase = props.getUserUseCase;
  }

  protected async tryHandle(
    httpRequest: GetUserHttpRequest
  ): Promise<HttpResponseModel<GetUserControllerOutput>> {
    const userId = httpRequest.params.userId;

    const getUserUseCaseInput: GetUserUseCaseInput = {
      id: userId,
    };
    const user = await this.getUserUseCase.exec(getUserUseCaseInput);

    const httpResponse: HttpResponseModel<GetUserControllerOutput> = {
      statusCode: HttpStatus.SUCESS,
      body: this.mapEntityToControllerOutput(user),
    };

    return httpResponse;
  }

  private mapEntityToControllerOutput(
    entity: UserEntity
  ): GetUserControllerOutput {
    return {
      id: entity.getId(),
      name: entity.getName(),
      email: entity.getEmail(),
      avatar: entity.getAvatar(),
    };
  }
}
