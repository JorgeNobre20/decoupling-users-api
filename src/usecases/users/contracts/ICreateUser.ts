import { UseCase } from "../../IUseCase";

export type CreateUserUseCaseInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type ICreateUserUseCase = UseCase<CreateUserUseCaseInput, string>;
