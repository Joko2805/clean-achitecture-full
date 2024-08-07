import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { IRegisterUserUseCase } from "../../../../app/use-cases/user/register-user.use-case";
import { IRegisterUserDTO } from "../../../../app/dtos/user/register-user.dto";

export class RegisterUserController implements IController {
  constructor(
    private readonly registerUserUseCase: IRegisterUserUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}
  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (req.body && Object.keys(req.body).length > 0) {
      const bodyParams = Object.keys(req.body);

      if (
        bodyParams.includes("email") &&
        bodyParams.includes("password") &&
        bodyParams.includes("roles") &&
        bodyParams.includes("gender")
      ) {
        const registerUserRequestDTO = req.body as IRegisterUserDTO;

        response = await this.registerUserUseCase.execute(
          registerUserRequestDTO
        );
      } else {
        error = this.httpError.error_422();

        return new HttpResponse(error.statusCode, error.body);
      }

      if (!response.success) {
        error = this.httpError.error_400();

        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_201(response.data);

      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpError.error_500();

    return new HttpResponse(error.statusCode, error.body);
  }
}
