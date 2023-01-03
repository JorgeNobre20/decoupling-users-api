import { IUpdateUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type UpdateUserControllerBodyInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UpdateUserControllerRouteParamsInput = {
  userId: string;
};

export type UpdateUserControllerQueryParamsInput = {};

export type UpdateUserControllerProps = {
  updateUserUseCase: IUpdateUserUseCase;
};

export type UpdateUserControllerOutput = {
  name: string;
  email: string;
  avatar: string;
};

export type UpdateUserHttpRequest = HttpRequestModel<
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput
>;

export type UpdateUserControllerType = AbstractController<
  UpdateUserControllerBodyInput,
  UpdateUserControllerRouteParamsInput,
  UpdateUserControllerQueryParamsInput,
  UpdateUserControllerOutput
>;
