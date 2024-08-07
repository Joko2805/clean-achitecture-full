import { PaginationRequestDTO } from "../../../../presentation/http/dtos/pagination-request.dto";
import { ResponseDTO } from "../../../dtos/response.dto";
import { IGetAllProductUseCase } from "../get-all-produtct.use-case";
import { IProductRepository } from "../../../../domain/repositories/product.repository";
import { ProductErrorType } from "../../../../domain/enum/product/error-type";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_LIMIT = 5;

export class GetAllProductUseCase implements IGetAllProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute({
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE_NUMBER,
  }: PaginationRequestDTO): Promise<ResponseDTO> {
    try {
      const products = await this.productRepository.findAll({
        limitNumber: limit,
        pageNumber: page,
      });

      if (products.total === 0) {
        return {
          success: false,
          data: { error: ProductErrorType.ProductNotFound },
        };
      }

      return {
        success: true,
        data: products,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
