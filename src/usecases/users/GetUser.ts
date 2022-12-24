import { IUserRepository } from "../../data/repositories";
import { UserEntity, UserEntityProps } from "../../domain/entities";
import { NotFoundException } from "../../domain/exceptions/NotFound";
import { UseCase } from "../IUseCase";

export type GetUserUseCaseProps = {
  userRepository: IUserRepository;
};

type Input = {
  id: string;
};

export class GetUserUseCase implements UseCase<Input, UserEntity> {
  private userRepository: IUserRepository;

  constructor(props: GetUserUseCaseProps) {
    this.userRepository = props.userRepository;
  }

  async exec(data: Input) {
    const userId = data.id;
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException(`Doesn't exists an user with ID: ${userId}`);
    }

    const userData: UserEntityProps = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      password: userExists.password,
      avatar: userExists.avatar,
    };
    const user = new UserEntity(userData);

    return user;
  }
}
