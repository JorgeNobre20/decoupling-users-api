import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { CreateUserUseCase, CreateUserUseCaseProps } from "./CreateUser";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import {
  BusinessRuleException,
  InvalidDataException,
} from "../../domain/exceptions";
import {
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../infra/services";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({
  userRepository,
});
const uuidGenerator = new UUIDInMemoryGeneratorService();

const createUserUseCaseProps: CreateUserUseCaseProps = {
  dataValidator,
  userMapper,
  userRepository,
  uuidGenerator,
  userService,
};
const createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);

const firstUserCreationInputData = {
  name: "valid_name",
  email: "email@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("Create User Use Case", () => {
  it("should create user correctly when pass valid data", async () => {
    const createdUserId = await createUserUseCase.exec(
      firstUserCreationInputData
    );
    const createdUser = await userRepository.findById(createdUserId);
    await userRepository.delete(createdUserId);

    expect(createdUser).toBeTruthy();
    expect(createdUserId).toEqual(createdUser?.id);
    expect(firstUserCreationInputData.name).toEqual(createdUser?.name);
    expect(firstUserCreationInputData.email).toEqual(createdUser?.email);
    expect(firstUserCreationInputData.password).toEqual(createdUser?.password);
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
      createUserUseCase.exec(input)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });

  it("should throw error when try create user with already existing email", async () => {
    const createdUserId = await createUserUseCase.exec(
      firstUserCreationInputData
    );
    const error = await getThrowedErrorType(async () =>
      createUserUseCase.exec(firstUserCreationInputData)
    );

    await userRepository.delete(createdUserId);

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });
});
