import {
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput,
  LoginControllerOutput,
} from "../../../../http/controllers/authentication/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import { FakeLoginControllerBuilder } from "../../../builders/controllers/authentication";

const fakeLoginControllerBuilder = new FakeLoginControllerBuilder();
const fakeLoginController = fakeLoginControllerBuilder.build();

const isDevelopment = true;
const handler = isDevelopment ? fakeLoginController : fakeLoginController;

export const loginRoute: HttpRoute<
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput,
  LoginControllerOutput
> = {
  method: HttpMethod.POST,
  path: "auth/login",
  handler,
  middlewareHandlers: [],
  requiresAuthentication: false,
};
