import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { SignUpUseCase, SignUpUseCaseProps } from "./SignUp";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  BusinessRuleException,
  InvalidDataException,
} from "../../domain/exceptions";
import {
  PasswordService,
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../infra/services";
import { SignUpUseCaseInput } from "./contracts";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({
  userRepository,
});
const uuidGeneratorService = new UUIDInMemoryGeneratorService();
const passwordService = new PasswordService();

const signUpUseCaseProps: SignUpUseCaseProps = {
  dataValidator,
  userMapper,
  userRepository,
  uuidGeneratorService,
  userService,
  passwordService,
};
const signUpUseCase = new SignUpUseCase(signUpUseCaseProps);

const firstUserCreationInputData: SignUpUseCaseInput = {
  name: "valid_name",
  email: "email@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("SignUp User Use Case", () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  it("should create user correctly when pass valid data", async () => {
    const createdUserId = await signUpUseCase.exec(firstUserCreationInputData);
    const createdUser = await userRepository.findById(createdUserId);
    const encodedPassword = await passwordService.encode(
      firstUserCreationInputData.password
    );

    expect(createdUser).toBeTruthy();
    expect(createdUserId).toEqual(createdUser?.id);
    expect(firstUserCreationInputData.name).toEqual(createdUser?.name);
    expect(firstUserCreationInputData.email).toEqual(createdUser?.email);
    expect(encodedPassword).toEqual(createdUser?.password);
    expect(firstUserCreationInputData.avatar).toEqual(createdUser?.avatar);
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
