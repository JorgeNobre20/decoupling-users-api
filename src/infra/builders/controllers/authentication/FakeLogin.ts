import { ILoginControllerBuilder } from "../../../../builders/controllers/authentication";
import { LoginController } from "../../../../http/controllers/authentication";
import { LoginControllerType } from "../../../../http/controllers/authentication/contracts";
import { FakeLoginUseCaseBuilder } from "../../usecases/authentication";

export class FakeLoginControllerBuilder implements ILoginControllerBuilder {
  build(): LoginControllerType {
    const loginUseCase = new FakeLoginUseCaseBuilder().build();
    const loginController = new LoginController({
      loginUseCase,
    });

    return loginController;
  }
}
