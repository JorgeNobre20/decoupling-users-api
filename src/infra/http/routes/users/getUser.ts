import {
  GetUserHttpRequest,
  GetUserControllerOutput,
  GetUserControllerProps,
} from "../../../../http/controllers/users/contracts/GetUser";
import { GetUserController } from "../../../../http/controllers/users/GetUser";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
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

const getUserControllerProps: GetUserControllerProps = {
  getUserUseCase,
};
const getUserController = new GetUserController(getUserControllerProps);

export const getUserRoute: HttpRoute<
  GetUserHttpRequest,
  GetUserControllerOutput
> = {
  method: HttpMethod.GET,
  path: "users/:id",
  handler: getUserController,
};
