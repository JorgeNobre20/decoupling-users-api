import { IUpdateUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IUpdateUserUseCase } from "../../../../usecases/users/contracts";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseProps
} from "../../../../usecases/users/UpdateUser";
import { YupUserValidator } from "../../../adapters";
import { UserMapper } from "../../../data-mapper";
import { KnexUserRepository } from "../../../data/repositories/KnexUserRepository";
import { UserService } from "../../../services";
import { GetUserUseCaseBuilder } from "./Get";

export class UpdateUserUseCaseBuilder implements IUpdateUserUseCaseBuilder {
  build(): IUpdateUserUseCase {
    const userRepository = KnexUserRepository.getInstance();
    const userService = new UserService({ userRepository });

    const dataValidator = new YupUserValidator();
    const getUserUseCase = new GetUserUseCaseBuilder().build();

    const userMapper = new UserMapper();

    const updateUserUseCaseProps: UpdateUserUseCaseProps = {
      userRepository,
      userMapper,
      dataValidator,
      getUserUseCase,
      userService
    };

    const updateUserUseCase = new UpdateUserUseCase(updateUserUseCaseProps);
    return updateUserUseCase;
  }
}
