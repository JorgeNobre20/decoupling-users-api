import { UserRepositoryData } from "../../../data/repositories";
import { UserMapper } from "../../../infra/data-mapper";
import { UserInMemoryRepository } from "../../../infra/repositories";

import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../usecases/users/GetUser";
import { HttpErrorType, HttpStatus } from "../../enums";
import { HttpExceptionHandlerResponse } from "../../exception-handler";
import {
  GetUserControllerOutput,
  GetUserControllerProps,
  GetUserHttpRequest,
} from "./contracts/GetUser";
import { GetUserController } from "./GetUser";

const userRepository = UserInMemoryRepository.getInstance();
const userMapper = new UserMapper();

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
  userMapper,
};
const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

const getUserControllerProps: GetUserControllerProps = {
  getUserUseCase,
};
const getUserController = new GetUserController(getUserControllerProps);

describe("Get User Http Controller", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should return success http response when pass a existing user id", async () => {
    const createdUserData: UserRepositoryData = {
      id: "valid_id",
      name: "valid_name",
      email: "Valid@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };
    await userRepository.create(createdUserData);

    const httpRequest: GetUserHttpRequest = {
      body: {},
      params: {
        userId: createdUserData.id,
      },
      query: {},
    };

    const httpResponse = await getUserController.handle(httpRequest);
    const responseData = httpResponse.body as GetUserControllerOutput;

    expect(httpResponse.statusCode).toEqual(HttpStatus.SUCESS);
    expect(httpResponse.body).toBeTruthy();
    expect(responseData.id).toEqual(createdUserData.id);
    expect(responseData.name).toEqual(createdUserData.name);
    expect(responseData.email).toEqual(createdUserData.email);
    expect(responseData.avatar).toEqual(createdUserData.avatar);
  });

  it("should return not found http response when pass a not existing user id", async () => {
    const httpRequest: GetUserHttpRequest = {
      body: {},
      params: {
        userId: "not_existing_id",
      },
      query: {},
    };

    const httpResponse = await getUserController.handle(httpRequest);
    const responseData = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.body).toBeTruthy();
    expect(responseData.message).toBeTruthy();
    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(responseData.errorType).toEqual(HttpErrorType.NOT_FOUND);
  });
});
