import { IProductRepository } from "../../../../domain/repositories/product.repository";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { ProductRepository } from "../../../repositories/product.repository.impl";
import { CreateProductUseCase } from "../../../../app/use-cases/product/implementation/create-product.use-case.impl";
import { ICreateProductUseCase } from "../../../../app/use-cases/product/create-product.use-case";
import { IController } from "../../../../presentation/http/controllers/controller";
import { CreateProductController } from "../../../../presentation/http/controllers/product/create-product.controller";
import { UserRepository } from "../../../repositories/user.repository.impl";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { ICategoryRepository } from "../../../../domain/repositories/category.repository";
import { CategoryRepository } from "../../../repositories/category.repository.impl";

export function createProductComposer(): IController {
  const productRepository: IProductRepository = new ProductRepository(
    prismaClient
  );

  const userRepository: IUserRepository = new UserRepository(prismaClient);
  const categoryRepository: ICategoryRepository = new CategoryRepository(
    prismaClient
  );

  const createProductUseCase: ICreateProductUseCase = new CreateProductUseCase(
    productRepository,
    categoryRepository,
    userRepository
  );

  const createProductController: IController = new CreateProductController(
    createProductUseCase
  );

  return createProductController;
}
