import { IUserRepository } from "../../data/repositories";
import { UserEntity } from "../../domain/entities";
import { BusinessRuleException } from "../../domain/exceptions";
import { IUserService } from "../../services";

type UserServiceProps = {
  userRepository: IUserRepository;
};

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(props: UserServiceProps) {
    this.userRepository = props.userRepository;
  }

  async verifyIfEmailIsAvailableOrThrowBusinessRuleException(
    email: string
  ): Promise<void> {
    const userWithEmail = await this.userRepository.findByEmail(email);

    if (userWithEmail) {
      throw new BusinessRuleException(
        `Already exists an user with email: ${email}`
      );
    }
  }

  async verifyIfEmailBelongsToUserOrIsAvailableOrThrowBusinessRuleException(
    userId: string,
    email: string
  ): Promise<void> {
    const userWithEmail = await this.userRepository.findByEmail(email);

    if (!userWithEmail) {
      return;
    }

    if (userWithEmail.id !== userId) {
      throw new BusinessRuleException(
        `Already exists an user with email: ${email}`
      );
    }
  }
}
