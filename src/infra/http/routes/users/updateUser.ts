import {
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerOutput,
} from "../../../../http/controllers/users/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import { FakeUpdateUserControllerBuilder } from "../../../builders/controllers/users";

const fakeUpdateUserControllerBuilder = new FakeUpdateUserControllerBuilder();
const fakeUpdateUserController = fakeUpdateUserControllerBuilder.build();

const isDevelopment = true;
const handler = isDevelopment
  ? fakeUpdateUserController
  : fakeUpdateUserController;

export const updateUserRoute: HttpRoute<
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerOutput
> = {
  method: HttpMethod.PUT,
  path: "users",
  handler,
  middlewareHandlers: [],
  requiresAuthentication: true,
};
