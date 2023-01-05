import { ILoginUseCaseBuilder } from "../../../../builders/usecases/authentication";
import { JWT_AUTHENTICATION_CONFIG } from "../../../../config/env";
import { IAccessTokenService } from "../../../../services";
import { ILoginUseCase } from "../../../../usecases/authentication/contracts";
import {
  LoginUseCase,
  LoginUseCaseProps
} from "../../../../usecases/authentication/Login";
import { YupLoginValidator } from "../../../adapters";
import { KnexUserRepository } from "../../../data/repositories/KnexUserRepository";
import {
  CryptoPasswordService,
  JwtAccessTokenService,
  JwtAccessTokenServiceProps
} from "../../../services";

export class LoginUseCaseBuilder implements ILoginUseCaseBuilder {
  build(): ILoginUseCase {
    const dataValidator = new YupLoginValidator();
    const userRepository = KnexUserRepository.getInstance();

    const passwordService = new CryptoPasswordService();
    const accessTokenService = this.buildAccessTokenService();

    const loginUseCaseProps: LoginUseCaseProps = {
      dataValidator,
      passwordService,
      userRepository,
      accessTokenService
    };

    const loginUseCase = new LoginUseCase(loginUseCaseProps);
    return loginUseCase;
  }

  private buildAccessTokenService(): IAccessTokenService {
    const { SECRET, EXPIRATION_TIME_IN_SECONDS } = JWT_AUTHENTICATION_CONFIG;

    const jwtAccessTokenServiceProps: JwtAccessTokenServiceProps = {
      secret: SECRET,
      expirationTimeInSeconds: EXPIRATION_TIME_IN_SECONDS
    };

    const accessTokenGeneratorService = new JwtAccessTokenService(
      jwtAccessTokenServiceProps
    );

    return accessTokenGeneratorService;
  }
}
