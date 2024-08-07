import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { CreateCategoryController } from "../../../../presentation/http/controllers/category/create-category.controller";
import { IController } from "../../../../presentation/http/controllers/controller";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { CategoryRepository } from "../../../repositories/category.repository.impl";
import { CreateCategoryUseCase } from "../../../../app/use-cases/category/implementation/create-category.use-case.impl";
import { ICreateCategoryUseCase } from "../../../../app/use-cases/category/create-category.use-case";
export function createCategoryComposer(): IController {
  const categoryRepository: ICategoryRepository = new CategoryRepository(
    prismaClient
  );

  const createCategoryUseCase: ICreateCategoryUseCase =
    new CreateCategoryUseCase(categoryRepository);

  const controller: IController = new CreateCategoryController(
    createCategoryUseCase
  );
  return controller;
}
