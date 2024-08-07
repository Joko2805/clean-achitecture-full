export interface ITokenManagerProvider {
  generateToken(email: string, id: number): Promise<string>;
  getPayloadIfValid(token: string): Promise<{ isValid: boolean; payload: any }>;
}
