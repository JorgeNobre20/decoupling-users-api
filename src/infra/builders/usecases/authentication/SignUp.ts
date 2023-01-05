import { ISignUpUseCaseBuilder } from "../../../../builders/usecases/authentication/ISignUp";
import { ISignUpUseCase } from "../../../../usecases/authentication/contracts";
import {
  SignUpUseCase,
  SignUpUseCaseProps
} from "../../../../usecases/authentication/SignUp";
import { YupUserValidator } from "../../../adapters";
import { UserMapper } from "../../../data-mapper";
import { KnexUserRepository } from "../../../data/repositories/KnexUserRepository";
import {
  CryptoPasswordService,
  UserService,
  UUIDV4GeneratorService
} from "../../../services";

export class SignUpUseCaseBuilder implements ISignUpUseCaseBuilder {
  build(): ISignUpUseCase {
    const dataValidator = new YupUserValidator();
    const passwordService = new CryptoPasswordService();
    const userMapper = new UserMapper();
    const userRepository = KnexUserRepository.getInstance();
    const userService = new UserService({ userRepository });
    const uuidGeneratorService = new UUIDV4GeneratorService();

    const signUpUseCaseProps: SignUpUseCaseProps = {
      dataValidator,
      passwordService,
      userMapper,
      userRepository,
      userService,
      uuidGeneratorService
    };

    const signUpUseCase = new SignUpUseCase(signUpUseCaseProps);
    return signUpUseCase;
  }
}
