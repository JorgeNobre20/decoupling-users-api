import {
  DeleteUserUseCaseInput,
  IDeleteUserUseCase,
} from "../../../usecases/users/contracts";
import { HttpStatus } from "../../enums";
import { HttpResponseModel } from "../../models";
import { AbstractController } from "../AbstractController";
import {
  DeleteUserControllerBodyInput,
  DeleteUserControllerOutput,
  DeleteUserControllerProps,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserHttpRequest,
} from "./contracts/DeleteUser";

export class DeleteUserController extends AbstractController<
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerOutput
> {
  private deleteUserUseCase: IDeleteUserUseCase;

  constructor(props: DeleteUserControllerProps) {
    super();
    this.deleteUserUseCase = props.deleteUserUseCase;
  }

  protected async tryHandle(
    httpRequest: DeleteUserHttpRequest
  ): Promise<HttpResponseModel<DeleteUserControllerOutput>> {
    const userId = httpRequest.params.userId;

    const deleteUserUseCaseInput: DeleteUserUseCaseInput = {
      id: userId,
    };
    await this.deleteUserUseCase.exec(deleteUserUseCaseInput);

    const httpResponse: HttpResponseModel<DeleteUserControllerOutput> = {
      statusCode: HttpStatus.SUCESS,
      body: {
        message: "User deleted successfully",
      },
    };

    return httpResponse;
  }
}
