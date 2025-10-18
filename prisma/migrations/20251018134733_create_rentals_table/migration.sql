/*
  Warnings:

  - The primary key for the `product_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `product_categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "rentals" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "renter_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rentals_uid_key" ON "rentals"("uid");

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
