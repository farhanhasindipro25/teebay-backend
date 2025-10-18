/*
  Warnings:

  - You are about to drop the `rentals` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SALE', 'RENTAL');

-- DropForeignKey
ALTER TABLE "public"."rentals" DROP CONSTRAINT "rentals_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rentals" DROP CONSTRAINT "rentals_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rentals" DROP CONSTRAINT "rentals_renter_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "rent_ends_at" TIMESTAMP(3),
ADD COLUMN     "rent_starts_at" TIMESTAMP(3),
ADD COLUMN     "rental_period" INTEGER,
ADD COLUMN     "rental_price" DOUBLE PRECISION,
ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'SALE';

-- DropTable
DROP TABLE "public"."rentals";

-- CreateIndex
CREATE INDEX "transactions_buyer_id_idx" ON "transactions"("buyer_id");

-- CreateIndex
CREATE INDEX "transactions_seller_id_idx" ON "transactions"("seller_id");

-- CreateIndex
CREATE INDEX "transactions_product_id_idx" ON "transactions"("product_id");

-- CreateIndex
CREATE INDEX "transactions_type_idx" ON "transactions"("type");
