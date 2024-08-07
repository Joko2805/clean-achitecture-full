import { IAuthenticateUserDTO } from "../../dtos/auth/authenticate-user.dto";
import { ResponseDTO } from "../../dtos/response.dto";

export interface IAuthenticateUserUseCase {
  execute(authenticateUserDTO: IAuthenticateUserDTO): Promise<ResponseDTO>;
}
