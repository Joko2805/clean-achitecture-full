import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { ICreateCategoryUseCase } from "../../../../app/use-cases/category/create-category.use-case";
import { ICreateCategoryDTO } from "../../../../app/dtos/category/create-category.dto";
import { CreateCategoryRequestDTO } from "../../dtos/category/create-category-request.dto";

export class CreateCategoryController implements IController {
  constructor(
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}
  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (!req.body || Object.keys(req.body).length === 0) {
      error = this.httpError.error_500();
      return new HttpResponse(error.statusCode, error.body);
    }

    const { userId } = req.user as { userId: number };

    const { isValid, instance } = CreateCategoryRequestDTO.create({
      ...req.body,
      ...{ userId },
    });

    if (!isValid || !instance) {
      error = this.httpError.error_422();
      return new HttpResponse(error.statusCode, error.body);
    }

    response = await this.createCategoryUseCase.execute(instance);

    if (!response.success) {
      error = this.httpError.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);

    return new HttpResponse(success.statusCode, success.body);
  }
}
