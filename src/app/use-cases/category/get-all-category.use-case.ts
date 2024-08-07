import { PaginationRequestDTO } from "../../../presentation/http/dtos/pagination-request.dto";
import { ResponseDTO } from "../../dtos/response.dto";

export interface IGetAllCategoryUseCase {
  execute(paginationRequestDTO: PaginationRequestDTO): Promise<ResponseDTO>;
}
