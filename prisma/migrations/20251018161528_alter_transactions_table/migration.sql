/*
  Warnings:

  - You are about to drop the column `rent_ends_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `rent_starts_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `rental_period` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `rental_price` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "rent_ends_at",
DROP COLUMN "rent_starts_at",
DROP COLUMN "rental_period",
DROP COLUMN "rental_price";
