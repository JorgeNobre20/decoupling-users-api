import { ILoginUseCaseBuilder } from "../../../../builders/usecases/authentication";
import { ILoginUseCase } from "../../../../usecases/authentication/contracts";
import {
  LoginUseCase,
  LoginUseCaseProps,
} from "../../../../usecases/authentication/Login";
import { YupLoginValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../repositories";
import {
  FakeAccessTokenService,
  FakePasswordService,
  JwtAccessTokenService,
} from "../../../services";

export class FakeLoginUseCaseBuilder implements ILoginUseCaseBuilder {
  build(): ILoginUseCase {
    const dataValidator = new YupLoginValidator();
    const userRepository = UserInMemoryRepository.getInstance();

    const passwordService = new FakePasswordService();
    const accessTokenGeneratorService = new JwtAccessTokenService();

    const loginUseCaseProps: LoginUseCaseProps = {
      dataValidator,
      passwordService,
      userRepository,
      accessTokenGeneratorService,
    };

    const loginUseCase = new LoginUseCase(loginUseCaseProps);
    return loginUseCase;
  }
}
