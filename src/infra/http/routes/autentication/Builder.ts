import {
  SignUpControllerType,
  LoginControllerType,
  SignUpControllerBodyInput,
  SignUpControllerOutput,
  SignUpControllerQueryParamsInput,
  SignUpControllerRouteParamsInput,
  LoginControllerBodyInput,
  LoginControllerOutput,
  LoginControllerQueryParamsInput,
  LoginControllerRouteParamsInput,
} from "../../../../http/controllers/authentication/contracts";
import { HttpMethod } from "../../../../http/enums";
import { HttpRoute } from "../../../../http/models";

export type AuthenticationRoutesBuilderProps = {
  loginController: LoginControllerType;
  signUpController: SignUpControllerType;
};

export class AuthenticationRoutesBuilder {
  private routes: HttpRoute[] = [];

  private loginController: LoginControllerType;
  private signUpController: SignUpControllerType;

  constructor(props: AuthenticationRoutesBuilderProps) {
    this.loginController = props.loginController;
    this.signUpController = props.signUpController;
  }

  getResult() {
    return this.routes;
  }

  buildAll() {
    this.buildLoginRoute();
    this.buildSignUpRoute();
  }

  buildSignUpRoute() {
    const signUpRoute: HttpRoute<
      SignUpControllerBodyInput,
      SignUpControllerRouteParamsInput,
      SignUpControllerQueryParamsInput,
      SignUpControllerOutput
    > = {
      method: HttpMethod.POST,
      path: "auth/sign-up",
      handler: this.signUpController,
      middlewareHandlers: [],
      requiresAuthentication: false,
    };

    this.routes.push(signUpRoute);
  }

  buildLoginRoute() {
    const loginRoute: HttpRoute<
      LoginControllerBodyInput,
      LoginControllerRouteParamsInput,
      LoginControllerQueryParamsInput,
      LoginControllerOutput
    > = {
      method: HttpMethod.POST,
      path: "auth/login",
      handler: this.loginController,
      middlewareHandlers: [],
      requiresAuthentication: false,
    };

    this.routes.push(loginRoute);
  }
}
