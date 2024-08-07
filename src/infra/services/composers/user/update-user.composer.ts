import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { UserRepository } from "../../../repositories/user.repository.impl";
import { UpdateUserUseCase } from "../../../../app/use-cases/user/implementation/update-user.use-case.impl";
import { IUpdateUserUseCase } from "../../../../app/use-cases/user/update-user.use-case";
import { IController } from "../../../../presentation/http/controllers/controller";
import { UpdateUseController } from "../../../../presentation/http/controllers/user/update-user.controller";
import { PasswordHasherProvider } from "../../../providers/password-hasher.provider.impl";
import { IPasswordHasherProvider } from "../../../../domain/providers/password-hasher.provider";

export function updateUserComposer(): IController {
  const userRepository: IUserRepository = new UserRepository(prismaClient);

  const passwordHasherProvider: IPasswordHasherProvider =
    new PasswordHasherProvider();
  const updateUserUseCase: IUpdateUserUseCase = new UpdateUserUseCase(
    passwordHasherProvider,
    userRepository
  );
  const controller: IController = new UpdateUseController(updateUserUseCase);
  return controller;
}
