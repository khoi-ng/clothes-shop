/*
  Warnings:

  - You are about to drop the column `featuredCollectionId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_featuredCollectionId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "featuredCollectionId";

-- CreateTable
CREATE TABLE "_FeaturedCollectionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeaturedCollectionToProduct_AB_unique" ON "_FeaturedCollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FeaturedCollectionToProduct_B_index" ON "_FeaturedCollectionToProduct"("B");

-- AddForeignKey
ALTER TABLE "_FeaturedCollectionToProduct" ADD CONSTRAINT "_FeaturedCollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "FeaturedCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeaturedCollectionToProduct" ADD CONSTRAINT "_FeaturedCollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
