import { UseCase } from "../../IUseCase";

export type SignUpUseCaseInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type ISignUpUseCase = UseCase<SignUpUseCaseInput, string>;
