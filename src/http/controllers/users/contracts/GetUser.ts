import { IGetUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type GetUserControllerBodyInput = {};

export type GetUserControllerRouteParamsInput = {
  userId: string;
};

export type GetUserControllerQueryParamsInput = {};

export type GetUserHttpRequest = HttpRequestModel<
  GetUserControllerBodyInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerQueryParamsInput
>;

export type GetUserControllerProps = {
  getUserUseCase: IGetUserUseCase;
};

export type GetUserControllerOutput = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type GetUserControllerType = AbstractController<
  GetUserControllerBodyInput,
  GetUserControllerRouteParamsInput,
  GetUserControllerQueryParamsInput,
  GetUserControllerOutput
>;
