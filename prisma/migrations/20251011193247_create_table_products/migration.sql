-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "rental_price" DOUBLE PRECISION,
    "rental_type" TEXT,
    "rental_timeline" TEXT,
    "is_bought" BOOLEAN NOT NULL DEFAULT false,
    "is_rented" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_uid_key" ON "products"("uid");

-- CreateIndex
CREATE INDEX "product_categories_productId_idx" ON "product_categories"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_productId_category_key" ON "product_categories"("productId", "category");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
