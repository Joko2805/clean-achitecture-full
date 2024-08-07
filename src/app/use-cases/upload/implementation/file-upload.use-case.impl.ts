import { IFileUploadProvider } from "../../../../domain/providers/upload-file.provider";
import { ResponseDTO } from "../../../dtos/response.dto";
import { IFileUploadUseCase } from "../file-upload.use-case";

export class FileUploadUseCase implements IFileUploadUseCase {
  constructor(private readonly fileUploadProvider: IFileUploadProvider) {}

  async execute(type: string, file: any): Promise<ResponseDTO> {
    try {
      await this.fileUploadProvider.uploadFile(file, ["jpeg"], type);
      return {
        success: true,
        data: { message: "file uploated" },
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
