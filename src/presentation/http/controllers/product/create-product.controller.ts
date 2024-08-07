import { IHttpRequest } from "../../helpers/http-request";
import { HttpResponse } from "../../helpers/implementation/http-response.impl";
import { IController } from "../controller";
import { ICreateProductUseCase } from "../../../../app/use-cases/product/create-product.use-case";
import { HttpSuccess } from "../../helpers/implementation/http-success.impl";
import { IHttpSuccess } from "../../helpers/http-success";
import { IHttpErrors } from "../../helpers/http-error";
import { HttpErrors } from "../../helpers/implementation/http-error.impl";
import { ICreateProductDTO } from "../../../../app/dtos/product/create-product.dto";

export class CreateProductController implements IController {
  constructor(
    private readonly createProductUseCase: ICreateProductUseCase,
    private readonly httpSuccess: IHttpSuccess = new HttpSuccess(),
    private readonly httpError: IHttpErrors = new HttpErrors()
  ) {}

  async handle(req: IHttpRequest): Promise<HttpResponse> {
    let error, response;

    if (!req.body || Object.keys(req.body).length === 0) {
      error = this.httpError.error_500();

      return new HttpResponse(error.statusCode, error.body);
    }

    // const bodyParams = Object.keys(req.body);
    if (
      !req.body.hasOwnProperty("name") ||
      !req.body.hasOwnProperty("categoryId")
    ) {
      error = this.httpError.error_422();

      return new HttpResponse(error.statusCode, error.body);
    }

    const { name, categoryId } = req.body as {
      name: string;
      categoryId: number;
    };
    const { userId } = req.user as { userId: number };

    const createProductDTO: ICreateProductDTO = {
      name,
      categoryId,
      userId,
    };

    response = await this.createProductUseCase.execute(createProductDTO);

    if (!response.success) {
      error = this.httpError.error_400();

      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_201(response.data);

    return new HttpResponse(success.statusCode, success.body);
  }
}
