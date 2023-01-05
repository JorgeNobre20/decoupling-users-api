import { IGetUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IGetUserUseCase } from "../../../../usecases/users/contracts";
import {
  GetUserUseCase,
  GetUserUseCaseProps
} from "../../../../usecases/users/GetUser";
import { UserMapper } from "../../../data-mapper";
import { KnexUserRepository } from "../../../data/repositories/KnexUserRepository";

export class GetUserUseCaseBuilder implements IGetUserUseCaseBuilder {
  build(): IGetUserUseCase {
    const userRepository = KnexUserRepository.getInstance();
    const userMapper = new UserMapper();

    const getUserUseCaseProps: GetUserUseCaseProps = {
      userRepository,
      userMapper
    };

    const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

    return getUserUseCase;
  }
}
