import { UserEntity } from "../../domain/entities";
import { UseCase } from "../IUseCase";

export type GetUserUseCaseInput = {
  id: string;
};

export type IGetUserUseCase = UseCase<GetUserUseCaseInput, UserEntity>;
