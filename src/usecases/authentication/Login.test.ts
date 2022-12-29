import { YupLoginValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { LoginUseCase, LoginUseCaseProps } from "./Login";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { FakePasswordService } from "../../infra/services";
import { LoginUseCaseInput } from "./contracts";
import { FakeAccessTokenGeneratorService } from "../../infra/services/FakeAccessTokenGenerator";
import { UserRepositoryData } from "../../data/repositories";
import { BadRequestException } from "../../http/exceptions";

const dataValidator = new YupLoginValidator();
const userRepository = UserInMemoryRepository.getInstance();
const passwordService = new FakePasswordService();
const accessTokenGeneratorService = new FakeAccessTokenGeneratorService();

const loginUseCaseProps: LoginUseCaseProps = {
  dataValidator,
  userRepository,
  passwordService,
  accessTokenGeneratorService,
};
const loginUseCase = new LoginUseCase(loginUseCaseProps);

const validUserCreationData: UserRepositoryData = {
  id: "valid_id",
  name: "valid_name",
  email: "email@email.com",
  password: "valid_passsword",
  avatar: "valid_avatar",
};

describe("Login User Use Case", () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  it("should generate a valid access token when pass valid credentials", async () => {
    const encodedValidPassword = await passwordService.encode(
      validUserCreationData.password
    );

    await userRepository.create({
      ...validUserCreationData,
      password: encodedValidPassword,
    });

    const LoginUseCaseInput: LoginUseCaseInput = {
      email: validUserCreationData.email,
      password: validUserCreationData.password,
    };

    const loginUseCaseOutput = await loginUseCase.exec(LoginUseCaseInput);

    const isValidToken = await accessTokenGeneratorService.isValid(
      loginUseCaseOutput.accessToken
    );

    const tokenPayload =
      await accessTokenGeneratorService.validateAndGetPayload(
        loginUseCaseOutput.accessToken
      );

    expect(isValidToken).toBe(true);
    expect(loginUseCaseOutput.accessToken).toBeTruthy();
    expect(tokenPayload.id).toEqual(validUserCreationData.id);
  });

  it("should throw validation exception when pass invalid data", async () => {
    const input: LoginUseCaseInput = {
      email: "invalid_email",
      password: "",
    };

    const error = await getThrowedErrorType(async () =>
      loginUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });

  it("should throw not found exception when pass a not existing user email account", async () => {
    const input: LoginUseCaseInput = {
      email: "not_existing@email.com",
      password: "any_password",
    };

    const error = await getThrowedErrorType(async () =>
      loginUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });

  it("should throw invalid data exception when pass a existing user email account with wrong password", async () => {
    const encodedValidPassword = await passwordService.encode(
      validUserCreationData.password
    );

    await userRepository.create({
      ...validUserCreationData,
      password: encodedValidPassword,
    });

    const input: LoginUseCaseInput = {
      email: validUserCreationData.email,
      password: "wrong_password",
    };

    const error = await getThrowedErrorType(async () =>
      loginUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BadRequestException);
  });
});
