import { UserEntity } from "../../../domain/entities";
import {
  UpdateUserUseCaseInput,
  IUpdateUserUseCase,
} from "../../../usecases/users/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  UpdateUserControllerBodyInput,
  UpdateUserControllerOutput,
  UpdateUserControllerProps,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserHttpRequest,
} from "./contracts/UpdateUser";

export class UpdateUserController extends AbstractController<
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerOutput
> {
  private updateUserUseCase: IUpdateUserUseCase;

  constructor(props: UpdateUserControllerProps) {
    super();
    this.updateUserUseCase = props.updateUserUseCase;
  }

  protected async tryHandle(
    httpRequest: UpdateUserHttpRequest
  ): Promise<HttpResponseModel<UpdateUserControllerOutput>> {
    const requestBody = httpRequest.body;
    const routeParams = httpRequest.params;

    const updateUserUseCaseInput: UpdateUserUseCaseInput = {
      id: routeParams.id,
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
      avatar: requestBody.avatar,
    };
    const updatedUser = await this.updateUserUseCase.exec(
      updateUserUseCaseInput
    );

    const httpResponse: HttpResponseModel<UpdateUserControllerOutput> = {
      statusCode: HttpStatus.SUCESS,
      body: this.mapEntityToControllerOutput(updatedUser),
    };

    return httpResponse;
  }

  private mapEntityToControllerOutput(
    entity: UserEntity
  ): UpdateUserControllerOutput {
    return {
      name: entity.getName(),
      email: entity.getEmail(),
      avatar: entity.getAvatar(),
    };
  }
}
