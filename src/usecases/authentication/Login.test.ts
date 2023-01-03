import { UserInMemoryRepository } from "../../infra/repositories";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { LoginUseCaseInput, SignUpUseCaseInput } from "./contracts";
import { FakeAccessTokenService } from "../../infra/services/FakeAccessToken";
import { BadRequestException } from "../../http/exceptions";
import {
  FakeLoginUseCaseBuilder,
  FakeSignUpUseCaseBuilder,
} from "../../infra/builders/usecases/authentication";

const userRepository = UserInMemoryRepository.getInstance();
const accessTokenGeneratorService = new FakeAccessTokenService();

const loginUseCaseBuilder = new FakeLoginUseCaseBuilder();
const loginUseCase = loginUseCaseBuilder.build();

const signUpUseCaseBuilder = new FakeSignUpUseCaseBuilder();
const signUpUseCase = signUpUseCaseBuilder.build();

const validUserCreationData: SignUpUseCaseInput = {
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
    const createdUserId = await signUpUseCase.exec(validUserCreationData);

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
    expect(tokenPayload.id).toEqual(createdUserId);
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
    await signUpUseCase.exec(validUserCreationData);

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
