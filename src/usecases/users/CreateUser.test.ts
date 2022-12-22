import { UserMapper, UUIDInMemoryGenerator } from "../../adpaters";
import { YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { CreateUserUseCase, CreateUserUseCaseProps } from "./CreateUser";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  BusinessRuleException,
  InvalidDataException,
} from "../../domain/exceptions";
import { GetUserUseCase } from "./GetUser";

describe("Create User Use Case", () => {
  it("should create user correctly when pass valid data", async () => {
    const dataValidator = new YupUserValidator();
    const userMapper = new UserMapper();
    const userRepository = new UserInMemoryRepository();
    const uuidGenerator = new UUIDInMemoryGenerator();

    const createUserUseCaseProps: CreateUserUseCaseProps = {
      dataValidator,
      userMapper,
      userRepository,
      uuidGenerator,
    };
    const createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);
    const getUserUseCase = new GetUserUseCase({
      userRepository,
    });

    const inputData = {
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };
    const createdUserId = await createUserUseCase.exec(inputData);
    const createdUser = await getUserUseCase.exec({ id: createdUserId });

    expect(createdUserId).toEqual(createdUser.getId());
    expect(inputData.name).toEqual(createdUser.getName());
    expect(inputData.email).toEqual(createdUser.getEmail());
    expect(inputData.password).toEqual(createdUser.getPassword());
    expect(inputData.avatar).toEqual(createdUser.getAvatar());
  });

  it("should throw error when pass invalid data", async () => {
    const dataValidator = new YupUserValidator();
    const userMapper = new UserMapper();
    const userRepository = new UserInMemoryRepository();
    const uuidGenerator = new UUIDInMemoryGenerator();

    const createUserUseCaseProps: CreateUserUseCaseProps = {
      dataValidator,
      userMapper,
      userRepository,
      uuidGenerator,
    };
    const createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);

    const input = {
      name: "",
      email: "invalid",
      password: "",
      avatar: "",
    };

    const error = await getThrowedErrorType(async () =>
      createUserUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });

  it("should throw error when try create user with already existing email", async () => {
    const dataValidator = new YupUserValidator();
    const userMapper = new UserMapper();
    const userRepository = new UserInMemoryRepository();
    const uuidGenerator = new UUIDInMemoryGenerator();

    const createUserUseCaseProps: CreateUserUseCaseProps = {
      dataValidator,
      userMapper,
      userRepository,
      uuidGenerator,
    };
    const createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);

    const firstInputData = {
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };

    await createUserUseCase.exec(firstInputData);
    const error = await getThrowedErrorType(async () =>
      createUserUseCase.exec(firstInputData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });
});
