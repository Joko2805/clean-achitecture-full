import { ResponseDTO } from "../../dtos/response.dto";
import { IRegisterUserDTO } from "../../dtos/user/register-user.dto";

export interface IRegisterUserUseCase {
  execute(registerUserRequestDTO: IRegisterUserDTO): Promise<ResponseDTO>;
}
