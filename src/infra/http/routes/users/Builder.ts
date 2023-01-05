import {
  DeleteUserControllerBodyInput,
  DeleteUserControllerOutput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerType,
  GetUserControllerBodyInput,
  GetUserControllerOutput,
  GetUserControllerQueryParamsInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerType,
  UpdateUserControllerBodyInput,
  UpdateUserControllerOutput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerType,
} from "../../../../http/controllers/users/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";

export type UserRoutesBuilderProps = {
  getUserController: GetUserControllerType;
  updateUserController: UpdateUserControllerType;
  deleteUserController: DeleteUserControllerType;
};

export class UserRoutesBuilder {
  private routes: HttpRoute[] = [];

  private getUserController: GetUserControllerType;
  private updateUserController: UpdateUserControllerType;
  private deleteUserController: DeleteUserControllerType;

  constructor(props: UserRoutesBuilderProps) {
    this.getUserController = props.getUserController;
    this.updateUserController = props.updateUserController;
    this.deleteUserController = props.deleteUserController;
  }

  getResult() {
    return this.routes;
  }

  buildAll() {
    this.buildGetRoute();
    this.buildUpdateRoute();
    this.buildDeleteRoute();
  }

  buildGetRoute() {
    const getUserRoute: HttpRoute<
      GetUserControllerBodyInput,
      GetUserControllerRouteParamsInput,
      GetUserControllerQueryParamsInput,
      GetUserControllerOutput
    > = {
      method: HttpMethod.GET,
      path: "users",
      handler: this.getUserController,
      middlewareHandlers: [],
      requiresAuthentication: true,
    };

    this.routes.push(getUserRoute);
  }

  buildUpdateRoute() {
    const updateUserRoute: HttpRoute<
      UpdateUserControllerBodyInput,
      UpdateUserControllerRouteParamsInput,
      UpdateUserControllerQueryParamsInput,
      UpdateUserControllerOutput
    > = {
      method: HttpMethod.PUT,
      path: "users",
      handler: this.updateUserController,
      middlewareHandlers: [],
      requiresAuthentication: true,
    };

    this.routes.push(updateUserRoute);
  }

  buildDeleteRoute() {
    const deleteUserRoute: HttpRoute<
      DeleteUserControllerBodyInput,
      DeleteUserControllerRouteParamsInput,
      DeleteUserControllerQueryParamsInput,
      DeleteUserControllerOutput
    > = {
      method: HttpMethod.DELETE,
      path: "users",
      handler: this.deleteUserController,
      middlewareHandlers: [],
      requiresAuthentication: true,
    };

    this.routes.push(deleteUserRoute);
  }
}
