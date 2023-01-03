import Jwt from "jsonwebtoken";
import { JWT_AUTHENTICATION_CONFIG } from "../../config/env";
import { UnauthorizedException } from "../../domain/exceptions";
import { AccessTokenPayload, IAccessTokenService } from "../../services";

type JWT_PAYLOAD = {
  sub: string;
};

export class JwtAccessTokenService implements IAccessTokenService {
  private readonly SECRET = JWT_AUTHENTICATION_CONFIG.SECRET;
  private readonly EXPIRATION_TIME_IN_SECONDS =
    JWT_AUTHENTICATION_CONFIG.EXPIRATION_TIME_IN_SECONDS;

  async generateAccessToken(id: string): Promise<string> {
    return Jwt.sign({}, this.SECRET, {
      subject: id,
      expiresIn: this.EXPIRATION_TIME_IN_SECONDS,
    });
  }

  async validateAndGetPayload(token: string): Promise<AccessTokenPayload> {
    const isInvalid = await this.isInvalid(token);

    if (isInvalid) {
      throw new UnauthorizedException(`Invalid Token`);
    }

    const payload = this.getPayload(token);

    return {
      id: payload.id,
    };
  }

  async isInvalid(token: string): Promise<boolean> {
    const isValid = await this.isValid(token);
    return !isValid;
  }

  async isValid(token: string): Promise<boolean> {
    try {
      Jwt.verify(token, this.SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  getPayload(token: string): AccessTokenPayload {
    try {
      const payload = Jwt.verify(token, this.SECRET) as JWT_PAYLOAD;

      return {
        id: payload.sub,
      };
    } catch (error) {
      throw new UnauthorizedException(`Invalid Token`);
    }
  }
}
