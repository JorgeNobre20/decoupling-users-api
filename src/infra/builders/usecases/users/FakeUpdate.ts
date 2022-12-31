import { IUpdateUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IUpdateUserUseCase } from "../../../../usecases/users/contracts";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseProps,
} from "../../../../usecases/users/UpdateUser";
import { YupUserValidator } from "../../../adapters";
import { UserMapper } from "../../../data-mapper";
import { UserInMemoryRepository } from "../../../repositories";
import { UserService } from "../../../services";
import { FakeGetUserUseCaseBuilder } from "./FakeGet";

export class FakeUpdateUserUseCaseBuilder implements IUpdateUserUseCaseBuilder {
  build(): IUpdateUserUseCase {
    const userRepository = UserInMemoryRepository.getInstance();
    const userService = new UserService({ userRepository });

    const dataValidator = new YupUserValidator();
    const getUserUseCase = new FakeGetUserUseCaseBuilder().build();

    const userMapper = new UserMapper();

    const updateUserUseCaseProps: UpdateUserUseCaseProps = {
      userRepository,
      userMapper,
      dataValidator,
      getUserUseCase,
      userService,
    };

    const updateUserUseCase = new UpdateUserUseCase(updateUserUseCaseProps);
    return updateUserUseCase;
  }
}
