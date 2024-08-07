import { ProductEntity } from "../../../../domain/entities/product.entity";
import { IProductRepository } from "../../../../domain/repositories/product.repository";
import { ICreateProductDTO } from "../../../dtos/product/create-product.dto";
import { ResponseDTO } from "../../../dtos/response.dto";
import { ICreateProductUseCase } from "../create-product.use-case";
import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { error } from "console";
import { CategoriesErrorType } from "../../../../domain/enum/category/error-type";
import { UserErrorType } from "../../../../domain/enum/user/error-type";

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(
    createProducRequestDTO: ICreateProductDTO
  ): Promise<ResponseDTO> {
    try {
      const productEntity = ProductEntity.create(createProducRequestDTO);

      const categoryAlreadyExists = await this.categoryRepository.findById(
        productEntity.categoryId.value
      );

      if (!categoryAlreadyExists) {
        return {
          success: false,
          data: { error: CategoriesErrorType.CategoriesNotFound },
        };
      }

      const userAlreadyExists = await this.userRepository.findById(
        productEntity.categoryId.value
      );

      if (!userAlreadyExists) {
        return {
          success: false,
          data: { error: UserErrorType.UserDoesNotExist },
        };
      }

      // TODO: Posible validacion de la existencia de un producto

      const createProductDTO: ICreateProductDTO = {
        name: productEntity.name.value,
        categoryId: productEntity.categoryId.value,
        userId: productEntity.userId.value,
        description: productEntity.description?.value,
        status: productEntity.status?.value,
      };

      const createdProduct = await this.productRepository.create(
        createProductDTO
      );

      return {
        success: true,
        data: createdProduct,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
