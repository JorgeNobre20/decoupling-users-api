import { IUserMapper, IUUIDGenerator } from "../../adpaters";
import { IDataValidator } from "../../adpaters/IDataValidator";
import { IUserRepository } from "../../data/repositories";
import { BusinessRuleException } from "../../domain/exceptions";
import { UserDataValidation } from "../../infra/adapters/YupUserValidator";
import { IUserService } from "../../services";
import { UseCase } from "../IUseCase";

export type CreateUserUseCaseProps = {
  userRepository: IUserRepository;
  userService: IUserService;
  uuidGenerator: IUUIDGenerator;
  dataValidator: IDataValidator<UserDataValidation>;
  userMapper: IUserMapper;
};

type Input = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export class CreateUserUseCase implements UseCase<Input, string> {
  private userRepository: IUserRepository;
  private userService: IUserService;
  private uuidGenerator: IUUIDGenerator;
  private dataValidator: IDataValidator<UserDataValidation>;
  private userMapper: IUserMapper;

  constructor(props: CreateUserUseCaseProps) {
    this.userRepository = props.userRepository;
    this.userService = props.userService;
    this.uuidGenerator = props.uuidGenerator;
    this.dataValidator = props.dataValidator;
    this.userMapper = props.userMapper;
  }

  async exec(data: Input) {
    const id = await this.uuidGenerator.generate();

    await this.dataValidator.validate({
      id: id,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });

    const user = this.userMapper.mapRepositoryToEntity({ id, ...data });
    await this.userService.verifyIfEmailIsAvailableOrThrowBusinessRuleException(
      user.getEmail()
    );

    await this.userRepository.create(
      this.userMapper.mapEntityToRepository(user)
    );

    return id;
  }
}
