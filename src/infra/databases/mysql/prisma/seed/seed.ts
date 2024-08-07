import { PrismaClient } from "@prisma/client";
import { PasswordHasherProvider } from "../../../../providers/password-hasher.provider.impl";

const prisma = new PrismaClient();
const passwordHasherProvider = new PasswordHasherProvider();

async function main() {
  // Eliminar datos antiguos
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // Crear roles
  const adminRole = await prisma.role.create({
    data: {
      name: "admin",
      status: true,
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: "user",
      status: true,
    },
  });

  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      confirmedEmail: true,
      password: await passwordHasherProvider.hashPassword("12345"),
      gender: "male",
      status: true,
      roles: {
        create: {
          role: {
            connect: { roleId: adminRole.roleId },
          },
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      confirmedEmail: true,
      password: await passwordHasherProvider.hashPassword("12345"),
      gender: "female",
      status: true,
      roles: {
        create: {
          role: {
            connect: { roleId: userRole.roleId },
          },
        },
      },
    },
  });

  // Crear categorías
  const category1 = await prisma.category.create({
    data: {
      name: "Electronics",
      userId: user1.userId,
      status: true,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Books",
      userId: user2.userId,
      status: true,
    },
  });

  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        name: "Smartphone",
        description: "A cool smartphone",
        categoryId: category1.categoryId,
        userId: user1.userId,
        status: true,
      },
      {
        name: "Laptop",
        description: "A powerful laptop",
        categoryId: category1.categoryId,
        userId: user1.userId,
        status: true,
      },
      {
        name: "Book A",
        description: "An interesting book",
        categoryId: category2.categoryId,
        userId: user2.userId,
        status: true,
      },
      {
        name: "Book B",
        description: "Another interesting book",
        categoryId: category2.categoryId,
        userId: user2.userId,
        status: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
