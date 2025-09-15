-- CreateEnum
CREATE TYPE "GroceryItemStatus" AS ENUM ('RANOUT', 'HAVE');

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" "GroceryItemStatus" NOT NULL DEFAULT 'RANOUT',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GroceryItem_pkey" PRIMARY KEY ("id")
);
