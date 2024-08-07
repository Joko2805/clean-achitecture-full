export interface IUserOutDTO {
  userId: number;
  email: string;
  confirmedEmail: boolean;
  gender: string;
  address: string | null;
  img: string | null;
}
