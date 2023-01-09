import { HttpRoute } from "../../../../http/models";
import {
  FakeLoginControllerBuilder,
  FakeSignUpControllerBuilder,
  LoginControllerBuilder,
  SignUpControllerBuilder
} from "../../../builders/controllers/authentication";
import {
  AuthenticationRoutesBuilder,
  AuthenticationRoutesBuilderProps
} from "./Builder";

const loginController = new LoginControllerBuilder().build();
const signUpController = new SignUpControllerBuilder().build();

const authenticationRoutesBuilderProps: AuthenticationRoutesBuilderProps = {
  loginController,
  signUpController
};

const authenticationRoutesBuilder = new AuthenticationRoutesBuilder(
  authenticationRoutesBuilderProps
);
authenticationRoutesBuilder.buildAll();

const authenticationRoutes: HttpRoute[] =
  authenticationRoutesBuilder.getResult();

export { authenticationRoutes };
