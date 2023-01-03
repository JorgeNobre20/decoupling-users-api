import { UserRepositoryData } from "../../../data/repositories";
import { UserMapper } from "../../../infra/data-mapper";
import { UserInMemoryRepository } from "../../../infra/repositories";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseProps,
} from "../../../usecases/users/DeleteUser";
import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../usecases/users/GetUser";
import { HttpErrorType, HttpStatus } from "../../enums";
import { HttpExceptionHandlerResponse } from "../../exception-handler";
import {
  DeleteUserControllerOutput,
  DeleteUserControllerProps,
  DeleteUserHttpRequest,
} from "./contracts/DeleteUser";
import { DeleteUserController } from "./DeleteUser";

const userRepository = UserInMemoryRepository.getInstance();
const userMapper = new UserMapper();

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
  userMapper,
};
const getUserUseCase = new GetUserUseCase(getUserUseCaseProps);

const deleteUserUseCaseProps: DeleteUserUseCaseProps = {
  userRepository,
  getUserUseCase,
};
const deleteUserUseCase = new DeleteUserUseCase(deleteUserUseCaseProps);

const deleteUserControllerProps: DeleteUserControllerProps = {
  deleteUserUseCase,
};
const deleteUserController = new DeleteUserController(
  deleteUserControllerProps
);

describe("Delete User Http Controller", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should return success http response when pass existing user id", async () => {
    const createdUser: UserRepositoryData = {
      id: "valid_id",
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };

    await userRepository.create(createdUser);

    const httpRequest: DeleteUserHttpRequest = {
      body: {},
      params: {
        userId: createdUser.id,
      },
      query: {},
    };

    const httpResponse = await deleteUserController.handle(httpRequest);
    const responseData = httpResponse.body as DeleteUserControllerOutput;

    expect(httpResponse.statusCode).toEqual(HttpStatus.SUCESS);
    expect(httpResponse.body).toBeTruthy();
    expect(responseData.message).toBeTruthy();
  });

  it("should return a not found http response with message when try to delete a user with invalid id", async () => {
    const httpRequest: DeleteUserHttpRequest = {
      body: {},
      params: {
        userId: "not_existing_id",
      },
      query: {},
    };

    const httpResponse = await deleteUserController.handle(httpRequest);
    const responseData = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(responseData.errorType).toEqual(HttpErrorType.NOT_FOUND);
    expect(httpResponse.body).toBeTruthy();
    expect(responseData.message).toBeTruthy();
  });
});
