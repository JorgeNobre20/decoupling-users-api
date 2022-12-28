import { ICreateUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type CreateUserControllerBodyInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type CreateUserControllerRouteParamsInput = {};

export type CreateUserControllerQueryParamsInput = {};

export type CreateUserControllerProps = {
  createUserUseCase: ICreateUserUseCase;
};

export type CreateUserControllerOutput = {
  message: string;
};

export type CreateUserHttpRequest = HttpRequestModel<
  CreateUserControllerBodyInput,
  CreateUserControllerRouteParamsInput,
  CreateUserControllerQueryParamsInput
>;

export type CreateUserControllerType = AbstractController<
  CreateUserControllerBodyInput,
  CreateUserControllerRouteParamsInput,
  CreateUserControllerQueryParamsInput,
  CreateUserControllerOutput
>;
