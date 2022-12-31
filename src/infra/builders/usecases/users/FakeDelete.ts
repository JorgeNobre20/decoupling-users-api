import { IDeleteUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IDeleteUserUseCase } from "../../../../usecases/users/contracts";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseProps,
} from "../../../../usecases/users/DeleteUser";
import { UserInMemoryRepository } from "../../../repositories";
import { FakeGetUserUseCaseBuilder } from "./FakeGet";

export class FakeDeleteUserUseCaseBuilder implements IDeleteUserUseCaseBuilder {
  build(): IDeleteUserUseCase {
    const userRepository = UserInMemoryRepository.getInstance();
    const getUserUseCase = new FakeGetUserUseCaseBuilder().build();

    const updateUserUseCaseProps: DeleteUserUseCaseProps = {
      userRepository,
      getUserUseCase,
    };

    const updateUserUseCase = new DeleteUserUseCase(updateUserUseCaseProps);
    return updateUserUseCase;
  }
}
