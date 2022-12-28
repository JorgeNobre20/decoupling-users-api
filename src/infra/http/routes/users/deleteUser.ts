import {
  DeleteUserControllerBodyInput,
  DeleteUserControllerOutput,
  DeleteUserControllerProps,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerRouteParamsInput,
} from "../../../../http/controllers/users/contracts/DeleteUser";
import { DeleteUserController } from "../../../../http/controllers/users/DeleteUser";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseProps,
} from "../../../../usecases/users/DeleteUser";
import {
  GetUserUseCase,
  GetUserUseCaseProps,
} from "../../../../usecases/users/GetUser";
import { UserInMemoryRepository } from "../../../repositories";

const userRepository = UserInMemoryRepository.getInstance();

const getUserUseCaseProps: GetUserUseCaseProps = {
  userRepository,
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

export const deleteUserRoute: HttpRoute<
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerOutput
> = {
  method: HttpMethod.DELETE,
  path: "users/:id",
  handler: deleteUserController,
};
