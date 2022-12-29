import { IDataValidator } from "../../adpaters/IDataValidator";
import { IUserRepository } from "../../data/repositories";
import { NotFoundException } from "../../domain/exceptions";
import { LoginDataValidation } from "../../infra/adapters";
import {
  AccessTokenPayload,
  IAccessTokenGeneratorService,
  IPasswordService,
} from "../../services";
import {
  LoginUseCaseInput,
  ILoginUseCase,
  LoginUseCaseOutput,
} from "./contracts/ILogin";

export type LoginUseCaseProps = {
  accessTokenGeneratorService: IAccessTokenGeneratorService;
  userRepository: IUserRepository;
  dataValidator: IDataValidator<LoginDataValidation>;
  passwordService: IPasswordService;
};

export class LoginUseCase implements ILoginUseCase {
  private userRepository: IUserRepository;
  private dataValidator: IDataValidator<LoginDataValidation>;

  private passwordService: IPasswordService;
  private accessTokenGeneratorService: IAccessTokenGeneratorService;

  constructor(props: LoginUseCaseProps) {
    this.accessTokenGeneratorService = props.accessTokenGeneratorService;
    this.passwordService = props.passwordService;

    this.dataValidator = props.dataValidator;
    this.userRepository = props.userRepository;
  }

  async exec(data: LoginUseCaseInput) {
    const { email, password } = data;
    await this.dataValidator.validate({
      email,
      password,
    });

    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundException(
        `Doesn't exists an user with email: ${email}`
      );
    }

    await this.passwordService.checkIfPasswordIsRightOrThrowInvalidDataException(
      password,
      foundUser.password
    );

    const tokenPayload: AccessTokenPayload = {
      id: foundUser.id,
    };

    const accessToken =
      await this.accessTokenGeneratorService.generateAccessToken(
        foundUser.id,
        tokenPayload
      );

    const loginUserCaseOutput: LoginUseCaseOutput = {
      accessToken,
    };

    return loginUserCaseOutput;
  }
}
