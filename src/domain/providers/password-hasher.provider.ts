export interface IPasswordHasherProvider {
  hashPassword(password: string): Promise<string>;
  comparePasswords(password: string, passwordHashed: string): Promise<boolean>;
}
