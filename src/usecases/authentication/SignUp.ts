import { IUserMapper } from "../../adpaters";
import { IDataValidator } from "../../adpaters/IDataValidator";
import { IUserRepository } from "../../data/repositories";
import { UserDataValidation } from "../../infra/adapters/YupUserValidator";
import {
  IPasswordService,
  IUserService,
  IUUIDGeneratorService,
} from "../../services";
import { SignUpUseCaseInput, ISignUpUseCase } from "./contracts/ISignUp";

export type SignUpUseCaseProps = {
  userRepository: IUserRepository;
  userService: IUserService;
  uuidGeneratorService: IUUIDGeneratorService;
  dataValidator: IDataValidator<UserDataValidation>;
  userMapper: IUserMapper;
  passwordService: IPasswordService;
};

export class SignUpUseCase implements ISignUpUseCase {
  private userMapper: IUserMapper;
  private userRepository: IUserRepository;
  private dataValidator: IDataValidator<UserDataValidation>;

  private userService: IUserService;
  private passwordService: IPasswordService;
  private uuidGeneratorService: IUUIDGeneratorService;

  constructor(props: SignUpUseCaseProps) {
    this.userService = props.userService;
    this.passwordService = props.passwordService;
    this.uuidGeneratorService = props.uuidGeneratorService;

    this.userMapper = props.userMapper;
    this.dataValidator = props.dataValidator;
    this.userRepository = props.userRepository;
  }

  async exec(data: SignUpUseCaseInput) {
    const id = await this.uuidGeneratorService.generate();

    await this.dataValidator.validate({
      id: id,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });

    const encodedPassword = await this.passwordService.encode(data.password);

    const user = this.userMapper.mapRepositoryToEntity({
      ...data,
      id,
      password: encodedPassword,
    });

    await this.userService.verifyIfEmailIsAvailableOrThrowBusinessRuleException(
      user.getEmail()
    );

    await this.userRepository.create(
      this.userMapper.mapEntityToRepository(user)
    );

    return id;
  }
}
