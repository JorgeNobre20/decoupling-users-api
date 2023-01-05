import { IGetUserControllerBuilder } from "../../../../builders/controllers/users";
import { GetUserController } from "../../../../http/controllers/users";
import { GetUserControllerType } from "../../../../http/controllers/users/contracts";
import { GetUserUseCaseBuilder } from "../../usecases/users";

export class GetUserControllerBuilder implements IGetUserControllerBuilder {
  build(): GetUserControllerType {
    const getUserUseCase = new GetUserUseCaseBuilder().build();
    const getUserController = new GetUserController({
      getUserUseCase
    });

    return getUserController;
  }
}
