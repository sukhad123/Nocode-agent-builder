import { PrismaClient } from "./generated/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prismaClient = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prismaClient;

export default prismaClient;