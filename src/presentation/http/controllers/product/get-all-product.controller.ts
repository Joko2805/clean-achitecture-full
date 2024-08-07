import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { IGetAllProductUseCase } from "../../../../app/use-cases/product/get-all-produtct.use-case";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { PaginationRequestDTO } from "../../dtos/pagination-request.dto";

export class GetAllProductController implements IController {
  constructor(
    private readonly getAllProductUseCase: IGetAllProductUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}

  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    const { isValid, instance } = PaginationRequestDTO.create(req.query);

    if (!isValid || !instance) {
      error = this.httpError.error_422();

      return new HttpResponse(error.statusCode, error.body);
    }

    response = await this.getAllProductUseCase.execute(instance);

    if (!response.success) {
      error = this.httpError.error_400();

      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);

    return new HttpResponse(success.statusCode, success.body);
  }
}
