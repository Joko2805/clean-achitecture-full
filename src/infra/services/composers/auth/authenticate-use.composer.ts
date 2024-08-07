import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { UserRepository } from "../../../repositories/user.repository.impl";
import { AuthenticateUserUseCase } from "../../../../app/use-cases/auth/implementation/authenticate-user.use-case.impl";
import { IAuthenticateUserUseCase } from "../../../../app/use-cases/auth/authenticate-user.use-case";
import { PasswordHasherProvider } from "../../../providers/password-hasher.provider.impl";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";
import { TokenManagerProvider } from "../../../providers/token-manager.provider.impl";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { IController } from "../../../../presentation/http/controllers/controller";
import { AuthenticateUserController } from "../../../../presentation/http/controllers/auth/authenticate-user.controller";

export function authenticateUseComposer(): IController {
  const userRepository: IUserRepository = new UserRepository(prismaClient);

  const passwordHasherProvider: IPasswordHasherProvider =
    new PasswordHasherProvider();
  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();

  const authenticateUserUseCase: IAuthenticateUserUseCase =
    new AuthenticateUserUseCase(
      userRepository,
      passwordHasherProvider,
      tokenManagerProvider
    );

  const controller: IController = new AuthenticateUserController(
    authenticateUserUseCase
  );

  return controller;
}
