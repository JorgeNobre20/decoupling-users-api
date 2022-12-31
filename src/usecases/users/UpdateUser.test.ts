import { UserRepositoryData } from "../../data/repositories";
import {
  BusinessRuleException,
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { YupUserValidator } from "../../infra/adapters";
import { FakeSignUpUseCaseBuilder } from "../../infra/builders/usecases/authentication";
import {
  FakeGetUserUseCaseBuilder,
  FakeUpdateUserUseCaseBuilder,
} from "../../infra/builders/usecases/users";
import { UserMapper } from "../../infra/data-mapper";
import { UserInMemoryRepository } from "../../infra/repositories";
import { UserService } from "../../infra/services";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { SignUpUseCaseInput } from "../authentication/contracts";
import { UpdateUserUseCaseInput } from "./contracts";
import { GetUserUseCase, GetUserUseCaseProps } from "./GetUser";
import { UpdateUserUseCase, UpdateUserUseCaseProps } from "./UpdateUser";

const firstUserCreationData: SignUpUseCaseInput = {
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
  avatar: "any_avatar",
};

const secondUserCreationData: SignUpUseCaseInput = {
  name: "any_name_2",
  email: "any_email_2@email.com",
  password: "any_password_2",
  avatar: "any_avatar_2",
};

const userRepository = UserInMemoryRepository.getInstance();

const getUserUseCaseBuilder = new FakeGetUserUseCaseBuilder();
const getUserUseCase = getUserUseCaseBuilder.build();

const updateUserUseCaseBuilder = new FakeUpdateUserUseCaseBuilder();
const updateUserUseCase = updateUserUseCaseBuilder.build();

const signUpUseCaseBuilder = new FakeSignUpUseCaseBuilder();
const signUpUseCase = signUpUseCaseBuilder.build();

describe("Update User Use Case", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should update a user correctly when pass valid data", async () => {
    const createdUserId = await signUpUseCase.exec(firstUserCreationData);

    const updatedUserData: UpdateUserUseCaseInput = {
      id: createdUserId,
      name: "updated_name",
      email: "updated@email.com",
      password: "updated_password",
      avatar: "updated_avatar",
    };

    const updatedUser = await updateUserUseCase.exec(updatedUserData);

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
    const firstCreatedUserId = await signUpUseCase.exec(firstUserCreationData);
    const secondCreatedUserId = await signUpUseCase.exec(
      secondUserCreationData
    );

    const firstUserCreated = await getUserUseCase.exec({
      id: firstCreatedUserId,
    });
    const secondUserCreated = await getUserUseCase.exec({
      id: secondCreatedUserId,
    });

    const updatedUserData: UpdateUserUseCaseInput = {
      id: secondUserCreated.getId(),
      name: secondUserCreated.getName(),
      email: firstUserCreated.getEmail(),
      password: "update_password",
      avatar: secondUserCreated.getAvatar(),
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });

  it("should throw invalid data exception when try to update user with invalid data", async () => {
    const firstCreatedUserId = await signUpUseCase.exec(firstUserCreationData);

    const updatedUserData: UpdateUserUseCaseInput = {
      id: firstCreatedUserId,
      name: "",
      email: "invalid_email",
      password: "",
      avatar: "",
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(InvalidDataException);
  });
});
