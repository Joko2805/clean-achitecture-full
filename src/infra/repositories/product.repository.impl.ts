import { PrismaClient } from "@prisma/client";
import { IPaginationInDTO } from "../../app/dtos/pagination-in.dto";
import { PaginationDTO } from "../../app/dtos/pagination.dto";
import { ICreateProductDTO } from "../../app/dtos/product/create-product.dto";
import { IProductOutDTO } from "../../app/dtos/product/product-out.dto";
import { IProductRepository } from "../../domain/repositories/product.repository";

export class ProductRepository implements IProductRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create({
    name,
    description,
    categoryId,
    userId,
    status,
  }: ICreateProductDTO): Promise<IProductOutDTO> {
    const createdProduct = await this.prismaClient.product.create({
      data: {
        name,
        description,
        categoryId,
        userId,
        status,
      },
      select: {
        productId: true,
        name: true,
        description: true,
        categoryId: true,
        userId: true,
        status: true,
      },
    });

    return createdProduct;
  }

  async findAll({
    pageNumber,
    limitNumber,
  }: IPaginationInDTO): Promise<PaginationDTO> {
    const totalProducts = await this.prismaClient.product.count();

    const lastPageNumber = Math.ceil(totalProducts / limitNumber);

    const products = await this.prismaClient.product.findMany({
      take: limitNumber,
      skip: Math.ceil((pageNumber - 1) * limitNumber),
    });

    return {
      currentPage: pageNumber,
      totalPages: lastPageNumber,
      limit: limitNumber,
      total: totalProducts,
      body: products,
    };
  }
}
