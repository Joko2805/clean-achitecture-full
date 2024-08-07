import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";

import { IUpdateUserUseCase } from "../../../../app/use-cases/user/update-user.use-case";
import { IHttpSuccess } from "../../helpers/http-success";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { IUpdateUserDTO } from "../../../../app/dtos/user/update-user.dto";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

export class UpdateUseController implements IController {
  constructor(
    private readonly updateUserUseCase: IUpdateUserUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}

  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (
      !req.path ||
      !req.files ||
      !req.body ||
      Object.keys(req.body).length === 0
    ) {
      error = this.httpError.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const pathStringParams = Object.keys(req.path);
    const bodyParams = Object.keys(req.body);
    const filesParams = Object.keys(req.files);

    if (
      !pathStringParams.includes("id") ||
      !filesParams.includes("img") ||
      (!bodyParams.includes("email") &&
        !bodyParams.includes("password") &&
        !bodyParams.includes("address") &&
        !bodyParams.includes("gender") &&
        !bodyParams.includes("img"))
    ) {
      error = this.httpError.error_422();
      return new HttpResponse(error.statusCode, error.body);
    }

    const id = Number((req.path as { id: string }).id) || 0;
    const updateUseDTO = req.body as IUpdateUserDTO;
    const img = (req.files as { img: UploadedFile }).img;

    const fileName = `${v4()}.jpeg`;

    // FIXME: Cambiar por url BASE
    updateUseDTO.img = `http://localhost:3000/upload/images/users/${fileName}`;

    response = await this.updateUserUseCase.execute(id, updateUseDTO);

    if (!response.success) {
      error = this.httpError.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const imgPath = path.resolve(
      __dirname,
      "../../../../../",
      "upload",
      "users",
      fileName
    );

    try {
      img.mv(imgPath);
    } catch (err: any) {
      error = this.httpError.error_400();
      return new HttpResponse(error.statusCode, { error: err.message });
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
