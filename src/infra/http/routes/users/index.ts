import { HttpRoute } from "../../../../http/models";
import {
  FakeDeleteUserControllerBuilder,
  FakeGetUserControllerBuilder,
  FakeUpdateUserControllerBuilder,
  DeleteUserControllerBuilder,
  GetUserControllerBuilder,
  UpdateUserControllerBuilder
} from "../../../builders/controllers/users";
import { UserRoutesBuilder, UserRoutesBuilderProps } from "./Builder";

const getUserController = new GetUserControllerBuilder().build();
const updateUserController = new UpdateUserControllerBuilder().build();
const deleteUserController = new DeleteUserControllerBuilder().build();

const usersRoutesBuilderProps: UserRoutesBuilderProps = {
  deleteUserController,
  getUserController,
  updateUserController
};

const usersRoutesBuilder = new UserRoutesBuilder(usersRoutesBuilderProps);
usersRoutesBuilder.buildAll();

const userRoutes: HttpRoute[] = usersRoutesBuilder.getResult();
export { userRoutes };
