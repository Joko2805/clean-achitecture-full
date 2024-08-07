import { ResponseDTO } from "../../dtos/response.dto";

export interface IConfirmUserUseCase {
  execute(token: string): Promise<ResponseDTO>;
}
