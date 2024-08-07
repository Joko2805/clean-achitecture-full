import { ResponseDTO } from "../../dtos/response.dto";
import { IUpdateUserDTO } from "../../dtos/user/update-user.dto";

export interface IUpdateUserUseCase {
  execute(id: number, userData: IUpdateUserDTO): Promise<ResponseDTO>;
}
