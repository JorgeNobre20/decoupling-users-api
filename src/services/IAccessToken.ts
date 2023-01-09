export type AccessTokenPayload = {
  id: string;
};

export interface IAccessTokenService {
  generateAccessToken(id: string, payload: AccessTokenPayload): Promise<string>;
  validateAndGetPayload(token: string): Promise<AccessTokenPayload>;
  isValid(token: string): Promise<boolean>;
}
