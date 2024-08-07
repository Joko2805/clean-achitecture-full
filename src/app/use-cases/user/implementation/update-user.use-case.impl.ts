import { ResponseDTO } from "../../../dtos/response.dto";
import { IUpdateUserDTO } from "../../../dtos/user/update-user.dto";
import { IUpdateUserUseCase } from "../update-user.use-case";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { error } from "console";
import { UserErrorType } from "../../../../domain/enum/user/error-type";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { PasswordHasherProvider } from "../../../../infra/providers/password-hasher.provider.impl";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly passwordHasherProvider: IPasswordHasherProvider,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: number, userData: IUpdateUserDTO): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findById(id);

      if (!userAlreadyExists) {
        return {
          success: false,
          data: { error: UserErrorType.UserDoesNotExist },
        };
      }

      if (userData.password) {
        userData.password = await this.passwordHasherProvider.hashPassword(
          userData.password
        );
      }

      const userEntity = UserEntity.update(userData);

      const updateUserDTO: IUpdateUserDTO = {
        email: userEntity.email,
        password: userEntity.password,
        gender: userEntity.gender,
        address: userEntity.address,
        img: userEntity.img,
      };

      const updatedUser = await this.userRepository.updateById(
        id,
        updateUserDTO
      );

      return {
        success: true,
        data: updatedUser,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
