import { CategoryEntity } from "../../../../domain/entities/category.entity";
import { ICreateCategoryDTO } from "../../../dtos/category/create-category.dto";
import { ResponseDTO } from "../../../dtos/response.dto";
import { ICreateCategoryUseCase } from "../create-category.use-case";
import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { CreateCategoryRequestDTO } from "../../../../presentation/http/dtos/category/create-category-request.dto";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(
    createCategoryRequestDTO: CreateCategoryRequestDTO
  ): Promise<ResponseDTO> {
    try {
      const categoryEntity = CategoryEntity.create(createCategoryRequestDTO);

      // TODO: Posible validacion de la existencia de una categoria

      const createCategoryDTO: ICreateCategoryDTO = {
        name: categoryEntity.name,
        status: categoryEntity.status,
        userId: categoryEntity.userId,
      };

      const createdCategory = await this.categoryRepository.create(
        createCategoryDTO
      );

      return {
        success: true,
        data: createdCategory,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
