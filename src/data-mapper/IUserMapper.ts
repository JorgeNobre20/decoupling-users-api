import { UserRepositoryData } from "../data/repositories";
import { UserEntity } from "../domain/entities";

export interface IUserMapper {
  mapEntityToRepository: (userEntity: UserEntity) => UserRepositoryData;
  mapRepositoryToEntity: (userRepository: UserRepositoryData) => UserEntity;
}
