import { ILoginUseCaseBuilder } from "../../../../builders/usecases/authentication";
import { ILoginUseCase } from "../../../../usecases/authentication/contracts";
import {
  LoginUseCase,
  LoginUseCaseProps
} from "../../../../usecases/authentication/Login";
import { YupLoginValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../data/repositories";
import { FakeAccessTokenService, FakePasswordService } from "../../../services";

export class FakeLoginUseCaseBuilder implements ILoginUseCaseBuilder {
  build(): ILoginUseCase {
    const dataValidator = new YupLoginValidator();
    const userRepository = UserInMemoryRepository.getInstance();

    const passwordService = new FakePasswordService();
    const accessTokenService = new FakeAccessTokenService();

    const loginUseCaseProps: LoginUseCaseProps = {
      dataValidator,
      passwordService,
      userRepository,
      accessTokenService
    };

    const loginUseCase = new LoginUseCase(loginUseCaseProps);
    return loginUseCase;
  }
}
