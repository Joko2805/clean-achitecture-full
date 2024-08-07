import { CreateCategoryRequestDTO } from "../../../presentation/http/dtos/category/create-category-request.dto";
import { ICreateCategoryDTO } from "../../dtos/category/create-category.dto";
import { ResponseDTO } from "../../dtos/response.dto";

export interface ICreateCategoryUseCase {
  execute(
    createCategoryRequestDTO: CreateCategoryRequestDTO
  ): Promise<ResponseDTO>;
}
