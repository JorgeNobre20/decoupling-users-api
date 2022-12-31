import { IDeleteUserControllerBuilder } from "../../../../builders/controllers/users";
import { DeleteUserController } from "../../../../http/controllers/users";
import { DeleteUserControllerType } from "../../../../http/controllers/users/contracts";
import { FakeDeleteUserUseCaseBuilder } from "../../usecases/users";

export class FakeDeleteUserControllerBuilder
  implements IDeleteUserControllerBuilder
{
  build(): DeleteUserControllerType {
    const deleteUserUseCase = new FakeDeleteUserUseCaseBuilder().build();
    const deleteUserController = new DeleteUserController({
      deleteUserUseCase,
    });

    return deleteUserController;
  }
}
