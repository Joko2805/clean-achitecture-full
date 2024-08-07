import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { UserRepository } from "../../../repositories/user.repository.impl";
import { ConfirmUserUseCase } from "../../../../app/use-cases/auth/implementation/confirm-user.use-case.impl";
import { IConfirmUserUseCase } from "../../../../app/use-cases/auth/confirm-user.use-case";
import { TokenManagerProvider } from "../../../providers/token-manager.provider.impl";
import { ITokenManagerProvider } from "../../../../domain/providers/token-manager.provider";
import { ConfirmUserController } from "../../../../presentation/http/controllers/auth/confirm-user.controller";
import { IController } from "../../../../presentation/http/controllers/controller";

export function confirmUserComposer() {
  const userRepository: IUserRepository = new UserRepository(prismaClient);

  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();

  const confirmUserUseCase: IConfirmUserUseCase = new ConfirmUserUseCase(
    userRepository,
    tokenManagerProvider
  );

  const confirmUserController: IController = new ConfirmUserController(
    confirmUserUseCase
  );

  return confirmUserController;
}
