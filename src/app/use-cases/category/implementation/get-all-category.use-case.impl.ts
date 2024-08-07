import { IGetAllCategoryUseCase } from "../get-all-category.use-case";
import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { ResponseDTO } from "../../../dtos/response.dto";
import { CategoriesErrorType } from "../../../../domain/enum/category/error-type";
import { PaginationRequestDTO } from "../../../../presentation/http/dtos/pagination-request.dto";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_LIMIT = 5;

export class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE_NUMBER,
  }: PaginationRequestDTO): Promise<ResponseDTO> {
    try {
      const categories = await this.categoryRepository.findAll({
        pageNumber: page,
        limitNumber: limit,
      });

      if (categories.total === 0) {
        return {
          success: false,
          data: { error: CategoriesErrorType.CategoriesNotFound },
        };
      }

      return {
        success: true,
        data: categories,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
