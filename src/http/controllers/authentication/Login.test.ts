import { UserRepositoryData } from "../../../data/repositories";
import { YupLoginValidator } from "../../../infra/adapters";
import { UserInMemoryRepository } from "../../../infra/repositories";
import {
  FakePasswordService,
  FakeAccessTokenService,
} from "../../../infra/services";
import {
  LoginUseCase,
  LoginUseCaseProps,
} from "../../../usecases/authentication/Login";
import { HttpErrorType, HttpStatus } from "../../enums";
import { HttpExceptionHandlerResponse } from "../../exception-handler";
import {
  LoginControllerOutput,
  LoginControllerProps,
  LoginHttpRequest,
} from "./contracts/Login";
import { LoginController } from "./Login";

const dataValidator = new YupLoginValidator();
const userRepository = UserInMemoryRepository.getInstance();
const passwordService = new FakePasswordService();
const accessTokenGeneratorService = new FakeAccessTokenService();

const loginUseCaseProps: LoginUseCaseProps = {
  dataValidator,
  passwordService,
  userRepository,
  accessTokenGeneratorService,
};
const loginUseCase = new LoginUseCase(loginUseCaseProps);

const loginControllerProps: LoginControllerProps = {
  loginUseCase,
};
const loginController = new LoginController(loginControllerProps);

const validSignUpControllerBodyInput: UserRepositoryData = {
  id: "valid_id",
  name: "valid_name",
  email: "valid@email.com",
  password: "valid_password",
  avatar: "valid_avatar",
};

describe("Login Http Controller", () => {
  beforeEach(() => {
    userRepository.deleteAll();
  });

  it("should return success http response with access token when pass valid login credetials", async () => {
    const encodedPassword = await passwordService.encode(
      validSignUpControllerBodyInput.password
    );

    await userRepository.create({
      ...validSignUpControllerBodyInput,
      password: encodedPassword,
    });

    const httpRequest: LoginHttpRequest = {
      body: {
        email: validSignUpControllerBodyInput.email,
        password: validSignUpControllerBodyInput.password,
      },
      params: {},
      query: {},
    };

    const httpResponse = await loginController.handle(httpRequest);
    const responseBody = httpResponse.body as LoginControllerOutput;

    expect(httpResponse.statusCode).toEqual(HttpStatus.SUCESS);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.data.accessToken).toBeTruthy();
  });

  it("should return bad request http response with invalid data when pass invalid data", async () => {
    const httpRequest: LoginHttpRequest = {
      body: {
        email: "",
        password: "",
      },
      params: {},
      query: {},
    };

    const httpResponse = await loginController.handle(httpRequest);
    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.VALIDATION);
    expect(responseBody.data).toHaveLength(2);
  });

  it("should return bad request http response with errors when pass an existing user account email and wrong password", async () => {
    const createdUser: UserRepositoryData = {
      id: "valid_id",
      name: "valid_name",
      email: "email@email.com",
      password: "valid_password",
      avatar: "valid_avatar",
    };
    await userRepository.create(createdUser);

    const httpRequest: LoginHttpRequest = {
      body: {
        email: createdUser.email,
        password: "any_wrong_password",
      },
      params: {},
      query: {},
    };

    const httpResponse = await loginController.handle(httpRequest);
    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.message).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.BAD_REQUEST);
  });

  it("should return not found http response with message when pass a not existing user account email", async () => {
    const httpRequest: LoginHttpRequest = {
      body: {
        email: "not_existing@emai.com",
        password: "any_password",
      },
      params: {},
      query: {},
    };

    const httpResponse = await loginController.handle(httpRequest);
    const responseBody = httpResponse.body as HttpExceptionHandlerResponse;

    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
    expect(httpResponse.body).toBeTruthy();
    expect(responseBody.errorType).toEqual(HttpErrorType.NOT_FOUND);
    expect(responseBody.message).toBeTruthy();
  });
});
