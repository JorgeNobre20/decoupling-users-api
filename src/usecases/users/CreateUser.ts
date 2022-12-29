import { IDataValidator } from "../../adpaters/IDataValidator";
import { IUserMapper } from "../../data-mapper";
import { IUserRepository } from "../../data/repositories";
import { UserDataValidation } from "../../infra/adapters/YupUserValidator";
import { IUserService, IUUIDGeneratorService } from "../../services";
import {
  CreateUserUseCaseInput,
  ICreateUserUseCase,
} from "./contracts/ICreateUser";

export type CreateUserUseCaseProps = {
  userRepository: IUserRepository;
  userService: IUserService;
  uuidGenerator: IUUIDGeneratorService;
  dataValidator: IDataValidator<UserDataValidation>;
  userMapper: IUserMapper;
};

export class CreateUserUseCase implements ICreateUserUseCase {
  private userRepository: IUserRepository;
  private userService: IUserService;
  private uuidGenerator: IUUIDGeneratorService;
  private dataValidator: IDataValidator<UserDataValidation>;
  private userMapper: IUserMapper;

  constructor(props: CreateUserUseCaseProps) {
    this.userRepository = props.userRepository;
    this.userService = props.userService;
    this.uuidGenerator = props.uuidGenerator;
    this.dataValidator = props.dataValidator;
    this.userMapper = props.userMapper;
  }

  async exec(data: CreateUserUseCaseInput) {
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
