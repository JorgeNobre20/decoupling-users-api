import { UseCase } from "../IUseCase";

export type DeleteUserUseCaseInput = {
  id: string;
};

export type IDeleteUserUseCase = UseCase<DeleteUserUseCaseInput, void>;
