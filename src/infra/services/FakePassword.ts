import { InvalidDataException, InvalidField } from "../../domain/exceptions";
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

  async checkIfPasswordIsRightOrThrowInvalidDataException(
    receivedPassword: string,
    rightPassword: string
  ): Promise<void> {
    const encodedPassword = await this.encode(receivedPassword);

    if (encodedPassword !== rightPassword) {
      const invalidField = new InvalidField({
        errors: ["Password is wrong"],
        fieldName: "password",
        receivedValue: receivedPassword,
      });

      throw new InvalidDataException([invalidField]);
    }
  }
}
