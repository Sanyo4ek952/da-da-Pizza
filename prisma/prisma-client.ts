// prisma-client.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Это нужно, чтобы в development не создавать новый экземпляр при каждом хот-релоаде
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Используем существующий глобальный prisma или создаём новый
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // необязательно, удобно для отладки
  });

// В dev сохраняем в глобальный объект, чтобы Prisma не создавал новый экземпляр каждый раз
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
