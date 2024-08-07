import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import path from "path";

export class FileImageController implements IController {
  constructor(
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}
  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (!req.path || Object.keys(req.path).length === 0) {
      error = this.httpError.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const pathStringParams = Object.keys(req.path);

    if (
      !pathStringParams.includes("type") ||
      !pathStringParams.includes("img")
    ) {
      error = this.httpError.error_422();
      return new HttpResponse(error.statusCode, error.body);
    }

    const { img, type } = req.path as { type: string; img: string };

    const pathFile = path.join(__dirname, "../../../../../upload", type, img);

    const success = this.httpSuccess.success_200({ pathFile });
    return new HttpResponse(success.statusCode, success.body);
  }
}
