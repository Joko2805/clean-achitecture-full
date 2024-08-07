import { ICreateProductDTO } from "../../dtos/product/create-product.dto";
import { ResponseDTO } from "../../dtos/response.dto";

export interface ICreateProductUseCase {
  execute(createProductDTO: ICreateProductDTO): Promise<ResponseDTO>;
}
