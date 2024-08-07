export interface PaginationDTO {
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
  body: unknown[];
}
