import { IUpdateUserControllerBuilder } from "../../../../builders/controllers/users";
import { UpdateUserController } from "../../../../http/controllers/users";
import { UpdateUserControllerType } from "../../../../http/controllers/users/contracts";
import { UpdateUserUseCaseBuilder } from "../../usecases/users";

export class UpdateUserControllerBuilder
  implements IUpdateUserControllerBuilder
{
  build(): UpdateUserControllerType {
    const updateUserUseCase = new UpdateUserUseCaseBuilder().build();
    const updateUserController = new UpdateUserController({
      updateUserUseCase
    });

    return updateUserController;
  }
}
