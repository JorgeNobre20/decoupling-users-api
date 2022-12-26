import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { CreateUserUseCase, CreateUserUseCaseProps } from "./CreateUser";
import { GetUserUseCase } from "./GetUser";
import {
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../infra/services";
import { DeleteUserUseCase } from "./DeleteUser";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { NotFoundException } from "../../domain/exceptions";

describe("Delete User Use Case", () => {
  it("should delete an user correctly when pass existing user id", async () => {
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

    const deleteUserUseCase = new DeleteUserUseCase({
      getUserUseCase,
      userRepository,
    });

    await deleteUserUseCase.exec({ id: createdUserId });

    const error = await getThrowedErrorType(() =>
      getUserUseCase.exec({ id: createdUserId })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });

  it("should throw not not found exception when pass a not existing user id", async () => {
    const userRepository = new UserInMemoryRepository();
    const getUserUseCase = new GetUserUseCase({
      userRepository,
    });

    const deleteUserUseCase = new DeleteUserUseCase({
      getUserUseCase,
      userRepository,
    });

    const invalidId = "invalid_id";

    const error = await getThrowedErrorType(() =>
      deleteUserUseCase.exec({ id: invalidId })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });
});
