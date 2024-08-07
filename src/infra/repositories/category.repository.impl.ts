import { ICategoryOutDTO } from "../../app/dtos/category/category-out.dto";
import { ICreateCategoryDTO } from "../../app/dtos/category/create-category.dto";
import { IPaginationInDTO } from "../../app/dtos/pagination-in.dto";
import { PaginationDTO } from "../../app/dtos/pagination.dto";
import { ICategoryRepository } from "../../domain/repositories/category.repository";
import { PrismaClient } from "@prisma/client";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById(id: number): Promise<ICategoryOutDTO | null> {
    const category = await this.prismaClient.category.findUnique({
      where: { categoryId: id },
      select: {
        categoryId: true,
        name: true,
        status: true,
      },
    });

    return category;
  }

  async findAll({
    pageNumber,
    limitNumber,
  }: IPaginationInDTO): Promise<PaginationDTO> {
    const itemsPerPage = limitNumber;

    const totalCategories = await this.prismaClient.category.count();

    const lastPageNumber = Math.ceil(totalCategories / itemsPerPage);

    const categories = await this.prismaClient.category.findMany({
      take: itemsPerPage,
      skip: Math.ceil((pageNumber - 1) * itemsPerPage),
    });

    return {
      currentPage: pageNumber,
      totalPages: lastPageNumber,
      limit: limitNumber,
      total: totalCategories,
      body: categories,
    };
  }

  async create({
    name,
    status,
    userId,
  }: ICreateCategoryDTO): Promise<ICategoryOutDTO> {
    const createdCategory = await this.prismaClient.category.create({
      data: { name, status, userId },
      select: {
        categoryId: true,
        name: true,
        status: true,
      },
    });
    return createdCategory;
  }
}
