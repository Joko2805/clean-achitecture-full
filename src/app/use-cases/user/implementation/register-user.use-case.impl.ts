import { IRegisterUserUseCase } from "../register-user.use-case";
import { ResponseDTO } from "../../../dtos/response.dto";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { UserErrorType } from "../../../../domain/enum/user/error-type";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";
import { ISendConfirmationEmailUseCase } from "../../email/send-confirmation-email.use-case";
import { IRegisterUserDTO } from "../../../dtos/user/register-user.dto";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasherProvider: IPasswordHasherProvider,
    private readonly sendConfirmationEmailUseCase: ISendConfirmationEmailUseCase
  ) {}
  async execute(
    registerUserRequestDTO: IRegisterUserDTO
  ): Promise<ResponseDTO> {
    try {
      const userEntity = UserEntity.create(registerUserRequestDTO);

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address
      );

      if (userAlreadyExists) {
        return {
          success: false,
          data: UserErrorType.UserAlreadyExists,
        };
      }

      const passwordHashed = await this.passwordHasherProvider.hashPassword(
        userEntity.password
      );

      const registerUserDTO: IRegisterUserDTO = {
        email: userEntity.email.address,
        password: passwordHashed,
        address: userEntity.address,
        roles: userEntity.roles.roleIds,
        gender: userEntity.gender.description,
      };

      const registeredUser = await this.userRepository.register(
        registerUserDTO
      );

      // TODO: Habilitar
      // const response = await this.sendConfirmationEmailUseCase.execute(
      //   registeredUser.email
      // );

      // if (!response.success) {
      //   return {
      //     success: false,
      //     data: response.data,
      //   };
      // }

      return {
        success: true,
        data: registeredUser,
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
