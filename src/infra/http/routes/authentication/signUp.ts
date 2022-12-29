import {
  SignUpControllerBodyInput,
  SignUpControllerOutput,
  SignUpControllerProps,
  SignUpControllerQueryParamsInput,
  SignUpControllerRouteParamsInput,
} from "../../../../http/controllers/authentication/contracts";
import { SignUpController } from "../../../../http/controllers/authentication/SignUp";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import {
  SignUpUseCase,
  SignUpUseCaseProps,
} from "../../../../usecases/authentication/SignUp";
import { UserMapper, YupUserValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../repositories";
import {
  FakePasswordService,
  UserService,
  UUIDInMemoryGeneratorService,
} from "../../../services";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({ userRepository });
const uuidGeneratorService = new UUIDInMemoryGeneratorService();
const passwordService = new FakePasswordService();

const signUpUseCaseProps: SignUpUseCaseProps = {
  dataValidator,
  userMapper,
  userRepository,
  userService,
  uuidGeneratorService,
  passwordService,
};
const signUpUseCase = new SignUpUseCase(signUpUseCaseProps);

const signUpControllerProps: SignUpControllerProps = {
  signUpUseCase,
};
const signUpController = new SignUpController(signUpControllerProps);

export const signUpRoute: HttpRoute<
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput,
  SignUpControllerOutput
> = {
  method: HttpMethod.POST,
  path: "auth/sign-up",
  handler: signUpController,
};
