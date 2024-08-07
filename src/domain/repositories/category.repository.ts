import { ICategoryOutDTO } from "../../app/dtos/category/category-out.dto";
import { ICreateCategoryDTO } from "../../app/dtos/category/create-category.dto";
import { IPaginationInDTO } from "../../app/dtos/pagination-in.dto";
import { PaginationDTO } from "../../app/dtos/pagination.dto";

export interface ICategoryRepository {
  create(createCategoryDTO: ICreateCategoryDTO): Promise<ICategoryOutDTO>;
  findAll(paginationInDTO: IPaginationInDTO): Promise<PaginationDTO>;
  findById(id: number): Promise<ICategoryOutDTO | null>;
}
