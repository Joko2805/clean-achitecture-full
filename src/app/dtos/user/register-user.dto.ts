export interface IRegisterUserDTO {
  email: string;
  password: string;
  gender: string;
  roles: number[];
  address?: string;
}
