import { IDeleteUserControllerBuilder } from "../../../../builders/controllers/users";
import { DeleteUserController } from "../../../../http/controllers/users";
import { DeleteUserControllerType } from "../../../../http/controllers/users/contracts";
import { DeleteUserUseCaseBuilder } from "../../usecases/users";

export class DeleteUserControllerBuilder
  implements IDeleteUserControllerBuilder
{
  build(): DeleteUserControllerType {
    const deleteUserUseCase = new DeleteUserUseCaseBuilder().build();
    const deleteUserController = new DeleteUserController({
      deleteUserUseCase
    });

    return deleteUserController;
  }
}
