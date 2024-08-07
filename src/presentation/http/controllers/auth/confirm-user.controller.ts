import { response } from "express";
import { IHttpErrors } from "../../helpers/http-error";
import { IHttpRequest } from "../../helpers/http-request";
import { IHttpSuccess } from "../../helpers/http-success";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IController } from "../controller";
import { ConfirmUserUseCase } from "../../../../app/use-cases/auth/implementation/confirm-user.use-case.impl";
import { IConfirmUserUseCase } from "../../../../app/use-cases/auth/confirm-user.use-case";
import { error } from "console";

export class ConfirmUserController implements IController {
  constructor(
    private readonly confirmUserUseCase: IConfirmUserUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}

  async handle(req: IHttpRequest): Promise<HttpResponse> {
    const token = (req.path as { token: string }).token;

    const response = await this.confirmUserUseCase.execute(token);

    if (!response.success) {
      const error = this.httpError.error_400();

      return new HttpResponse(error.statusCode, error.body);
    }

    const success = this.httpSuccess.success_200(response.data);

    return new HttpResponse(success.statusCode, success.body);
  }
}
