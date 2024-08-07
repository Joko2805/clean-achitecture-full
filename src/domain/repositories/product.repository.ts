import { ICreateProductDTO } from "../../app/dtos/product/create-product.dto";
import { IProductOutDTO } from "../../app/dtos/product/product-out.dto";
import { IPaginationInDTO } from "../../app/dtos/pagination-in.dto";
import { PaginationDTO } from "../../app/dtos/pagination.dto";

export interface IProductRepository {
  create(createProductDTO: ICreateProductDTO): Promise<IProductOutDTO>;
  findAll(paginationInDTO: IPaginationInDTO): Promise<PaginationDTO>;
}
