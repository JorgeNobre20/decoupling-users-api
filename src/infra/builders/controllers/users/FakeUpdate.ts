import { IUpdateUserControllerBuilder } from "../../../../builders/controllers/users";
import { UpdateUserController } from "../../../../http/controllers/users";
import { UpdateUserControllerType } from "../../../../http/controllers/users/contracts";
import { FakeUpdateUserUseCaseBuilder } from "../../usecases/users";

export class FakeUpdateUserControllerBuilder
  implements IUpdateUserControllerBuilder
{
  build(): UpdateUserControllerType {
    const updateUserUseCase = new FakeUpdateUserUseCaseBuilder().build();
    const updateUserController = new UpdateUserController({
      updateUserUseCase,
    });

    return updateUserController;
  }
}
