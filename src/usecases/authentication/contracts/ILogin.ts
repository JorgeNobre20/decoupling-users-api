import { UseCase } from "../../IUseCase";

export type LoginUseCaseInput = {
  email: string;
  password: string;
};

export type LoginUseCaseOutput = {
  accessToken: string;
};

export type ILoginUseCase = UseCase<LoginUseCaseInput, LoginUseCaseOutput>;
