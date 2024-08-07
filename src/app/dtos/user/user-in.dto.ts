export interface UserInDTO {
  userId: number;
  email: string;
  confirmedEmail: boolean;
  password: string;
  gender: string;
  address: string | null;
  img: string | null;
  status: boolean;
}
