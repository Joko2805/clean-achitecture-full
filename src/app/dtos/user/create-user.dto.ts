export interface ICreateUserDTO {
  email: string;
  password: string;
  gender: string;
  address?: string;
  img?: string;
}