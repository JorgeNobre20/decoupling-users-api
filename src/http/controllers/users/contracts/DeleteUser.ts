import { IDeleteUserUseCase } from "../../../../usecases/users/contracts";
import { HttpRequestModel } from "../../../models";
import { AbstractController } from "../../AbstractController";

export type DeleteUserControllerBodyInput = {};

export type DeleteUserControllerRouteParamsInput = {
  userId: string;
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

export type DeleteUserControllerType = AbstractController<
  DeleteUserControllerBodyInput,
  DeleteUserControllerRouteParamsInput,
  DeleteUserControllerQueryParamsInput,
  DeleteUserControllerOutput
>;
