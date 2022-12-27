import {
  CreateUserControllerInput,
  CreateUserControllerOutput,
  CreateUserControllerProps,
} from "../../../../http/controllers/users/contracts";
import { CreateUserController } from "../../../../http/controllers/users/CreateUser";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import {
  CreateUserUseCase,
  CreateUserUseCaseProps,
} from "../../../../usecases/users/CreateUser";
import { UserMapper, YupUserValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../repositories";
import { UserService, UUIDInMemoryGeneratorService } from "../../../services";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = new UserInMemoryRepository();
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

export const createUserRoute: HttpRoute<
  CreateUserControllerInput,
  CreateUserControllerOutput
> = {
  method: HttpMethod.POST,
  path: "users",
  handler: createUserController,
};
