import { UnauthorizedException } from "../../domain/exceptions";
import { getThrowedErrorType, NoErrorThrownError } from "../../tests";
import { JwtAccessTokenService } from "./JwtAccessToken";

const jwtAccessTokenService = new JwtAccessTokenService({
  secret: "SECRET",
  expirationTimeInSeconds: 100000,
});

describe("JWT Access Token Service", () => {
  it("should generate valid JWT token", async () => {
    const accessToken = await jwtAccessTokenService.generateAccessToken(
      "any_user_id"
    );

    expect(accessToken).toBeTruthy();
    expect(jwtAccessTokenService.isValid(accessToken)).toBeTruthy();
  });

  it("should get JWT payload correctly when pass a valid token", async () => {
    const userId = "any_user_id";

    const accessToken = await jwtAccessTokenService.generateAccessToken(userId);
    const payload = jwtAccessTokenService.getPayload(accessToken);

    expect(payload.id).toEqual(userId);
  });

  it("should throw unauthorized exception when try to validate and get payload from invalid token", async () => {
    const invalidToken = "any_invalid_token";

    const error = await getThrowedErrorType(
      async () =>
        await jwtAccessTokenService.validateAndGetPayload(invalidToken)
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(UnauthorizedException);
  });
});
