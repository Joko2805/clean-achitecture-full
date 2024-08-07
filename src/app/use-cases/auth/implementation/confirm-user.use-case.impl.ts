import { ResponseDTO } from "../../../dtos/response.dto";
import { IConfirmUserUseCase } from "../confirm-user.use-case";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { AuthenticateUserErrorType } from "../../../../domain/enum/authenticate/authenticate-user/error-type";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import e from "express";
import { error } from "console";
import { UserErrorType } from "../../../../domain/enum/user/error-type";
import { AuthenticateUserSuccessType } from "../../../../domain/enum/authenticate/authenticate-user/success-type";

export class ConfirmUserUseCase implements IConfirmUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenManagerProvider: ITokenManagerProvider
  ) {}

  async execute(token: string): Promise<ResponseDTO> {
    try {
      const { isValid, payload } =
        await this.tokenManagerProvider.getPayloadIfValid(token);

      if (!isValid) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.TokenNotValid },
        };
      }

      const email = (payload as { sub: string }).sub;

      const userAlreadyExist = await this.userRepository.findByEmail(email);

      if (!userAlreadyExist) {
        return {
          success: false,
          data: { error: UserErrorType.UserDoesNotExist },
        };
      }

      await this.userRepository.confirmUser(userAlreadyExist.userId);

      return {
        success: true,
        data: { message: AuthenticateUserSuccessType.EmailWasValided },
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
