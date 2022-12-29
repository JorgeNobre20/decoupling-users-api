import { UnauthorizedException } from "../../domain/exceptions";
import {
  AccessTokenPayload,
  IAccessTokenGeneratorService,
} from "../../services";

export class FakeAccessTokenGeneratorService
  implements IAccessTokenGeneratorService
{
  private readonly secret = "ACESS_SECRET";

  async generateAccessToken(id: string): Promise<string> {
    return `${this.secret}-${id}`;
  }

  async validateAndGetPayload(token: string): Promise<AccessTokenPayload> {
    const [, id] = token.split("-");
    const isInvalid = await this.isInvalid(token);

    if (isInvalid) {
      throw new UnauthorizedException(`Invalid Token`);
    }

    return {
      id,
    };
  }

  async isInvalid(token: string): Promise<boolean> {
    const isValid = await this.isValid(token);
    return !isValid;
  }

  async isValid(token: string): Promise<boolean> {
    const [secret] = token.split("-");
    return secret === this.secret;
  }
}
