import { IDeleteUserUseCaseBuilder } from "../../../../builders/usecases/users";
import { IDeleteUserUseCase } from "../../../../usecases/users/contracts";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseProps
} from "../../../../usecases/users/DeleteUser";
import { KnexUserRepository } from "../../../data/repositories/KnexUserRepository";
import { GetUserUseCaseBuilder } from "./Get";

export class DeleteUserUseCaseBuilder implements IDeleteUserUseCaseBuilder {
  build(): IDeleteUserUseCase {
    const userRepository = KnexUserRepository.getInstance();
    const getUserUseCase = new GetUserUseCaseBuilder().build();

    const deleteUserUseCaseProps: DeleteUserUseCaseProps = {
      userRepository,
      getUserUseCase
    };

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserUseCaseProps);
    return deleteUserUseCase;
  }
}
