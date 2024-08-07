import { PaginationRequestDTO } from "../../../presentation/http/dtos/pagination-request.dto";
import { IPaginationInDTO } from "../../dtos/pagination-in.dto";
import { ResponseDTO } from "../../dtos/response.dto";

export interface IGetAllProductUseCase {
  execute(paginationRequestDTO: PaginationRequestDTO): Promise<ResponseDTO>;
}
