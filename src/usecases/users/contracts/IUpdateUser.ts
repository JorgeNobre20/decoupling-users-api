import { UserEntity } from "../../../domain/entities";
import { UseCase } from "../../IUseCase";
import { CreateUserUseCaseInput } from "./ICreateUser";

export type UpdateUserUseCaseInput = {
  id: string;
} & CreateUserUseCaseInput;

export type IUpdateUserUseCase = UseCase<UpdateUserUseCaseInput, UserEntity>;
