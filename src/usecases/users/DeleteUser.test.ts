import { UserInMemoryRepository } from "../../infra/repositories";
import { GetUserUseCase } from "./GetUser";
import { DeleteUserUseCase } from "./DeleteUser";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { NotFoundException } from "../../domain/exceptions";
import { UserRepositoryData } from "../../data/repositories";
import { UserMapper } from "../../infra/data-mapper";

const userRepository = UserInMemoryRepository.getInstance();
const userMapper = new UserMapper();

const getUserUseCase = new GetUserUseCase({
  userRepository,
  userMapper,
});

const deleteUserUseCase = new DeleteUserUseCase({
  getUserUseCase,
  userRepository,
});

const userValidData: UserRepositoryData = {
  id: "valid_id",
  name: "valid_name",
  email: "email@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("Delete User Use Case", () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  it("should delete an user correctly when pass existing user id", async () => {
    userRepository.create(userValidData);
    await deleteUserUseCase.exec({ id: userValidData.id });

    const removedUser = await userRepository.findById(userValidData.id);
    expect(removedUser).toBeFalsy();
  });

  it("should throw not not found exception when pass a not existing user id", async () => {
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
