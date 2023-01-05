import { ILoginControllerBuilder } from "../../../../builders/controllers/authentication";
import { LoginController } from "../../../../http/controllers/authentication";
import { LoginControllerType } from "../../../../http/controllers/authentication/contracts";
import { LoginUseCaseBuilder } from "../../usecases/authentication";

export class LoginControllerBuilder implements ILoginControllerBuilder {
  build(): LoginControllerType {
    const loginUseCase = new LoginUseCaseBuilder().build();
    const loginController = new LoginController({
      loginUseCase
    });

    return loginController;
  }
}
