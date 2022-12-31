import { ISignUpControllerBuilder } from "../../../../builders/controllers/authentication";
import { SignUpController } from "../../../../http/controllers/authentication";
import { SignUpControllerType } from "../../../../http/controllers/authentication/contracts";
import { FakeSignUpUseCaseBuilder } from "../../usecases/authentication";

export class FakeSignUpControllerBuilder implements ISignUpControllerBuilder {
  build(): SignUpControllerType {
    const signUpUseCase = new FakeSignUpUseCaseBuilder().build();
    const signUpController = new SignUpController({
      signUpUseCase,
    });

    return signUpController;
  }
}
