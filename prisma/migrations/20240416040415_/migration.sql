/*
  Warnings:

  - A unique constraint covering the columns `[id,uriName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryUriName" TEXT,
ADD COLUMN     "genderName" "Genders";

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_uriName_key" ON "Category"("id", "uriName");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_categoryUriName_fkey" FOREIGN KEY ("categoryId", "categoryUriName") REFERENCES "Category"("id", "uriName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_genderName_fkey" FOREIGN KEY ("genderName") REFERENCES "Gender"("name") ON DELETE SET NULL ON UPDATE CASCADE;
