import { UserInMemoryRepository } from "../../infra/repositories";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { NotFoundException } from "../../domain/exceptions";
import { GetUserUseCase } from "./GetUser";
import { UserRepositoryData } from "../../data/repositories";

const userRepository = new UserInMemoryRepository();

const getUserUseCase = new GetUserUseCase({
  userRepository,
});

describe("Get User Use Case", () => {
  it("should find an user correctly when pass existing user id", async () => {
    const validUserInputData: UserRepositoryData = {
      id: "valid_id",
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };

    userRepository.create(validUserInputData);

    const createdUser = await getUserUseCase.exec({
      id: validUserInputData.id,
    });

    userRepository.delete(validUserInputData.id);

    expect(createdUser).toBeTruthy();
    expect(validUserInputData.id).toEqual(createdUser.getId());
    expect(validUserInputData.name).toEqual(createdUser.getName());
    expect(validUserInputData.email).toEqual(createdUser.getEmail());
    expect(validUserInputData.password).toEqual(createdUser.getPassword());
    expect(validUserInputData.avatar).toEqual(createdUser.getAvatar());
  });

  it("should throw not found exeception when try to find user with no existing ID", async () => {
    const ID = "no_existing_id";

    const error = await getThrowedErrorType(async () =>
      getUserUseCase.exec({ id: ID })
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });
});
