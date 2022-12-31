import { ISignUpUseCaseBuilder } from "../../../../builders/usecases/authentication/ISignUp";
import { ISignUpUseCase } from "../../../../usecases/authentication/contracts";
import {
  SignUpUseCase,
  SignUpUseCaseProps,
} from "../../../../usecases/authentication/SignUp";
import { YupUserValidator } from "../../../adapters";
import { UserMapper } from "../../../data-mapper";
import { UserInMemoryRepository } from "../../../repositories";
import {
  FakePasswordService,
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../../services";

export class FakeSignUpUseCaseBuilder implements ISignUpUseCaseBuilder {
  build(): ISignUpUseCase {
    const dataValidator = new YupUserValidator();
    const passwordService = new FakePasswordService();
    const userMapper = new UserMapper();
    const userRepository = UserInMemoryRepository.getInstance();
    const userService = new UserService({ userRepository });
    const uuidGeneratorService = new UUIDInMemoryGeneratorService();

    const signUpUseCaseProps: SignUpUseCaseProps = {
      dataValidator,
      passwordService,
      userMapper,
      userRepository,
      userService,
      uuidGeneratorService,
    };

    const signUpUseCase = new SignUpUseCase(signUpUseCaseProps);
    return signUpUseCase;
  }
}
