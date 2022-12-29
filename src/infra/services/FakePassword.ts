import { IPasswordService } from "../../services";

export class FakePasswordService implements IPasswordService {
  private readonly encodeSecret = "encoded";

  async encode(password: string): Promise<string> {
    return `${password}|${this.encodeSecret}`;
  }

  async decode(encodedPassword: string): Promise<string> {
    const [password] = encodedPassword.split("|");
    return password;
  }

  async isPasswordRight(
    receivedPassword: string,
    rightPassword: string
  ): Promise<boolean> {
    const encodedPassword = await this.encode(receivedPassword);

    return encodedPassword === rightPassword;
  }
}
