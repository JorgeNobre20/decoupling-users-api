import { ISignUpControllerBuilder } from "../../../../builders/controllers/authentication";
import { SignUpController } from "../../../../http/controllers/authentication";
import { SignUpControllerType } from "../../../../http/controllers/authentication/contracts";
import { SignUpUseCaseBuilder } from "../../usecases/authentication";

export class SignUpControllerBuilder implements ISignUpControllerBuilder {
  build(): SignUpControllerType {
    const signUpUseCase = new SignUpUseCaseBuilder().build();
    const signUpController = new SignUpController({
      signUpUseCase
    });

    return signUpController;
  }
}
