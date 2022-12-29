import {
  LoginControllerBodyInput,
  LoginControllerOutput,
  LoginControllerProps,
  LoginControllerQueryParamsInput,
  LoginControllerRouteParamsInput,
} from "../../../../http/controllers/authentication/contracts";
import { LoginController } from "../../../../http/controllers/authentication/Login";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import {
  LoginUseCase,
  LoginUseCaseProps,
} from "../../../../usecases/authentication/Login";
import { YupLoginValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../repositories";
import {
  FakeAccessTokenGeneratorService,
  FakePasswordService,
} from "../../../services";

const dataValidator = new YupLoginValidator();
const userRepository = UserInMemoryRepository.getInstance();
const passwordService = new FakePasswordService();
const accessTokenGeneratorService = new FakeAccessTokenGeneratorService();

const loginUseCaseProps: LoginUseCaseProps = {
  dataValidator,
  userRepository,
  passwordService,
  accessTokenGeneratorService,
};
const loginUseCase = new LoginUseCase(loginUseCaseProps);

const loginControllerProps: LoginControllerProps = {
  loginUseCase,
};
const loginController = new LoginController(loginControllerProps);

export const loginRoute: HttpRoute<
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput,
  LoginControllerOutput
> = {
  method: HttpMethod.POST,
  path: "auth/login",
  handler: loginController,
};
