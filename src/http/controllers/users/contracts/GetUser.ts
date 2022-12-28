import { IGetUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";

export type GetUserControllerBodyInput = {};

export type GetUserControllerRouteParamsInput = {
  id: string;
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
