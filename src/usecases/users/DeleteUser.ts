import { IUserRepository } from "../../data/repositories";
import { IGetUserUseCase } from "./IGetUser";
import { IDeleteUserUseCase, DeleteUserUseCaseInput } from "./IDeleteUser";

export type DeleteUserUseCaseProps = {
  userRepository: IUserRepository;
  getUserUseCase: IGetUserUseCase;
};

export class DeleteUserUseCase implements IDeleteUserUseCase {
  private userRepository: IUserRepository;
  private getUserUseCase: IGetUserUseCase;

  constructor(props: DeleteUserUseCaseProps) {
    this.userRepository = props.userRepository;
    this.getUserUseCase = props.getUserUseCase;
  }

  async exec(data: DeleteUserUseCaseInput) {
    const userId = data.id;
    await this.getUserUseCase.exec({ id: userId });
    await this.userRepository.delete(userId);
  }
}
