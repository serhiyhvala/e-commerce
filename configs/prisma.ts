import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaDb = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;

export default prismaDb;
