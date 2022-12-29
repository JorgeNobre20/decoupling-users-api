export interface IPasswordService {
  encode(password: string): Promise<string>;
  decode(encodedPassword: string): Promise<string>;
  isPasswordRight(
    receivedPassword: string,
    rightPassword: string
  ): Promise<boolean>;
}
