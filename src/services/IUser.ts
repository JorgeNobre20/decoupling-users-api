export interface IUserService {
  verifyIfEmailIsAvailableOrThrowBusinessRuleException(
    email: string
  ): Promise<void>;
  verifyIfEmailBelongsToUserOrIsAvailableOrThrowBusinessRuleException(
    email: string,
    userId: string
  ): Promise<void>;
}
