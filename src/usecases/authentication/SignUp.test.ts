import { UserInMemoryRepository } from "../../infra/data/repositories";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  BusinessRuleException,
  InvalidDataException,
} from "../../domain/exceptions";
import { SignUpUseCaseInput } from "./contracts";
import { FakeSignUpUseCaseBuilder } from "../../infra/builders/usecases/authentication";
import { FakeGetUserUseCaseBuilder } from "../../infra/builders/usecases/users";
import { FakePasswordService } from "../../infra/services";

const signUpUseCaseBuilder = new FakeSignUpUseCaseBuilder();
const signUpUseCase = signUpUseCaseBuilder.build();

const getUserUseCaseBuilder = new FakeGetUserUseCaseBuilder();
const getUserUseCase = getUserUseCaseBuilder.build();

const passwordService = new FakePasswordService();

const firstUserCreationInputData: SignUpUseCaseInput = {
  name: "valid_name",
  email: "email@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("SignUp User Use Case", () => {
  beforeEach(async () => {
    await UserInMemoryRepository.getInstance().deleteAll();
  });

  it("should create user correctly when pass valid data", async () => {
    const createdUserId = await signUpUseCase.exec(firstUserCreationInputData);
    const createdUser = await getUserUseCase.exec({ id: createdUserId });

    const passwordComparison = passwordService.isPasswordRight(
      firstUserCreationInputData.password,
      createdUser.getPassword()
    );

    expect(createdUser).toBeTruthy();
    expect(createdUserId).toEqual(createdUser?.getId());
    expect(firstUserCreationInputData.name).toEqual(createdUser?.getName());
    expect(firstUserCreationInputData.email).toEqual(createdUser?.getEmail());
    expect(passwordComparison).toBeTruthy();
    expect(firstUserCreationInputData.avatar).toEqual(createdUser?.getAvatar());
  });

  it("should throw error when pass invalid data", async () => {
    const input = {
      name: "",
      email: "invalid",
      password: "",
      avatar: "",
    };

    const error = await getThrowedErrorType(async () =>
      signUpUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });

  it("should throw error when try create user with already existing email", async () => {
    await signUpUseCase.exec(firstUserCreationInputData);
    const error = await getThrowedErrorType(async () =>
      signUpUseCase.exec(firstUserCreationInputData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });
});
