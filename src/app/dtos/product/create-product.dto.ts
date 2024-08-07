export interface ICreateProductDTO {
  name: string;
  categoryId: number;
  userId: number;
  description?: string;
  status?: boolean;
}
