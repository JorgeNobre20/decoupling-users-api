import {
  BusinessRuleException,
  InvalidDataException,
  NotFoundException,
} from "../../domain/exceptions";
import { UserMapper, YupUserValidator } from "../../infra/adapters";
import { UserInMemoryRepository } from "../../infra/repositories";
import {
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../infra/services";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { CreateUserUseCase, CreateUserUseCaseProps } from "./CreateUser";
import { GetUserUseCase, GetUserUseCaseProps } from "./GetUser";
import { CreateUserUseCaseInput } from "./ICreateUser";
import { UpdateUserUseCaseInput } from "./IUpdateUser";
import { UpdateUserUseCase, UpdateUserUseCaseProps } from "./UpdateUser";

const firstUserCreationData: CreateUserUseCaseInput = {
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
  avatar: "any_avatar",
};

const secondUserCreationData: CreateUserUseCaseInput = {
  name: "any_name_2",
  email: "any_email_2@email.com",
  password: "any_password_2",
  avatar: "any_avatar_2",
};

let userRepository = new UserInMemoryRepository();
let userService = new UserService({
  userRepository,
});
const uuidGenerator = new UUIDInMemoryGeneratorService();
const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();

const createUserUseCaseProps: CreateUserUseCaseProps = {
  userRepository,
  userService,
  uuidGenerator,
  dataValidator,
  userMapper,
};

let createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
};
let getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

const updateUserUseCaseProps: UpdateUserUseCaseProps = {
  userRepository,
  userService,
  dataValidator,
  userMapper,
  getUserUseCase,
};

let updateUserUseCase = new UpdateUserUseCase(updateUserUseCaseProps);

describe("Update User Use Case", () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    userService = new UserService({
      userRepository,
    });

    createUserUseCase = new CreateUserUseCase({
      ...createUserUseCaseProps,
      userService,
      userRepository,
    });

    getUserUseCase = new GetUserUseCase({ userRepository });

    updateUserUseCase = new UpdateUserUseCase({
      ...updateUserUseCaseProps,
      userRepository,
      userService,
      getUserUseCase,
    });
  });

  it("should update a user correctly when pass valid data", async () => {
    const createdUserId = await createUserUseCase.exec(firstUserCreationData);

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
    const firstUserCreatedId = await createUserUseCase.exec(
      firstUserCreationData
    );
    const firstUserCreated = await getUserUseCase.exec({
      id: firstUserCreatedId,
    });

    const secondUserCreatedId = await createUserUseCase.exec(
      secondUserCreationData
    );
    const secondUserCreated = await getUserUseCase.exec({
      id: secondUserCreatedId,
    });

    const updatedUserData: UpdateUserUseCaseInput = {
      id: secondUserCreated.getId(),
      name: secondUserCreated.getName(),
      email: firstUserCreated.getEmail(),
      password: secondUserCreated.getPassword(),
      avatar: secondUserCreated.getAvatar(),
    };

    const error = await getThrowedErrorType(() =>
      updateUserUseCase.exec(updatedUserData)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(BusinessRuleException);
  });

  it("should throw invalid data exception when try to update user with invalid data", async () => {
    const createdUserId = await createUserUseCase.exec(firstUserCreationData);

    const updatedUserData: UpdateUserUseCaseInput = {
      id: createdUserId,
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
