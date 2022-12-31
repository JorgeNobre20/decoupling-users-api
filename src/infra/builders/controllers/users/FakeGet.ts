import { IGetUserControllerBuilder } from "../../../../builders/controllers/users";
import { GetUserController } from "../../../../http/controllers/users";
import { GetUserControllerType } from "../../../../http/controllers/users/contracts";
import { FakeGetUserUseCaseBuilder } from "../../usecases/users";

export class FakeGetUserControllerBuilder implements IGetUserControllerBuilder {
  build(): GetUserControllerType {
    const getUserUseCase = new FakeGetUserUseCaseBuilder().build();
    const getUserController = new GetUserController({
      getUserUseCase,
    });

    return getUserController;
  }
}
