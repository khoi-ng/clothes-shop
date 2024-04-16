-- CreateTable
CREATE TABLE "ComplemantaryCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genderName" "Genders",
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplemantaryCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToComplemantaryCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ComplemantaryCollectionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToComplemantaryCollection_AB_unique" ON "_CategoryToComplemantaryCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToComplemantaryCollection_B_index" ON "_CategoryToComplemantaryCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ComplemantaryCollectionToProduct_AB_unique" ON "_ComplemantaryCollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ComplemantaryCollectionToProduct_B_index" ON "_ComplemantaryCollectionToProduct"("B");

-- AddForeignKey
ALTER TABLE "ComplemantaryCollection" ADD CONSTRAINT "ComplemantaryCollection_genderName_fkey" FOREIGN KEY ("genderName") REFERENCES "Gender"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToComplemantaryCollection" ADD CONSTRAINT "_CategoryToComplemantaryCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToComplemantaryCollection" ADD CONSTRAINT "_CategoryToComplemantaryCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "ComplemantaryCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplemantaryCollectionToProduct" ADD CONSTRAINT "_ComplemantaryCollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "ComplemantaryCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComplemantaryCollectionToProduct" ADD CONSTRAINT "_ComplemantaryCollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
