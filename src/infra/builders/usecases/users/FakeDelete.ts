import { IDeleteUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IDeleteUserUseCase } from "../../../../usecases/users/contracts";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseProps
} from "../../../../usecases/users/DeleteUser";
import { UserInMemoryRepository } from "../../../data/repositories";
import { FakeGetUserUseCaseBuilder } from "./FakeGet";

export class FakeDeleteUserUseCaseBuilder implements IDeleteUserUseCaseBuilder {
  build(): IDeleteUserUseCase {
    const userRepository = UserInMemoryRepository.getInstance();
    const getUserUseCase = new FakeGetUserUseCaseBuilder().build();

    const deleteUserUseCaseProps: DeleteUserUseCaseProps = {
      userRepository,
      getUserUseCase
    };

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserUseCaseProps);
    return deleteUserUseCase;
  }
}
