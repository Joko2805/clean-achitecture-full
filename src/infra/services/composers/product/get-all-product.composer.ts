import { IProductRepository } from "../../../../domain/repositories/product.repository";
import { IController } from "../../../../presentation/http/controllers/controller";
import { prismaClient } from "../../../databases/mysql/prisma/connection";
import { ProductRepository } from "../../../repositories/product.repository.impl";
import { GetAllProductUseCase } from "../../../../app/use-cases/product/implementation/get-all-product.use-case.impl";
import { IGetAllProductUseCase } from "../../../../app/use-cases/product/get-all-produtct.use-case";
import { GetAllProductController } from "../../../../presentation/http/controllers/product/get-all-product.controller";

export function getAllProductComposer(): IController {
  const productRepository: IProductRepository = new ProductRepository(
    prismaClient
  );

  const getAllProductUseCase: IGetAllProductUseCase = new GetAllProductUseCase(
    productRepository
  );

  const getAllProductController: IController = new GetAllProductController(
    getAllProductUseCase
  );

  return getAllProductController;
}
