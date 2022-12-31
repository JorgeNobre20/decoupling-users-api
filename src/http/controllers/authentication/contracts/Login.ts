import { ILoginUseCase } from "../../../../usecases/authentication/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type LoginControllerBodyInput = {
  email: string;
  password: string;
};

export type LoginControllerRouteParamsInput = {};

export type LoginControllerQueryParamsInput = {};

export type LoginControllerProps = {
  loginUseCase: ILoginUseCase;
};

export type LoginControllerOutput = {
  data: {
    accessToken: string;
  };
};

export type LoginHttpRequest = HttpRequestModel<
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput
>;

export type LoginControllerType = AbstractController<
  LoginControllerBodyInput,
  LoginControllerRouteParamsInput,
  LoginControllerQueryParamsInput,
  LoginControllerOutput
>;
