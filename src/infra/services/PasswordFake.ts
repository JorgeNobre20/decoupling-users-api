import { IPasswordService } from "../../services";

export class PasswordFakeService implements IPasswordService {
  private readonly encodeSecret = "encoded";

  async encode(password: string): Promise<string> {
    return `${password}|${this.encodeSecret}`;
  }

  async decode(encodedPassword: string): Promise<string> {
    const [password] = encodedPassword.split("|");
    return password;
  }
}
