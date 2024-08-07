import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { UserRepository } from "../../../repositories/user.repository.impl";
import { RegisterUserUseCase } from "../../../../app/use-cases/user/implementation/register-user.use-case.impl";
import { IRegisterUserUseCase } from "../../../../app/use-cases/user/register-user.use-case";
import { PasswordHasherProvider } from "../../../providers/password-hasher.provider.impl";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";
import { SendConfirmationEmailUseCase } from "../../../../app/use-cases/email/implementation/send-confirmation-email.use-case.impl";
import { ISendConfirmationEmailUseCase } from "../../../../app/use-cases/email/send-confirmation-email.use-case";
import { MailerProvider } from "../../../providers/mailer.provider.impl";
import { IMailerProvider } from "../../../../domain/providers/mailer.provider";
import { TokenManagerProvider } from "../../../providers/token-manager.provider.impl";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { IController } from "../../../../presentation/http/controllers/controller";
import { RegisterUserController } from "../../../../presentation/http/controllers/user/register-user.controller";

export function registerUserComposer() {
  const userRepository: IUserRepository = new UserRepository(prismaClient);

  const mailerProvider: IMailerProvider = new MailerProvider();
  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();

  const sendConfirmationEmailUseCase: ISendConfirmationEmailUseCase =
    new SendConfirmationEmailUseCase(
      userRepository,
      mailerProvider,
      tokenManagerProvider
    );

  const passwordHasherProvider: IPasswordHasherProvider =
    new PasswordHasherProvider();

  const registerUserUseCase: IRegisterUserUseCase = new RegisterUserUseCase(
    userRepository,
    passwordHasherProvider,
    sendConfirmationEmailUseCase
  );

  const controller: IController = new RegisterUserController(
    registerUserUseCase
  );

  return controller;
}
