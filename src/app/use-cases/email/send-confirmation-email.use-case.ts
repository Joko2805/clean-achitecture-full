import { ResponseDTO } from "../../dtos/response.dto";

export interface ISendConfirmationEmailUseCase {
  execute(email: string): Promise<ResponseDTO>;
}
