import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { UploadedFile } from "express-fileupload";
import path from "path";

import { IFileUploadUseCase } from "../../../../app/use-cases/upload/file-upload.use-case";
import { existsSync, mkdirSync } from "fs";

export class FileUploadSingleController implements IController {
  constructor(
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}
  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.path ||
      Object.keys(req.path).length === 0
    ) {
      error = this.httpError.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const fileStringParams = Object.keys(req.files);
    const pathStringParams = Object.keys(req.path);

    if (
      !fileStringParams.includes("img") ||
      !pathStringParams.includes("type")
    ) {
      error = this.httpError.error_422();
      return new HttpResponse(error.statusCode, error.body);
    }

    const file = (req.files as { img: UploadedFile }).img;
    const type = (req.path as { type: string }).type;

    // Logica para guardar la imagen
    const uploadDirName = path.join(__dirname, "../../../../..", "upload");
    const fileDirName = path.join(uploadDirName, type);

    if (!existsSync(fileDirName)) mkdirSync(fileDirName, { recursive: true });

    const filePath = path.join(fileDirName, file.name);
    file.mv(filePath);

    const success = this.httpSuccess.success_200({ message: "file uploated" });
    return new HttpResponse(success.statusCode, success.body);
  }
}
