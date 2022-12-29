import { ISignUpUseCase } from "../../../../usecases/authentication/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type SignUpControllerBodyInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type SignUpControllerRouteParamsInput = {};

export type SignUpControllerQueryParamsInput = {};

export type SignUpControllerProps = {
  signUpUseCase: ISignUpUseCase;
};

export type SignUpControllerOutput = {
  message: string;
};

export type SignUpHttpRequest = HttpRequestModel<
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput
>;

export type SignUpControllerType = AbstractController<
  SignUpControllerBodyInput,
  SignUpControllerRouteParamsInput,
  SignUpControllerQueryParamsInput,
  SignUpControllerOutput
>;
