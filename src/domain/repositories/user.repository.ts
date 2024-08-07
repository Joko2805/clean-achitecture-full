import { ICreateUserDTO } from "../../app/dtos/user/create-user.dto";
import { IUpdateUserDTO } from "../../app/dtos/user/update-user.dto";
import { UserInDTO } from "../../app/dtos/user/user-in.dto";
import { IUserOutDTO } from "../../app/dtos/user/user-out.dto";

export interface IUserRepository {
  register(registerUserDTO: ICreateUserDTO): Promise<IUserOutDTO>;
  findByEmail(email: string): Promise<UserInDTO | null>;
  confirmUser(userId: number): Promise<void>;
  findById(id: number): Promise<IUserOutDTO | null>;
  updateById(id: number, userData: IUpdateUserDTO): Promise<IUserOutDTO>;
}
