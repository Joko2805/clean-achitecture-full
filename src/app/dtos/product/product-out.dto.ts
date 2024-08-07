export interface IProductOutDTO {
  productId: number;
  name: string;
  description: string | null;
  categoryId: number;
  userId: number;
  status: boolean;
}
