import { IController } from "../../../../presentation/http/controllers/controller";
import { FileUploadSingleController } from "../../../../presentation/http/controllers/upload/file-upload-single.controller";
import { FileUploadUseCase } from "../../../../app/use-cases/upload/implementation/file-upload.use-case.impl";
import { IFileUploadUseCase } from "../../../../app/use-cases/upload/file-upload.use-case";
import { FileUploadProvider } from "../../../providers/file-upload.provider.impl";
import { IFileUploadProvider } from "../../../../domain/providers/upload-file.provider";

export function fileUploadComposer(): IController {
  const fileUploadProvider: IFileUploadProvider = new FileUploadProvider();
  const fileUploadUseCase: IFileUploadUseCase = new FileUploadUseCase(
    fileUploadProvider
  );
  const controller: IController = new FileUploadSingleController();
  return controller;
}
