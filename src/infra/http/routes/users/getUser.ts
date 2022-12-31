import {
  GetUserControllerBodyInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerQueryParamsInput,
  GetUserControllerOutput,
} from "../../../../http/controllers/users/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import { FakeGetUserControllerBuilder } from "../../../builders/controllers/users";

const fakeGetUserControllerBuilder = new FakeGetUserControllerBuilder();
const fakeGetUserController = fakeGetUserControllerBuilder.build();

const isDevelopment = true;
const handler = isDevelopment ? fakeGetUserController : fakeGetUserController;

export const getUserRoute: HttpRoute<
  GetUserControllerBodyInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerQueryParamsInput,
  GetUserControllerOutput
> = {
  method: HttpMethod.GET,
  path: "users/:id",
  handler,
};
