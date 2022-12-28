import {
  UpdateUserControllerBodyInput,
  UpdateUserControllerOutput,
  UpdateUserControllerProps,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerRouteParamsInput,
} from "../../../../http/controllers/users/contracts/UpdateUser";
import { UpdateUserController } from "../../../../http/controllers/users/UpdateUser";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../../usecases/users/GetUser";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseProps,
} from "../../../../usecases/users/UpdateUser";
import { UserMapper, YupUserValidator } from "../../../adapters";
import { UserInMemoryRepository } from "../../../repositories";
import { UserService, UUIDInMemoryGeneratorService } from "../../../services";

const dataValidator = new YupUserValidator();
const userMapper = new UserMapper();
const userRepository = UserInMemoryRepository.getInstance();
const userService = new UserService({ userRepository });

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
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

export const updateUserRoute: HttpRoute<
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerOutput
> = {
  method: HttpMethod.PUT,
  path: "users/:id",
  handler: updateUserController,
};
