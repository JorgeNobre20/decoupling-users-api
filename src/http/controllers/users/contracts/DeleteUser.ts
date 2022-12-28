import { IDeleteUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";

export type DeleteUserControllerBodyInput = {};

export type DeleteUserControllerRouteParamsInput = {
  id: string;
};

export type DeleteUserControllerQueryParamsInput = {};

export type DeleteUserHttpRequest = HttpRequestModel<
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput
>;

export type DeleteUserControllerProps = {
  deleteUserUseCase: IDeleteUserUseCase;
};

export type DeleteUserControllerOutput = {
  message: string;
};
