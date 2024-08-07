import { ResponseDTO } from "../../../dtos/response.dto";
import { ISendConfirmationEmailUseCase } from "../send-confirmation-email.use-case";
import {
  EmailOptions,
  IMailerProvider,
} from "../../../../domain/providers/mailer.provider";
import { envs } from "../../../../config/plugins/env.plugin";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { UserErrorType } from "../../../../domain/enum/user/error-type";

const WEBSERVICE_URL = envs.WEBSERVICE_URL;

export class SendConfirmationEmailUseCase
  implements ISendConfirmationEmailUseCase
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailerProvider: IMailerProvider,
    private readonly tokenManagerProvider: ITokenManagerProvider
  ) {}

  async execute(email: string): Promise<ResponseDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      return {
        success: false,
        data: { error: UserErrorType.UserDoesNotExist },
      };
    }

    const token = await this.tokenManagerProvider.generateToken(
      email,
      userAlreadyExists.userId
    );
    const link = `${WEBSERVICE_URL}auth/confirm-email/${token}`;

    try {
      const mailerOptions: EmailOptions = {
        to: email,
        subject: "Confirmation Email",
        body: `
        <h1>Confirmation Email</h1>
        <p>To confirm your email please click on the following link</p>
        <a href="${link}">Confirm</a>`,
      };

      await this.mailerProvider.sendEmail(mailerOptions);

      return {
        success: true,
        data: "Confirmation email sent successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: { error: error.message },
      };
    }
  }
}
