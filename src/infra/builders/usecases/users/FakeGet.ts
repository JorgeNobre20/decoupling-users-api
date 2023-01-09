import { IGetUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IGetUserUseCase } from "../../../../usecases/users/contracts";
import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../../usecases/users/GetUser";
import { UserMapper } from "../../../data-mapper";
import { UserInMemoryRepository } from "../../../data/repositories";

export class FakeGetUserUseCaseBuilder implements IGetUserUseCaseBuilder {
  build(): IGetUserUseCase {
    const userRepository = UserInMemoryRepository.getInstance();
    const userMapper = new UserMapper();

    const getUserUseCaseProps: GetUserUseCaseProps = {
      userRepository,
      userMapper,
    };

    const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

    return getUserUseCase;
  }
}
