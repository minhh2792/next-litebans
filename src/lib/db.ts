import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const dbInstance = globalThis.prisma || new PrismaClient();

// Attach a single global error guard to avoid leaking connection details to the UI.
if (!(dbInstance as any)._hasErrorGuard) {
  dbInstance.$use(async (params, next) => {
    try {
      return await next(params);
    } catch (error) {
      console.error("[DB] Prisma error", error);
      throw new Error("Không thể kết nối tới database, vui lòng thử lại sau.");
    }
  });

  (dbInstance as any)._hasErrorGuard = true;
}

export const db = dbInstance;

if (process.env.NODE_ENV !== "production") globalThis.prisma = dbInstance;