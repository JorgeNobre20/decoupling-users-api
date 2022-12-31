import {
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput,
  SignUpControllerOutput,
} from "../../../../http/controllers/authentication/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";
import { FakeSignUpControllerBuilder } from "../../../builders/controllers/authentication";

const fakeSignUpControllerBuilder = new FakeSignUpControllerBuilder();
const fakeSignUpController = fakeSignUpControllerBuilder.build();

const isDevelopment = true;
const handler = isDevelopment ? fakeSignUpController : fakeSignUpController;

export const signUpRoute: HttpRoute<
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput,
  SignUpControllerOutput
> = {
  method: HttpMethod.POST,
  path: "auth/sign-up",
  handler,
};
