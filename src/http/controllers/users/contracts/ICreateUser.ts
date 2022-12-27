import { ICreateUserUseCase } from "../../../../usecases/users/contracts";

export type CreateUserControllerInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type CreateUserControllerProps = {
  createUserUseCase: ICreateUserUseCase;
};

export type CreateUserControllerOutput = {
  message: string;
};
