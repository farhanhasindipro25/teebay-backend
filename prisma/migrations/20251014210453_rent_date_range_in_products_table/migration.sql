/*
  Warnings:

  - You are about to drop the column `rental_timeline` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "rental_timeline",
ADD COLUMN     "rent_ends_at" TEXT,
ADD COLUMN     "rent_starts_at" TEXT;
