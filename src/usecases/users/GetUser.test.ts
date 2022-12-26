import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { CreateUserUseCase, CreateUserUseCaseProps } from "./CreateUser";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { NotFoundException } from "../../domain/exceptions";
import { GetUserUseCase, GetUserUseCaseProps } from "./GetUser";
import {
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../infra/services";

describe("Get User Use Case", () => {
  it("should find an user correctly when pass existing user id", async () => {
    const dataValidator = new YupUserValidator();
    const userMapper = new UserMapper();
    const userRepository = new UserInMemoryRepository();
    const userService = new UserService({ userRepository });
    const uuidGenerator = new UUIDInMemoryGeneratorService();

    const createUserUseCaseProps: CreateUserUseCaseProps = {
      dataValidator,
      userMapper,
      userRepository,
      uuidGenerator,
      userService,
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

    expect(createdUser).toBeTruthy();
    expect(createdUserId).toEqual(createdUser.getId());
    expect(inputData.name).toEqual(createdUser.getName());
    expect(inputData.email).toEqual(createdUser.getEmail());
    expect(inputData.password).toEqual(createdUser.getPassword());
    expect(inputData.avatar).toEqual(createdUser.getAvatar());
  });

  it("should throw not found exeception when try to find user with no existing ID", async () => {
    const userRepository = new UserInMemoryRepository();

    const getUserUseCaseProps: GetUserUseCaseProps = {
      userRepository,
    };

    const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);
    const ID = "no_existing_id";

    const error = await getThrowedErrorType(async () =>
      getUserUseCase.exec({ id: ID })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });
});
