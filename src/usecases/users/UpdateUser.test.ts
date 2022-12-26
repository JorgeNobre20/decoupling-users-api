import { UserRepositoryData } from "../../data/repositories";
import {
  BusinessRuleException,
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import { UserService } from "../../infra/services";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { GetUserUseCase, GetUserUseCaseProps } from "./GetUser";
import { UpdateUserUseCaseInput } from "./IUpdateUser";
import { UpdateUserUseCase, UpdateUserUseCaseProps } from "./UpdateUser";

const firstUserCreationData: UserRepositoryData = {
  id: "first_valid_id",
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
  avatar: "any_avatar",
};

const secondUserCreationData: UserRepositoryData = {
  id: "second_valid_id",
  name: "any_name_2",
  email: "any_email_2@email.com",
  password: "any_password_2",
  avatar: "any_avatar_2",
};

const userRepository = new UserInMemoryRepository();
const userService = new UserService({
  userRepository,
});
const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
};
const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

const updateUserUseCaseProps: UpdateUserUseCaseProps = {
  userRepository,
  userService,
  dataValidator,
  userMapper,
  getUserUseCase,
};

const updateUserUseCase = new UpdateUserUseCase(updateUserUseCaseProps);

describe("Update User Use Case", () => {
  it("should update a user correctly when pass valid data", async () => {
    await userRepository.create(firstUserCreationData);
    const updatedUserData: UpdateUserUseCaseInput = {
      id: firstUserCreationData.id,
      name: "updated_name",
      email: "updated@email.com",
      password: "updated_password",
      avatar: "updated_avatar",
    };

    const updatedUser = await updateUserUseCase.exec(updatedUserData);

    await userRepository.delete(firstUserCreationData.id);

    expect(updatedUserData.id).toEqual(updatedUser.getId());
    expect(updatedUserData.name).toEqual(updatedUser.getName());
    expect(updatedUserData.email).toEqual(updatedUser.getEmail());
    expect(updatedUserData.password).toEqual(updatedUser.getPassword());
    expect(updatedUserData.avatar).toEqual(updatedUser.getAvatar());
  });

  it("should throw a not found exception when try to update user with invalid id", async () => {
    const updatedUserData: UpdateUserUseCaseInput = {
      id: "any_invalid_id",
      name: "updated_name",
      email: "updated@email.com",
      password: "updated_password",
      avatar: "updated_avatar",
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(NotFoundException);
  });

  it("should throw a business rule exception when try to update user with an already in use email", async () => {
    await userRepository.create(firstUserCreationData);
    await userRepository.create(secondUserCreationData);

    const updatedUserData: UpdateUserUseCaseInput = {
      id: secondUserCreationData.id,
      name: secondUserCreationData.name,
      email: firstUserCreationData.email,
      password: secondUserCreationData.password,
      avatar: secondUserCreationData.avatar,
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    await userRepository.delete(firstUserCreationData.id);
    await userRepository.delete(secondUserCreationData.id);

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });

  it("should throw invalid data exception when try to update user with invalid data", async () => {
    await userRepository.create(firstUserCreationData);

    const updatedUserData: UpdateUserUseCaseInput = {
      id: firstUserCreationData.id,
      name: "",
      email: "invalid_email",
      password: "",
      avatar: "",
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    await userRepository.delete(firstUserCreationData.id);

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });
});
