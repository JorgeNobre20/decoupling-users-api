import { IUserMapper } from "../../data-mapper";
import { IUserRepository } from "../../data/repositories";
import { NotFoundException } from "../../domain/exceptions";
import { IGetUserUseCase, GetUserUseCaseInput } from "./contracts";

export type GetUserUseCaseProps = {
  userMapper: IUserMapper;
  userRepository: IUserRepository;
};

export class GetUserUseCase implements IGetUserUseCase {
  private userMapper: IUserMapper;
  private userRepository: IUserRepository;

  constructor(props: GetUserUseCaseProps) {
    this.userMapper = props.userMapper;
    this.userRepository = props.userRepository;
  }

  async exec(data: GetUserUseCaseInput) {
    const userId = data.id;
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException(`Doesn't exists an user with ID: ${userId}`);
    }

    const user = this.userMapper.mapRepositoryToEntity(userExists);
    return user;
  }
}
