import { UserRepositoryData } from "../../data/repositories";
import { UserEntity, UserEntityProps } from "../../domain/entities";
import { IUserMapper } from "../../adpaters/IUserMapper";

export class UserMapper implements IUserMapper {
  mapEntityToRepository(userEntity: UserEntity): UserRepositoryData {
    return {
      id: userEntity.getId(),
      name: userEntity.getName(),
      email: userEntity.getEmail(),
      password: userEntity.getPassword(),
      avatar: userEntity.getAvatar(),
    };
  }

  mapRepositoryToEntity(userRepository: UserRepositoryData): UserEntity {
    const userProps: UserEntityProps = {
      id: userRepository.id,
      name: userRepository.name,
      email: userRepository.email,
      password: userRepository.password,
      avatar: userRepository.avatar,
    };
    const user = new UserEntity(userProps);

    return user;
  }
}
