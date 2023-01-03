import {
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerOutput,
} from "../../../../http/controllers/users/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import { FakeDeleteUserControllerBuilder } from "../../../builders/controllers/users";

const fakeDeleteUserControllerBuilder = new FakeDeleteUserControllerBuilder();
const fakeDeleteUserController = fakeDeleteUserControllerBuilder.build();

const isDevelopment = true;
const handler = isDevelopment
  ? fakeDeleteUserController
  : fakeDeleteUserController;

export const deleteUserRoute: HttpRoute<
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerOutput
> = {
  method: HttpMethod.DELETE,
  path: "users",
  handler,
  middlewareHandlers: [],
  requiresAuthentication: true,
};
