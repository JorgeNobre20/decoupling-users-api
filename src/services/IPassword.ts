export interface IPasswordService {
  encode(password: string): Promise<string>;
  isPasswordRight(
    receivedPassword: string,
    rightPassword: string
  ): Promise<boolean>;
}
