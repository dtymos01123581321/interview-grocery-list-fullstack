-- CreateTable
CREATE TABLE "GroceryItemHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "groceryId" UUID NOT NULL,
    "oldStatus" "GroceryItemStatus",
    "newStatus" "GroceryItemStatus" NOT NULL,
    "changedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroceryItemHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroceryItemHistory" ADD CONSTRAINT "GroceryItemHistory_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "GroceryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
