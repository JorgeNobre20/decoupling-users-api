import Crypto from "crypto";

import { IPasswordService } from "../../services";

export class CryptoPasswordService implements IPasswordService {
  private readonly encryptSalt = "8e3b7b56edf668be2ef90efbe0899244";
  private readonly interations = 1000;
  private readonly keyLength = 100;
  private readonly algorithm = "sha512";

  async encode(password: string): Promise<string> {
    return Crypto.pbkdf2Sync(
      password,
      this.encryptSalt,
      this.interations,
      this.keyLength,
      this.algorithm
    ).toString("hex");
  }

  async isPasswordRight(
    receivedPassword: string,
    rightPassword: string
  ): Promise<boolean> {
    const encodedPassword = await this.encode(receivedPassword);
    return encodedPassword === rightPassword;
  }
}
