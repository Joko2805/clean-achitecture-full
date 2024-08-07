import { PrismaClient, UsersGender } from "@prisma/client";
import { UserInDTO } from "../../app/dtos/user/user-in.dto";
import { IUserOutDTO } from "../../app/dtos/user/user-out.dto";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IRegisterUserDTO } from "../../app/dtos/user/register-user.dto";
import { IUpdateUserDTO } from "../../app/dtos/user/update-user.dto";

export class UserRepository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async updateById(
    id: number,
    { email, password, address, gender, img }: IUpdateUserDTO
  ): Promise<IUserOutDTO> {
    const updatedUser = await this.prismaClient.user.update({
      where: { userId: id },
      data: {
        email,
        password,
        address,
        gender: gender as UsersGender,
        img,
      },
      select: {
        userId: true,
        email: true,
        confirmedEmail: true,
        gender: true,
        address: true,
        img: true,
      },
    });

    return updatedUser;
  }

  async findById(id: number): Promise<IUserOutDTO | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        email: true,
        confirmedEmail: true,
        gender: true,
        address: true,
        img: true,
      },
    });

    return user;
  }

  async confirmUser(userId: number): Promise<void> {
    await this.prismaClient.user.update({
      data: {
        confirmedEmail: true,
      },
      where: { userId },
    });
  }

  async register({
    email,
    password,
    gender,
    roles,
    address,
  }: IRegisterUserDTO): Promise<IUserOutDTO> {
    const registeredUser = await this.prismaClient.user.create({
      data: {
        email,
        password,
        gender: gender as UsersGender,
        address,
        roles: {
          createMany: {
            data: roles.map((roleId) => ({ roleId })),
          },
        },
      },
      select: {
        userId: true,
        email: true,
        confirmedEmail: true,
        gender: true,
        address: true,
        img: true,
        createAt: true,
      },
    });

    return registeredUser;
  }

  async findByEmail(email: string): Promise<UserInDTO | null> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          email: email,
        },
        select: {
          userId: true,
          email: true,
          confirmedEmail: true,
          password: true,
          gender: true,
          address: true,
          img: true,
          status: true,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error connecting to database");
    }
  }
}
