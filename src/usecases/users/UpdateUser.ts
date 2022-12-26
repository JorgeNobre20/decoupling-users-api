import { IDataValidator, IUserMapper } from "../../adpaters";
import { IUserRepository, UserRepositoryData } from "../../data/repositories";
import { UserDataValidation } from "../../infra/adapters";
import { IUserService } from "../../services";
import { IGetUserUseCase } from "./IGetUser";
import { IUpdateUserUseCase, UpdateUserUseCaseInput } from "./IUpdateUser";

export type UpdateUserUseCaseProps = {
  userRepository: IUserRepository;
  getUserUseCase: IGetUserUseCase;
  dataValidator: IDataValidator<UserDataValidation>;
  userService: IUserService;
  userMapper: IUserMapper;
};

export class UpdateUserUseCase implements IUpdateUserUseCase {
  private userRepository: IUserRepository;
  private getUserUseCase: IGetUserUseCase;
  private dataValidator: IDataValidator<UserDataValidation>;
  private userService: IUserService;
  private userMapper: IUserMapper;

  constructor(props: UpdateUserUseCaseProps) {
    this.userRepository = props.userRepository;
    this.getUserUseCase = props.getUserUseCase;
    this.dataValidator = props.dataValidator;
    this.userService = props.userService;
    this.userMapper = props.userMapper;
  }

  async exec(data: UpdateUserUseCaseInput) {
    const userId = data.id;

    await this.getUserUseCase.exec({ id: userId });
    await this.dataValidator.validate({
      id: userId,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });

    await this.userService.verifyIfEmailBelongsToUserOrIsAvailableOrThrowBusinessRuleException(
      userId,
      data.email
    );

    const updatedData: UserRepositoryData = {
      id: userId,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    };

    await this.userRepository.update(updatedData);
    return this.userMapper.mapRepositoryToEntity(updatedData);
  }
}
