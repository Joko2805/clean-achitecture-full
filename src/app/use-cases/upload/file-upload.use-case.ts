import { ResponseDTO } from "../../dtos/response.dto";

export interface IFileUploadUseCase {
  execute(type: string, file: any): Promise<ResponseDTO>;
}
