import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { CategoryRepository } from "../../../repositories/category.repository.impl";
import { GetAllCategoryUseCase } from "../../../../app/use-cases/category/implementation/get-all-category.use-case.impl";
import { IGetAllCategoryUseCase } from "../../../../app/use-cases/category/get-all-category.use-case";
import { GetAllCategoryController } from "../../../../presentation/http/controllers/category/get-all-category.controller";
import { IController } from "../../../../presentation/http/controllers/controller";

export function getAllCategoryComposer(): IController {
  const categoryRepository: ICategoryRepository = new CategoryRepository(
    prismaClient
  );
  const getAllCategoryUseCase: IGetAllCategoryUseCase =
    new GetAllCategoryUseCase(categoryRepository);
  const getAllCategoryController: IController = new GetAllCategoryController(
    getAllCategoryUseCase
  );
  return getAllCategoryController;
}
