import { UserRepositoryData } from "../../../data/repositories";
import { InvalidDataException } from "../../../domain/exceptions";
import { UserMapper, YupUserValidator } from "../../../infra/adapters";
import { UserInMemoryRepository } from "../../../infra/repositories";
import {
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../../infra/services";
import {
  CreateUserUseCase,
  CreateUserUseCaseProps,
} from "../../../usecases/users/CreateUser";
import { HttpErrorType, HttpStatus } from "../../enums";
import { HttpExceptionHandlerResponse } from "../../exception-handler";
import {
  CreateUserControllerProps,
  CreateUserHttpRequest,
} from "./contracts/CreateUser";
import { CreateUserController } from "./CreateUser";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({ userRepository });
const uuidGenerator = new UUIDInMemoryGeneratorService();

const createUserUseCaseProps: CreateUserUseCaseProps = {
  dataValidator,
  userMapper,
  userRepository,
  userService,
  uuidGenerator,
};
const createUserUseCase = new CreateUserUseCase(createUserUseCaseProps);

const createUserControllerProps: CreateUserControllerProps = {
  createUserUseCase,
};
const createUserController = new CreateUserController(
  createUserControllerProps
);

describe("Create User Http Controller", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should return success http response when pass valid data", async () => {
    const httpRequest: CreateUserHttpRequest = {
      body: {
        name: "valid_name",
        email: "valid@email.com",
        password: "valid_password",
        avatar: "valid_avatar",
      },
      params: {},
      query: {},
    };

    const httpResponse = await createUserController.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(HttpStatus.CREATED);
    expect(httpResponse.body).toBeTruthy();
  });

  it("should return bad request http response with invalid data when pass invalid data", async () => {
    const httpRequest: CreateUserHttpRequest = {
      body: {
        name: "",
        email: "",
        password: "",
        avatar: "",
      },
      params: {},
      query: {},
    };

    const httpResponse = await createUserController.handle(httpRequest);

    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.VALIDATION);
    expect(responseBody.data).toHaveLength(4);
  });

  it("should return bad request http response with message when try to regiser user with already in use email", async () => {
    const createdUser: UserRepositoryData = {
      id: "valid_id",
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };

    await userRepository.create(createdUser);

    const httpRequest: CreateUserHttpRequest = {
      body: {
        name: "other_name",
        email: createdUser.email,
        password: "other_password",
        avatar: "other_avatar",
      },
      params: {},
      query: {},
    };

    const httpResponse = await createUserController.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(httpResponse.body).toBeTruthy();
  });
});
