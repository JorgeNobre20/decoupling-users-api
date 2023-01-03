import { UserRepositoryData } from "../../../data/repositories";
import { YupUserValidator } from "../../../infra/adapters";
import { UserMapper } from "../../../infra/data-mapper";
import { UserInMemoryRepository } from "../../../infra/repositories";
import { UserService } from "../../../infra/services";
import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../usecases/users/GetUser";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseProps,
} from "../../../usecases/users/UpdateUser";
import { HttpErrorType, HttpStatus } from "../../enums";
import { HttpExceptionHandlerResponse } from "../../exception-handler";
import {
  UpdateUserControllerBodyInput,
  UpdateUserControllerOutput,
  UpdateUserControllerProps,
  UpdateUserHttpRequest,
} from "./contracts/UpdateUser";
import { UpdateUserController } from "./UpdateUser";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({ userRepository });

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
  userMapper,
};
const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

const updateUserUseCaseProps: UpdateUserUseCaseProps = {
  dataValidator,
  userMapper,
  userRepository,
  userService,
  getUserUseCase,
};
const updateUserUseCase = new UpdateUserUseCase(updateUserUseCaseProps);

const updateUserControllerProps: UpdateUserControllerProps = {
  updateUserUseCase,
};
const updateUserController = new UpdateUserController(
  updateUserControllerProps
);

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

describe("Update User Http Controller", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should return success http response when pass valid data and an existing user id", async () => {
    await userRepository.create(firstUserCreationData);
    const updatedData: UpdateUserControllerBodyInput = {
      name: "updated_valid_name",
      email: "updated@email.com",
      password: "updated_valid_password",
      avatar: "updated_valid_avatar",
    };

    const httpRequest: UpdateUserHttpRequest = {
      body: updatedData,
      params: {
        userId: firstUserCreationData.id,
      },
      query: {},
    };

    const httpResponse = await updateUserController.handle(httpRequest);
    const responseData = httpResponse.body as UpdateUserControllerOutput;

    expect(httpResponse.statusCode).toEqual(HttpStatus.SUCESS);
    expect(httpResponse.body).toBeTruthy();
    expect(responseData.name).toEqual(updatedData.name);
    expect(responseData.email).toEqual(updatedData.email);
    expect(responseData.avatar).toEqual(updatedData.avatar);
  });

  it("should return bad request http response with invalid data when pass invalid data", async () => {
    await userRepository.create(firstUserCreationData);

    const httpRequest: UpdateUserHttpRequest = {
      body: {
        name: "",
        email: "",
        password: "",
        avatar: "",
      },
      params: {
        userId: firstUserCreationData.id,
      },
      query: {},
    };

    const httpResponse = await updateUserController.handle(httpRequest);

    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.VALIDATION);
    expect(responseBody.data).toHaveLength(4);
  });

  it("should return not found http response when try to update not existing user", async () => {
    const httpRequest: UpdateUserHttpRequest = {
      body: {
        name: "updated_name",
        email: "updated@email.com",
        password: "updated_password",
        avatar: "updated_avatar",
      },
      params: {
        userId: "not_existing_id",
      },
      query: {},
    };

    const httpResponse = await updateUserController.handle(httpRequest);
    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.message).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.NOT_FOUND);
  });

  it("should return bad request http response with message when try to update user with already in use email", async () => {
    await userRepository.create(firstUserCreationData);
    await userRepository.create(secondUserCreationData);

    const httpRequest: UpdateUserHttpRequest = {
      body: {
        name: "updated_name",
        email: secondUserCreationData.email,
        password: "updated_password",
        avatar: "updated_avatar",
      },
      params: {
        userId: firstUserCreationData.id,
      },
      query: {},
    };

    const httpResponse = await updateUserController.handle(httpRequest);
    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.body).toBeTruthy();
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(responseBody.errorType).toEqual(HttpErrorType.BUSINESS);
    expect(responseBody.message).toBeTruthy();
  });
});
