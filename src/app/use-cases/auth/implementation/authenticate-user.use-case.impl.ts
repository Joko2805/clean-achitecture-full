import { IAuthenticateUserDTO } from "../../../dtos/auth/authenticate-user.dto";
import { ResponseDTO } from "../../../dtos/response.dto";
import { IAuthenticateUserUseCase } from "../authenticate-user.use-case";
import { UserRepository } from "../../../../infra/repositories/user.repository.impl";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { error } from "console";
import { UserErrorType } from "../../../../domain/enum/user/error-type";
import { PasswordHasherProvider } from "../../../../infra/providers/password-hasher.provider.impl";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";
import { AuthenticateUserErrorType } from "../../../../domain/enum/authenticate/authenticate-user/error-type";
import { TokenManagerProvider } from "../../../../infra/providers/token-manager.provider.impl";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { IUserOutDTO } from "../../../dtos/user/user-out.dto";

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasherProvider: IPasswordHasherProvider,
    private readonly TokenManagerProvider: ITokenManagerProvider
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<ResponseDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(email);

      if (!userAlreadyExists) {
        return {
          success: false,
          data: { error: UserErrorType.UserDoesNotExist },
        };
      }

      const isMatching = await this.passwordHasherProvider.comparePasswords(
        password,
        userAlreadyExists.password
      );

      if (!isMatching) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
        };
      }

      const token = await this.TokenManagerProvider.generateToken(
        email,
        userAlreadyExists.userId
      );

      // const userOutDTO: IUserOutDTO = {
      //   userId: userAlreadyExists.userId,
      //   email: userAlreadyExists.email,
      //   address: userAlreadyExists.address,
      //   gender: userAlreadyExists.gender,
      //   img: userAlreadyExists.img,
      // };

      const { password: userPassword, ...user } = userAlreadyExists;

      return {
        success: true,
        data: { user, token },
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
